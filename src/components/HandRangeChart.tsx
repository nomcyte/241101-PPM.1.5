import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlayerData } from '../types';

interface HandRangeChartProps {
  onHandSelection: (hands: string[]) => void;
  selectedAction: string | null;
  selectedPosition: string | null;
  existingRanges: PlayerData['actions'];
  onSave: () => void;
}

const HandRangeChart: React.FC<HandRangeChartProps> = ({
  onHandSelection,
  selectedAction,
  selectedPosition,
  existingRanges,
  onSave,
}) => {
  const [selectedHands, setSelectedHands] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingHandsForCurrentAction = useMemo(() => {
    if (selectedAction && selectedPosition) {
      const existingRange = existingRanges.find(
        range => range.action === selectedAction && range.position === selectedPosition
      );
      return existingRange?.hands || [];
    }
    return [];
  }, [selectedAction, selectedPosition, existingRanges]);

  useEffect(() => {
    setSelectedHands(existingHandsForCurrentAction);
  }, [existingHandsForCurrentAction]);

  const toggleHand = useCallback((hand: string) => {
    setSelectedHands(prev => 
      prev.includes(hand) ? prev.filter(h => h !== hand) : [...prev, hand]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedAction && selectedPosition && !isSubmitting) {
      setIsSubmitting(true);
      onHandSelection(selectedHands);
      onSave();
      setIsSubmitting(false);
    }
  }, [selectedAction, selectedPosition, selectedHands, onHandSelection, onSave, isSubmitting]);

  const ranks = useMemo(() => ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'], []);

  const getHighlightColor = useCallback((hand: string) => {
    if (!selectedHands.includes(hand)) return '';

    switch (selectedAction) {
      case 'OPEN': return 'bg-blue-500 text-white';
      case 'CALL on IP': return 'bg-green-500 text-white';
      case 'CALL on OOP': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }, [selectedAction, selectedHands]);

  const getBaseColor = useCallback((row: string, col: string) => {
    if (row === col) return 'bg-red-200'; // Pocket pairs
    if (ranks.indexOf(row) < ranks.indexOf(col)) return 'bg-blue-200'; // Suited hands
    return 'bg-green-200'; // Offsuit hands
  }, [ranks]);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-13 gap-1 mb-4">
        {ranks.map((row) =>
          ranks.map((col) => {
            const hand = ranks.indexOf(row) <= ranks.indexOf(col) ? `${row}${col}s` : `${col}${row}o`;
            const highlightColor = getHighlightColor(hand);
            const baseColor = getBaseColor(row, col);

            return (
              <button
                key={hand}
                className={`w-8 h-8 text-xs font-bold rounded transition-colors duration-200 hover:opacity-80 
                  ${highlightColor || baseColor}`}
                onClick={() => toggleHand(hand)}
              >
                {hand}
              </button>
            );
          })
        )}
      </div>
      <button
        className={`w-full py-2 px-4 rounded-md transition-colors duration-200 
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? '保存中...' : 'ハンドレンジを保存'}
      </button>
    </div>
  );
};

export default HandRangeChart;