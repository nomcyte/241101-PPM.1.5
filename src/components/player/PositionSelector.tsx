import React from 'react';
import { PositionType } from '../../types';

interface PositionSelectorProps {
  selectedPosition: PositionType | null;
  onPositionSelect: (position: PositionType) => void;
}

const POSITIONS: { value: PositionType; label: string }[] = [
  { value: 'UTG', label: 'UTG' },
  { value: 'UTG1', label: 'UTG+1' },
  { value: 'UTG2', label: 'UTG+2' },
  { value: 'LJ', label: 'LJ' },
  { value: 'HJ', label: 'HJ' },
  { value: 'CO', label: 'CO' },
  { value: 'BTN', label: 'BTN' },
  { value: 'SB', label: 'SB' },
  { value: 'BB', label: 'BB' },
];

export const PositionSelector: React.FC<PositionSelectorProps> = ({
  selectedPosition,
  onPositionSelect,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        ポジション
      </label>
      <div className="grid grid-cols-3 gap-2">
        {POSITIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onPositionSelect(value)}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
              ${selectedPosition === value
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}; 