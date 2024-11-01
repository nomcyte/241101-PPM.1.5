import React from 'react';
import { Edit, LogOut, Users } from 'lucide-react';
import { PlayerData } from '../../types';

interface SeatActionButtonsProps {
  player: PlayerData | null;
  seat: number;
  onEditRange: (seat: number) => void;
  onRemovePlayer: (seat: number) => void;
  onRegisterOpponent: (seat: number) => void;
  handleActionClick: (e: React.MouseEvent, action: () => void) => void;
}

export const SeatActionButtons: React.FC<SeatActionButtonsProps> = ({
  player,
  seat,
  onEditRange,
  onRemovePlayer,
  onRegisterOpponent,
  handleActionClick,
}) => {
  return (
    <div
      className="absolute flex flex-col gap-2 w-32 z-10"
      style={{
        left: '50%',
        bottom: '100%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
      }}
      onClick={e => e.stopPropagation()}
    >
      {!player ? (
        <button
          className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center justify-center text-sm shadow-md hover:bg-purple-600 transition-colors duration-200"
          onClick={(e) => handleActionClick(e, () => onRegisterOpponent(seat))}
          aria-label="プレイヤーを登録"
        >
          <Users size={16} className="mr-2" /> プレイヤーを登録
        </button>
      ) : (
        <>
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center justify-center text-sm shadow-md hover:bg-blue-600 transition-colors duration-200"
            onClick={(e) => handleActionClick(e, () => onEditRange(seat))}
            aria-label="プレイヤーを編集"
          >
            <Edit size={16} className="mr-2" /> 編集する
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center justify-center text-sm shadow-md hover:bg-red-600 transition-colors duration-200"
            onClick={(e) => handleActionClick(e, () => onRemovePlayer(seat))}
            aria-label="プレイヤーを退席"
          >
            <LogOut size={16} className="mr-2" /> 退席
          </button>
        </>
      )}
    </div>
  );
}; 