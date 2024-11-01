// Player related types
export interface PlayerData {
  name: string;
  actions: HandRange[];
  memos: Memo[];
}

// Screen and action types
export type Screen = 'seatSelection' | 'gameTracker' | 'playerAction' | 'playerList';
export type ActionType = 'OPEN' | 'CALL_IP' | 'CALL_OOP';
export type PositionType = 'UTG' | 'UTG1' | 'UTG2' | 'HJ' | 'LJ' | 'CO' | 'BTN' | 'SB' | 'BB';

// Hand range types
export interface HandRange {
  action: ActionType;
  position: PositionType | null;
  hands: string[];
}

export interface Memo {
  text: string;
  handRanges: HandRange[];
  timestamp: number;
}