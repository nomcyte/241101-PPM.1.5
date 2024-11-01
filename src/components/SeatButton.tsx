import React from 'react';
import { Edit, LogOut, Users } from 'lucide-react';
import { PlayerData } from '../types';

interface SeatButtonProps {
  seat: number;
  position: { x: number; y: number };
  player: PlayerData | null;
  isActive: boolean;
  onSeatClick: (e: React.MouseEvent, seat: number) => void;
  onEditRange: (seat: number) => void;
  onRemovePlayer: (seat: number) => void;
  onRegisterOpponent: (seat: number) => void;
}

export const SeatButton: React.FC<SeatButtonProps> = ({
  seat,
  position,
  player,
  isActive,
  onSeatClick,
  onEditRange,
  onRemovePlayer,
  onRegisterOpponent,
}) => {
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {isActive && (
        <SeatActionButtons
          player={player}
          seat={seat}
          onEditRange={onEditRange}
          onRemovePlayer={onRemovePlayer}
          onRegisterOpponent={onRegisterOpponent}
          handleActionClick={handleActionClick}
        />
      )}
      <button
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-200 shadow-md ${
          player
            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
            : 'bg-white hover:bg-gray-100 text-gray-800'
        }`}
        onClick={(e) => onSeatClick(e, seat)}
      >
        {player ? player.name.charAt(0).toUpperCase() : seat}
      </button>
    </div>
  );
};