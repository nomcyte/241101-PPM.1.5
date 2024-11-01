import React, { useState } from 'react';
import { PlayerData } from '../types';
import { Edit, LogOut, Users } from 'lucide-react';

interface TableLayoutProps {
  seatPositions: { x: number; y: number }[];
  playerData: Record<number, PlayerData>;
  selectedSeat: number | null;
  onSeatClick: (seat: number) => void;
  onEditRange: (seat: number) => void;
  onRemovePlayer: (seat: number) => void;
  onRegisterOpponent: (seat: number) => void;
}

const TableLayout: React.FC<TableLayoutProps> = ({
  seatPositions,
  playerData,
  selectedSeat,
  onSeatClick,
  onEditRange,
  onRemovePlayer,
  onRegisterOpponent,
}) => {
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const handleSeatClick = (e: React.MouseEvent, seat: number) => {
    e.stopPropagation();
    setActivePlayer(activePlayer === seat ? null : seat);
    onSeatClick(seat);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setActivePlayer(null);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActivePlayer(null);
    }
  };

  return (
    <div className="relative w-96 h-64 mx-auto mb-8" onClick={handleBackgroundClick}>
      <div className="absolute inset-0 bg-green-600 rounded-full transform scale-x-[1.44] scale-y-[1.04] shadow-inner"></div>
      {seatPositions.map((position, index) => {
        const seat = index + 1;
        const player = playerData[seat];

        return (
          <div
            key={seat}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {activePlayer === seat && (
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
                  >
                    <Users size={16} className="mr-2" /> プレイヤーを登録
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center justify-center text-sm shadow-md hover:bg-blue-600 transition-colors duration-200"
                      onClick={(e) => handleActionClick(e, () => onEditRange(seat))}
                    >
                      <Edit size={16} className="mr-2" /> 編集する
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center justify-center text-sm shadow-md hover:bg-red-600 transition-colors duration-200"
                      onClick={(e) => handleActionClick(e, () => onRemovePlayer(seat))}
                    >
                      <LogOut size={16} className="mr-2" /> 退席
                    </button>
                  </>
                )}
              </div>
            )}
            <button
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-200 shadow-md ${
                player
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-white hover:bg-gray-100 text-gray-800'
              }`}
              onClick={(e) => handleSeatClick(e, seat)}
            >
              {player ? player.name.charAt(0).toUpperCase() : seat}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TableLayout;