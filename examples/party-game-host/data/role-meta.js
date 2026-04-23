import { makeIllustration } from "../utils/illustration";

export const SPY_LOCATIONS = [
  {
    id: "paris",
    name: "Париж",
    image: makeIllustration("Париж", "Локация для игры «Шпион»", "#9333EA", "#1E1B4B", "🗼"),
  },
  {
    id: "airport",
    name: "Аэропорт",
    image: makeIllustration("Аэропорт", "Локация для игры «Шпион»", "#2563EB", "#0F172A", "✈"),
  },
  {
    id: "hotel",
    name: "Отель",
    image: makeIllustration("Отель", "Локация для игры «Шпион»", "#F59E0B", "#7C2D12", "⌂"),
  },
];

export const MAFIA_ROLE_META = {
  mafia: {
    label: "Мафия",
    description: "Ночью выбирает жертву. Днём скрывается среди мирных.",
    image: makeIllustration("Мафия", "Скрывайся днём, действуй ночью", "#DC2626", "#3F0D12", "♠"),
  },
  doctor: {
    label: "Доктор",
    description: "Ночью выбирает одного игрока и может спасти его.",
    image: makeIllustration("Доктор", "Спасает одного игрока ночью", "#10B981", "#064E3B", "✚"),
  },
  prostitute: {
    label: "Проститутка",
    description: "Ночью выбирает игрока и блокирует его действие.",
    image: makeIllustration("Проститутка", "Блокирует действие выбранного игрока", "#EC4899", "#831843", "♥"),
  },
  commissar: {
    label: "Комиссар",
    description: "Ночью проверяет одного игрока и узнаёт, мафия он или нет.",
    image: makeIllustration("Комиссар", "Проверяет игроков ночью", "#3B82F6", "#172554", "★"),
  },
  civilian: {
    label: "Мирный",
    description: "Днём участвует в обсуждении и ищет мафию.",
    image: makeIllustration("Мирный", "Ищи мафию и голосуй днём", "#64748B", "#1E293B", "○"),
  },
};
