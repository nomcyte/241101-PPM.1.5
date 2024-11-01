import React from 'react';
import { ActionType } from '../../types';

interface ActionSelectorProps {
  selectedAction: ActionType | null;
  onActionSelect: (action: ActionType) => void;
}

const ACTIONS: { value: ActionType; label: string }[] = [
  { value: 'OPEN', label: 'オープン' },
  { value: 'CALL_IP', label: 'コール (IP)' },
  { value: 'CALL_OOP', label: 'コール (OOP)' },
];

export const ActionSelector: React.FC<ActionSelectorProps> = ({
  selectedAction,
  onActionSelect,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        アクション
      </label>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onActionSelect(value)}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
              ${selectedAction === value
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