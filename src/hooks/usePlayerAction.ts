import { useReducer, useCallback } from 'react';
import { PlayerData, ActionType, PositionType } from '../types';

interface PlayerActionState {
  playerName: string;
  memo: string;
  selectedAction: ActionType | null;
  selectedPosition: PositionType | null;
  handRanges: PlayerData['actions'];
  saveMessage: string;
  showRegisteredPlayers: boolean;
}

type PlayerActionAction =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'SET_MEMO'; payload: string }
  | { type: 'SET_ACTION'; payload: ActionType | null }
  | { type: 'SET_POSITION'; payload: PositionType | null }
  | { type: 'SET_HAND_RANGES'; payload: PlayerData['actions'] }
  | { type: 'SET_SAVE_MESSAGE'; payload: string }
  | { type: 'TOGGLE_REGISTERED_PLAYERS'; payload: boolean };

const initialState: PlayerActionState = {
  playerName: '',
  memo: '',
  selectedAction: null,
  selectedPosition: null,
  handRanges: [],
  saveMessage: '',
  showRegisteredPlayers: false,
};

const playerActionReducer = (state: PlayerActionState, action: PlayerActionAction): PlayerActionState => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'SET_MEMO':
      return { ...state, memo: action.payload };
    case 'SET_ACTION':
      return { ...state, selectedAction: action.payload };
    case 'SET_POSITION':
      return { ...state, selectedPosition: action.payload };
    case 'SET_HAND_RANGES':
      return { ...state, handRanges: action.payload };
    case 'SET_SAVE_MESSAGE':
      return { ...state, saveMessage: action.payload };
    case 'TOGGLE_REGISTERED_PLAYERS':
      return { ...state, showRegisteredPlayers: action.payload };
    default:
      return state;
  }
};

export const usePlayerAction = (editingPlayer: PlayerData | null) => {
  const [state, dispatch] = useReducer(playerActionReducer, {
    ...initialState,
    playerName: editingPlayer?.name || '',
    handRanges: editingPlayer?.actions || [],
  });

  const setPlayerName = useCallback((name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: name });
  }, []);

  const setMemo = useCallback((memo: string) => {
    dispatch({ type: 'SET_MEMO', payload: memo });
  }, []);

  const setAction = useCallback((action: ActionType | null) => {
    dispatch({ type: 'SET_ACTION', payload: action });
  }, []);

  const setPosition = useCallback((position: PositionType | null) => {
    dispatch({ type: 'SET_POSITION', payload: position });
  }, []);

  const setHandRanges = useCallback((ranges: PlayerData['actions']) => {
    dispatch({ type: 'SET_HAND_RANGES', payload: ranges });
  }, []);

  const setSaveMessage = useCallback((message: string) => {
    dispatch({ type: 'SET_SAVE_MESSAGE', payload: message });
  }, []);

  const toggleRegisteredPlayers = useCallback((show: boolean) => {
    dispatch({ type: 'TOGGLE_REGISTERED_PLAYERS', payload: show });
  }, []);

  return {
    state,
    setPlayerName,
    setMemo,
    setAction,
    setPosition,
    setHandRanges,
    setSaveMessage,
    toggleRegisteredPlayers,
  };
}; 