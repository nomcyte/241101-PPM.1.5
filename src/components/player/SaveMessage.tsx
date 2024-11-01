import React from 'react';

interface SaveMessageProps {
  message: string;
}

export const SaveMessage: React.FC<SaveMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <p
      className={`mt-2 text-sm ${
        message.includes('エラー') ? 'text-red-600' : 'text-green-600'
      }`}
    >
      {message}
    </p>
  );
}; 