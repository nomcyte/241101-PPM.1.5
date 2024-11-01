import React, { useState, useEffect } from 'react';
import PlayerSelection from './PlayerSelection';
import PlayerAction from './PlayerAction';
import { PlayerData, ActionType, PositionType } from '../types';

interface GameTrackerProps {
  selectedSeat: number;
  playerData: Record<number, PlayerData>;
  savePlayerData: (seat: number, updater: (prevPlayer: PlayerData) => PlayerData) => void;
  onBackToSeatSelection: () => void;
  selectedPlayer: number | null;
  onEditRange: (seat: number) => void;
  onRemovePlayer: (seat: number) => void;
}

const GameTracker: React.FC<GameTrackerProps> = ({
  selectedSeat,
  playerData,
  savePlayerData,
  onBackToSeatSelection,
  selectedPlayer,
  onEditRange,
  onRemovePlayer,
}) => {
  const [isEditingPlayer, setIsEditingPlayer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlayer !== null) {
      setIsEditingPlayer(true);
    }
  }, [selectedPlayer]);

  const handlePlayerSelect = (seat: number) => {
    try {
      onEditRange(seat);
    } catch (error) {
      setError('プレイヤーの選択に失敗しました');
      console.error(error);
    }
  };

  const handleBackToSelection = () => {
    setIsEditingPlayer(false);
    setError(null);
    onBackToSeatSelection();
  };

  const handleActionUpdate = (
    seat: number,
    action: ActionType,
    position: PositionType | null,
    hands: string[]
  ) => {
    try {
      if (!hands.length) {
        throw new Error('ハンドレンジを選択してください');
      }

      savePlayerData(seat, (prevPlayerData) => ({
        ...prevPlayerData,
        actions: [...(prevPlayerData.actions || []), { 
          action, 
          position, 
          hands,
          timestamp: Date.now()
        }],
      }));
      setError(null);
    } catch (error) {
      setError('アクションの更新に失敗しました');
      console.error(error);
    }
  };

  const handleMemoUpdate = (
    seat: number,
    playerName: string,
    memo: string,
    handRanges: PlayerData['actions']
  ) => {
    try {
      if (!playerName.trim()) {
        throw new Error('プレイヤー名を入力してください');
      }

      savePlayerData(seat, (prevPlayerData) => ({
        ...prevPlayerData,
        name: playerName,
        actions: handRanges,
        memos: [...(prevPlayerData.memos || []), { 
          text: memo, 
          handRanges,
          timestamp: Date.now() 
        }],
      }));
      setError(null);
    } catch (error) {
      setError('メモの更新に失敗しました');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ゲームトラッカー</h1>
        <p className="text-lg text-gray-600 mt-2">あなたの席: {selectedSeat}</p>
        {error && (
          <p className="text-red-600 mt-2">{error}</p>
        )}
      </div>
      {!isEditingPlayer ? (
        <PlayerSelection
          selectedSeat={selectedSeat}
          onPlayerSelect={handlePlayerSelect}
          playerData={playerData}
          onEditRange={onEditRange}
          onRemovePlayer={onRemovePlayer}
        />
      ) : (
        <PlayerAction
          seat={selectedPlayer}
          onActionUpdate={handleActionUpdate}
          onMemoUpdate={handleMemoUpdate}
          onBack={handleBackToSelection}
          onRemovePlayer={onRemovePlayer}
          savedPlayers={playerData}
          allPlayers={playerData}
          editingPlayer={selectedPlayer !== null ? playerData[selectedPlayer] : null}
        />
      )}
    </div>
  );
};

export default GameTracker;
