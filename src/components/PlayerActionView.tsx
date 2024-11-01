import { useCallback, useState } from 'react';
import { PlayerData, ActionType, PositionType } from '../types';
import { saveToLocalStorage } from '../utils/storage';
import PlayerAction from './PlayerAction';

interface PlayerActionViewProps {
  seat: number;
  players: Record<number, PlayerData>;
  onBack: () => void;
  onRemovePlayer: (seat: number) => void;
  onUpdatePlayer: (seat: number, updater: (prevPlayer: PlayerData) => PlayerData) => void;
  getAllPlayers: () => Record<number, PlayerData>;
}

const PlayerActionView: React.FC<PlayerActionViewProps> = ({
  seat,
  players,
  onBack,
  onRemovePlayer,
  onUpdatePlayer,
  getAllPlayers,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleActionUpdate = useCallback((
    playerSeat: number,
    action: ActionType,
    position: PositionType | null,
    hands: string[]
  ) => {
    try {
      if (!hands.length) {
        throw new Error('ハンドレンジを選択してください');
      }

      const timestamp = Date.now();
      onUpdatePlayer(playerSeat, (prevPlayer) => ({
        ...prevPlayer,
        actions: [...(prevPlayer.actions || []), { 
          action, 
          position, 
          hands,
          timestamp 
        }],
      }));
      saveToLocalStorage('players', getAllPlayers());
      setError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'アクションの更新に失敗しました';
      setError(message);
      console.error('アクションの更新に失敗しました:', error);
    }
  }, [onUpdatePlayer, getAllPlayers]);

  const handleMemoUpdate = useCallback((
    playerSeat: number | null,
    playerName: string,
    memo: string,
    handRanges: PlayerData['actions']
  ) => {
    try {
      if (playerSeat === null) return;
      if (!playerName.trim()) {
        throw new Error('プレイヤー名を入力してください');
      }
      
      const timestamp = Date.now();
      onUpdatePlayer(playerSeat, (prevPlayer) => ({
        ...prevPlayer,
        name: playerName,
        actions: handRanges,
        memos: [...(prevPlayer.memos || []), { 
          text: memo, 
          handRanges,
          timestamp
        }],
      }));
      saveToLocalStorage('players', getAllPlayers());
      setError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'メモの更新に失敗しました';
      setError(message);
      console.error('メモの更新に失敗しました:', error);
    }
  }, [onUpdatePlayer, getAllPlayers]);

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <PlayerAction
        seat={seat}
        onActionUpdate={handleActionUpdate}
        onMemoUpdate={handleMemoUpdate}
        onBack={onBack}
        onRemovePlayer={onRemovePlayer}
        savedPlayers={players}
        allPlayers={getAllPlayers()}
        editingPlayer={players[seat]}
      />
    </>
  );
};

export default PlayerActionView;