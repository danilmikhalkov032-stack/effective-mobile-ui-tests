import { useEffect, useMemo, useState } from "react";
import { GAME_LIBRARY } from "../data/game-library";
import { createSessionRoles } from "../app/session-domain";

const DEFAULT_NIGHT_ACTIONS = {
  mafiaTarget: null,
  doctorTarget: null,
  prostituteTarget: null,
  commissarTarget: null,
  commissarResult: null,
};

export function useGameSession() {
  const [playersCount, setPlayersCount] = useState(0);
  const [selectedGameId, setSelectedGameId] = useState("spy");
  const [timerMinutes, setTimerMinutes] = useState(8);
  const [roles, setRoles] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedVote, setSelectedVote] = useState(null);
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [nightNumber, setNightNumber] = useState(1);
  const [nightActions, setNightActions] = useState(DEFAULT_NIGHT_ACTIONS);

  const selectedGame = useMemo(
    () => GAME_LIBRARY.find((game) => game.id === selectedGameId) || GAME_LIBRARY[0],
    [selectedGameId]
  );

  useEffect(() => {
    setTimerMinutes(selectedGame.timerDefault);
    if (!sessionStarted) setTimeLeft(selectedGame.timerDefault * 60);
  }, [selectedGame, sessionStarted]);

  useEffect(() => {
    if (!timerRunning) return undefined;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const buildSession = () => {
    setRoles(createSessionRoles(selectedGameId, playersCount));
    setCurrentPlayerIndex(0);
    setSelectedVote(null);
    setTimeLeft(timerMinutes * 60);
    setTimerRunning(false);
    setSessionStarted(true);
    setNightNumber(1);
    setNightActions(DEFAULT_NIGHT_ACTIONS);
  };

  const resetSession = () => {
    setRoles([]);
    setCurrentPlayerIndex(0);
    setSelectedVote(null);
    setTimeLeft(selectedGame.timerDefault * 60);
    setTimerRunning(false);
    setSessionStarted(false);
    setNightNumber(1);
    setNightActions(DEFAULT_NIGHT_ACTIONS);
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
    selectedVote,
    setSelectedVote,
    timeLeft,
    setTimeLeft,
    timerRunning,
    setTimerRunning,
    sessionStarted,
    buildSession,
    resetSession,
    nightNumber,
    setNightNumber,
    nightActions,
    setNightActions,
  };
}
