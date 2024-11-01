import React from 'react';
import { Users } from 'lucide-react';

interface PlayerNameInputProps {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onShowRegisteredPlayers: () => void;
}

export const PlayerNameInput: React.FC<PlayerNameInputProps> = ({
  playerName,
  onPlayerNameChange,
  onShowRegisteredPlayers,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        プレイヤー名
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="プレイヤー名を入力"
        />
        <button
          onClick={onShowRegisteredPlayers}
          className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md hover:bg-indigo-200 transition-colors duration-200 flex items-center"
        >
          <Users size={16} className="mr-2" />
          登録済み
        </button>
      </div>
    </div>
  );
}; 