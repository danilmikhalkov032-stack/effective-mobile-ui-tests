import { SPY_LOCATIONS, GAME_LIBRARY } from '../../../entities/game/model/games';
import { makeIllustration } from '../../../entities/game/model/illustration';

export function createSessionRoles(gameId, playersCount) {
  if (gameId === 'spy') {
    const location = SPY_LOCATIONS[Math.floor(Math.random() * SPY_LOCATIONS.length)];
    const spyIndex = Math.floor(Math.random() * playersCount);

    return Array.from({ length: playersCount }, (_, i) =>
      i === spyIndex
        ? {
            kind: 'spy',
            title: 'Ты — Шпион',
            helper: 'Пойми локацию и не выдай себя.',
            image: makeIllustration('Шпион', 'Угадай локацию по разговорам', '#EF4444', '#450A0A', '🕵'),
          }
        : {
            kind: 'civil',
            title: location.name,
            helper: 'Не говори слишком прямо, чтобы не выдать локацию.',
            image: location.image,
          }
    );
  }

  if (gameId === 'undercover') {
    const oddIndex = Math.floor(Math.random() * playersCount);
    return Array.from({ length: playersCount }, (_, i) =>
      i === oddIndex
        ? { kind: 'odd', title: 'Волк', helper: 'У тебя другое слово.', image: makeIllustration('Волк', 'Твоё слово отличается', '#F59E0B', '#78350F', '△') }
        : { kind: 'base', title: 'Собака', helper: 'Найдите отличающегося игрока.', image: makeIllustration('Собака', 'Большинство видит одно слово', '#06B6D4', '#164E63', '□') }
    );
  }

  return Array.from({ length: playersCount }, () => ({
    kind: 'civilian',
    title: 'Ты — Мирный',
    helper: 'Ищи мафию во время обсуждения.',
    image: makeIllustration('Мирный', 'Ищи мафию и голосуй', '#64748B', '#1E293B', '○'),
  }));
}

export function findGameById(gameId) {
  return GAME_LIBRARY.find((game) => game.id === gameId) || GAME_LIBRARY[0];
}
