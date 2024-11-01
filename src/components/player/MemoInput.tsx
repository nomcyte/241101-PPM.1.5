import React from 'react';

interface MemoInputProps {
  memo: string;
  onMemoChange: (memo: string) => void;
}

export const MemoInput: React.FC<MemoInputProps> = ({
  memo,
  onMemoChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        メモ
      </label>
      <textarea
        value={memo}
        onChange={(e) => onMemoChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
        placeholder="プレイヤーに関するメモを入力"
      />
    </div>
  );
}; 