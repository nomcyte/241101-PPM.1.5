import React from 'react';

interface HandRangeDisplayProps {
  formattedRanges: string;
}

export const HandRangeDisplay: React.FC<HandRangeDisplayProps> = ({
  formattedRanges,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        現在のハンドレンジ
      </h3>
      <div
        className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md"
        dangerouslySetInnerHTML={{ __html: formattedRanges }}
      />
    </div>
  );
}; 