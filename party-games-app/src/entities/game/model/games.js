import { makeIllustration } from './illustration';

export const SPY_LOCATIONS = [
  { id: 'paris', name: 'Париж', image: makeIllustration('Париж', 'Локация для игры «Шпион»', '#9333EA', '#1E1B4B', '🗼') },
  { id: 'airport', name: 'Аэропорт', image: makeIllustration('Аэропорт', 'Локация для игры «Шпион»', '#2563EB', '#0F172A', '✈') },
  { id: 'beach', name: 'Пляж', image: makeIllustration('Пляж', 'Локация для игры «Шпион»', '#06B6D4', '#164E63', '☀') },
];

export const GAME_LIBRARY = [
  {
    id: 'spy',
    name: 'Шпион',
    description: 'Найдите игрока, который не знает локацию.',
    duration: '8–12 минут',
    playersMin: 4,
    playersMax: 10,
    timerDefault: 8,
    category: 'Скрытые роли',
  },
  {
    id: 'undercover',
    name: 'Undercover',
    description: 'У большинства одно слово, у одного — другое.',
    duration: '10 минут',
    playersMin: 3,
    playersMax: 10,
    timerDefault: 10,
    category: 'Обсуждение',
  },
  {
    id: 'mafia-classic',
    name: 'Мафия',
    description: 'Мафия, доктор, комиссар и мирные.',
    duration: '20–35 минут',
    playersMin: 6,
    playersMax: 12,
    timerDefault: 5,
    category: 'Классика',
  },
];

export function getRecommendations(playersCount) {
  return GAME_LIBRARY.filter((game) => playersCount >= game.playersMin && playersCount <= game.playersMax);
}
