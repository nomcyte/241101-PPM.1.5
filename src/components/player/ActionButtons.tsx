import React from 'react';
import { ChevronLeft, Save } from 'lucide-react';

interface ActionButtonsProps {
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSubmit,
  onBack,
  disabled = false
}) => {
  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="保存"
      >
        <Save size={20} className="mr-2" />
        保存
      </button>
      <button
        onClick={onBack}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
        aria-label="戻る"
      >
        <ChevronLeft size={20} className="mr-2" />
        戻る
      </button>
    </div>
  );
}; 