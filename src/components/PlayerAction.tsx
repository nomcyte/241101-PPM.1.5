import React from 'react';
import { usePlayerAction } from '../hooks/usePlayerAction';
import HandRangeChart from './HandRangeChart';
import { PlayerData, ActionType, PositionType } from '../types';
import { formatRanges } from '../utils/handRangeUtils';
import { LogOut, Users, ChevronLeft } from 'lucide-react';
import RegisteredPlayerModal from './RegisteredPlayerModal';

interface PlayerActionProps {
  seat: number | null;
  onActionUpdate: (seat: number, action: ActionType, position: PositionType | null, hands: string[]) => void;
  onMemoUpdate: (seat: number | null, playerName: string, memo: string, handRanges: PlayerData['actions']) => void;
  onBack: () => void;
  onRemovePlayer: (seat: number) => void;
  savedPlayers: Record<number, PlayerData>;
  allPlayers: Record<number, PlayerData>;
  editingPlayer: PlayerData | null;
}

const PlayerAction: React.FC<PlayerActionProps> = ({
  seat,
  onActionUpdate,
  onMemoUpdate,
  onBack,
  onRemovePlayer,
  savedPlayers,
  allPlayers,
  editingPlayer,
}) => {
  const {
    state,
    setPlayerName,
    setMemo,
    setAction,
    setPosition,
    setHandRanges,
    setSaveMessage,
    toggleRegisteredPlayers,
    handleHandSelection,
    handleSubmit,
    handleRegisteredPlayerSelect,
  } = usePlayerAction(editingPlayer, {
    seat,
    onActionUpdate,
    onMemoUpdate,
  });
      const newRange = { action: selectedAction, position: selectedPosition, hands };
  const formattedRanges = React.useMemo(() => formatRanges(state.handRanges), [state.handRanges]);
      setHandRanges(prevRanges => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingPlayer ? 'プレイヤー編集' : '新規プレイヤー登録'}
        </h2>
      </div>
      
      <PlayerNameInput
        playerName={state.playerName}
        onPlayerNameChange={setPlayerName}
        onShowRegisteredPlayers={() => toggleRegisteredPlayers(true)}
      />
      setTimeout(() => setSaveMessage(''), 1500);
      <MemoInput
        memo={state.memo}
        onMemoChange={setMemo}
      />
    setPlayerName(selectedPlayer.name);
      <ActionSelector
        selectedAction={state.selectedAction}
        onActionSelect={setAction}
      />

      {state.selectedAction && (
        <PositionSelector
          selectedPosition={state.selectedPosition}
          onPositionSelect={setPosition}
        />
      )}
      onMemoUpdate(seat, playerName, memo, handRanges);
      {state.selectedAction && state.selectedPosition && (
        <HandRangeChart
          onHandSelection={handleHandSelection}
          selectedAction={state.selectedAction}
          selectedPosition={state.selectedPosition}
          existingRanges={state.handRanges}
          onSave={handleSubmit}
        />
      )}

<HandRangeDisplay formattedRanges={formattedRanges} />

      <ActionButtons
  onSubmit={handleSubmit}
  onBack={onBack}
  disabled={!state.playerName.trim()}
      />

      <SaveMessage message={state.saveMessage} />

      {seat !== null && (
        <RemovePlayerButton
          onRemovePlayer={() => onRemovePlayer(seat)}
        />
      )}

      {state.showRegisteredPlayers && (
        <RegisteredPlayerModal
          players={allPlayers}
          onPlayerSelect={handleRegisteredPlayerSelect}
          onClose={() => toggleRegisteredPlayers(false)}
        />
      )}
    </div>
  );
};

export default PlayerAction;