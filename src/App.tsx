import { useState, useCallback } from 'react';
import { PlayerData } from './types';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import { usePlayerManagement } from './hooks/usePlayerManagement';
import TableLayout from './components/TableLayout';
import PlayerAction from './components/PlayerAction';
import { seatPositions } from './constants/tableLayout';

function App() {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [editingSeat, setEditingSeat] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    players,
    addPlayer,
    updatePlayer,
    removePlayer,
    getAllPlayers,
  } = usePlayerManagement();

  const handleSeatClick = useCallback((seat: number) => {
    try {
      setSelectedSeat(seat);
      setError(null);
    } catch (error) {
      setError('席の選択に失敗しました');
      console.error(error);
    }
  }, []);

  const handleRegisterOpponent = useCallback((seat: number) => {
    try {
      setEditingSeat(seat);
      addPlayer(seat, {
        name: '',
        actions: [],
        memos: []
      });
      setError(null);
    } catch (error) {
      setError('プレイヤーの登録に失敗しました');
      console.error(error);
    }
  }, [addPlayer]);

  const handleEditRange = useCallback((seat: number) => {
    try {
      setEditingSeat(seat);
      setError(null);
    } catch (error) {
      setError('レンジの編集に失敗しました');
      console.error(error);
    }
  }, []);

  const handleRemovePlayer = useCallback((seat: number) => {
    try {
      removePlayer(seat);
      saveToLocalStorage('players', getAllPlayers());
      setError(null);
    } catch (error) {
      setError('プレイヤーの削除に失敗しました');
      console.error(error);
    }
  }, [removePlayer, getAllPlayers]);

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

      updatePlayer(playerSeat, (prevPlayer) => ({
        ...prevPlayer,
        actions: [...(prevPlayer.actions || []), { 
          action, 
          position, 
          hands,
          timestamp: Date.now()
        }],
      }));
      saveToLocalStorage('players', getAllPlayers());
      setError(null);
    } catch (error) {
      setError('アクションの更新に失敗しました');
      console.error(error);
    }
  }, [updatePlayer, getAllPlayers]);

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

      updatePlayer(playerSeat, (prevPlayer) => ({
        ...prevPlayer,
        name: playerName,
        actions: handRanges,
        memos: [...(prevPlayer.memos || []), { 
          text: memo, 
          handRanges,
          timestamp: Date.now()
        }],
      }));
      saveToLocalStorage('players', getAllPlayers());
      setError(null);
    } catch (error) {
      setError('メモの更新に失敗しました');
      console.error(error);
    }
  }, [updatePlayer, getAllPlayers]);

  const handleBack = useCallback(() => {
    setEditingSeat(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {editingSeat === null ? (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">ポーカープレイヤーノート</h1>
            <TableLayout
              seatPositions={seatPositions}
              playerData={players}
              selectedSeat={selectedSeat}
              onSeatClick={handleSeatClick}
              onEditRange={handleEditRange}
              onRemovePlayer={handleRemovePlayer}
              onRegisterOpponent={handleRegisterOpponent}
            />
          </>
        ) : (
          <PlayerAction
            seat={editingSeat}
            onActionUpdate={handleActionUpdate}
            onMemoUpdate={handleMemoUpdate}
            onBack={handleBack}
            onRemovePlayer={handleRemovePlayer}
            savedPlayers={players}
            allPlayers={getAllPlayers()}
            editingPlayer={players[editingSeat]}
          />
        )}
      </div>
    </div>
  );
}

export default App;