import { useMemo, useState } from 'react';
import { GAME_LIBRARY } from '../../../entities/game/model/games';
import { createSessionRoles } from './session-engine';

export function useGameSession() {
  const [playersCount, setPlayersCount] = useState(6);
  const [selectedGameId, setSelectedGameId] = useState('spy');
  const [timerMinutes, setTimerMinutes] = useState(8);
  const [roles, setRoles] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const selectedGame = useMemo(
    () => GAME_LIBRARY.find((game) => game.id === selectedGameId) || GAME_LIBRARY[0],
    [selectedGameId]
  );

  const buildSession = () => {
    setRoles(createSessionRoles(selectedGameId, playersCount));
    setCurrentPlayerIndex(0);
  };

  return {
    playersCount,
    setPlayersCount,
    selectedGameId,
    setSelectedGameId,
    selectedGame,
    timerMinutes,
    setTimerMinutes,
    roles,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    buildSession,
  };
}
