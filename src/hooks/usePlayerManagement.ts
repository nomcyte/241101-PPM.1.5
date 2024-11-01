import { useState, useCallback } from 'react';
import { PlayerData } from '../types';

export const usePlayerManagement = () => {
  const [players, setPlayers] = useState<Record<number, PlayerData>>({});

  const addPlayer = useCallback((seat: number, playerData: PlayerData) => {
    setPlayers(prev => ({
      ...prev,
      [seat]: playerData
    }));
  }, []);

  const updatePlayer = useCallback((seat: number, updater: (prevPlayer: PlayerData) => PlayerData) => {
    setPlayers(prev => {
      const currentPlayer = prev[seat] || {
        name: '',
        actions: [],
        memos: []
      };
      return {
        ...prev,
        [seat]: updater(currentPlayer)
      };
    });
  }, []);

  const removePlayer = useCallback((seat: number) => {
    setPlayers(prev => {
      const newPlayers = { ...prev };
      delete newPlayers[seat];
      return newPlayers;
    });
  }, []);

  const getPlayerBySeat = useCallback((seat: number): PlayerData | undefined => {
    return players[seat];
  }, [players]);

  const getAllPlayers = useCallback((): Record<number, PlayerData> => {
    return players;
  }, [players]);

  return {
    players,
    addPlayer,
    updatePlayer,
    removePlayer,
    getPlayerBySeat,
    getAllPlayers,
  };
};