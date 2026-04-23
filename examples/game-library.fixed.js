export const GAME_LIBRARY = [
  {
    id: "spy",
    name: "Шпион",
    description:
      "Найдите игрока, который не знает локацию, прежде чем он поймёт, где вы находитесь.",
    duration: "8–12 минут",
    playersMin: 4,
    playersMax: 10,
    timerDefault: 8,
    category: "Скрытые роли",
    mode: "without-host",
    modeLabel: "Без ведущего",
  },
  {
    id: "undercover",
    name: "Undercover",
    description:
      "У большинства одно слово, у одного — другое. Нужно вычислить отличающегося игрока.",
    duration: "10 минут",
    playersMin: 3,
    playersMax: 10,
    timerDefault: 10,
    category: "На обсуждение",
    mode: "without-host",
    modeLabel: "Без ведущего",
  },
  {
    id: "mafia-classic",
    name: "Мафия",
    description:
      "Расширенная версия: мафия, доктор, проститутка, комиссар, день и ночь.",
    duration: "20–35 минут",
    playersMin: 6,
    playersMax: 12,
    timerDefault: 5,
    category: "Классика",
    mode: "without-host",
    modeLabel: "Без ведущего",
  },
];
