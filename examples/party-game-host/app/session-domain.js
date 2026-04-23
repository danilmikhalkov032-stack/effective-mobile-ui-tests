import { GAME_LIBRARY } from "../data/game-library";
import { MAFIA_ROLE_META, SPY_LOCATIONS } from "../data/role-meta";
import { makeIllustration } from "../utils/illustration";

export function getRecommendations(playersCount) {
  return GAME_LIBRARY.filter(
    (game) => playersCount >= game.playersMin && playersCount <= game.playersMax
  ).slice(0, 3);
}

export function createSessionRoles(gameId, playersCount) {
  if (gameId === "spy") {
    const location = SPY_LOCATIONS[Math.floor(Math.random() * SPY_LOCATIONS.length)];
    const spyIndex = Math.floor(Math.random() * playersCount);

    return Array.from({ length: playersCount }, (_, i) =>
      i === spyIndex
        ? {
            kind: "spy",
            title: "Ты — Шпион",
            helper: "Пойми локацию по вопросам остальных и не выдай себя.",
            image: makeIllustration("Шпион", "Угадай локацию по разговорам", "#EF4444", "#450A0A", "🕵"),
          }
        : {
            kind: "civil",
            title: location.name,
            helper: "Не говори слишком прямо, чтобы шпион не понял локацию.",
            image: location.image,
          }
    );
  }

  if (gameId === "undercover") {
    const oddIndex = Math.floor(Math.random() * playersCount);
    return Array.from({ length: playersCount }, (_, i) =>
      i === oddIndex
        ? {
            kind: "odd",
            title: "Волк",
            helper: "Твоё слово отличается. Будь максимально естественным.",
            image: makeIllustration("Волк", "Твоё слово отличается", "#F59E0B", "#78350F", "△"),
          }
        : {
            kind: "base",
            title: "Собака",
            helper: "У большинства одинаковое слово. Найдите отличающегося игрока.",
            image: makeIllustration("Собака", "Большинство видит одно и то же слово", "#06B6D4", "#164E63", "□"),
          }
    );
  }

  if (gameId === "mafia-classic") {
    const roles = [];
    const mafiaCount = playersCount >= 8 ? 2 : 1;

    for (let i = 0; i < mafiaCount; i += 1) {
      roles.push({
        kind: "mafia",
        title: "Ты — Мафия",
        helper: MAFIA_ROLE_META.mafia.description,
        image: MAFIA_ROLE_META.mafia.image,
      });
    }

    ["doctor", "prostitute", "commissar"].forEach((roleKey) => {
      roles.push({
        kind: roleKey,
        title: `Ты — ${MAFIA_ROLE_META[roleKey].label}`,
        helper: MAFIA_ROLE_META[roleKey].description,
        image: MAFIA_ROLE_META[roleKey].image,
      });
    });

    while (roles.length < playersCount) {
      roles.push({
        kind: "civilian",
        title: "Ты — Мирный",
        helper: MAFIA_ROLE_META.civilian.description,
        image: MAFIA_ROLE_META.civilian.image,
      });
    }

    return roles.sort(() => Math.random() - 0.5);
  }

  return [];
}

export function resolveMafiaNight({ roles, nightActions }) {
  const { mafiaTarget, doctorTarget, prostituteTarget, commissarTarget } = nightActions;

  const blockedRole = prostituteTarget != null ? roles[prostituteTarget]?.kind || null : null;
  const mafiaBlocked = blockedRole === "mafia";
  const doctorBlocked = blockedRole === "doctor";
  const commissarBlocked = blockedRole === "commissar";

  let eliminatedPlayer = null;
  if (mafiaTarget != null && !mafiaBlocked) {
    const saved = !doctorBlocked && doctorTarget === mafiaTarget;
    if (!saved) eliminatedPlayer = mafiaTarget;
  }

  let commissarResult = null;
  if (commissarTarget != null && !commissarBlocked) {
    commissarResult = roles[commissarTarget]?.kind === "mafia" ? "Мафия" : "Не мафия";
  }

  return { eliminatedPlayer, commissarResult };
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
