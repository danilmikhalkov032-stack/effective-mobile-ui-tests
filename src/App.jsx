import { useMemo, useState } from "react";

const GAME_LIBRARY = [
  {
    id: "spy",
    title: "Шпион",
    minPlayers: 3,
    maxPlayers: 10,
    duration: "10–15 мин",
    category: "Скрытые роли",
    mode: "Без ведущего",
    description: "Один игрок — шпион, остальные знают общую локацию.",
    ruleSummary: "Задавайте вопросы и найдите шпиона до конца таймера.",
  },
  {
    id: "undercover",
    title: "Undercover",
    minPlayers: 3,
    maxPlayers: 12,
    duration: "10–15 мин",
    category: "Скрытые слова",
    mode: "Без ведущего",
    description: "Один игрок получает отличающееся слово.",
    ruleSummary: "Обсуждайте, голосуйте и вычислите undercover-игрока.",
  },
  {
    id: "whoami",
    title: "Кто я?",
    minPlayers: 3,
    maxPlayers: 10,
    duration: "15–20 мин",
    category: "Роли и догадки",
    mode: "Без ведущего",
    description: "Каждый угадывает своего персонажа через вопросы.",
    ruleSummary: "По очереди задавайте вопросы и угадайте роль.",
  },
  {
    id: "alias",
    title: "Alias Party",
    minPlayers: 4,
    maxPlayers: 12,
    duration: "15–25 мин",
    category: "Командная",
    mode: "Без ведущего",
    description: "Объясняй слова своей команде на время.",
    ruleSummary: "Объясняйте слова, не используя однокоренные.",
  },
  {
    id: "mafia",
    title: "Мафия",
    minPlayers: 5,
    maxPlayers: 14,
    duration: "25–45 мин",
    category: "Социальная",
    mode: "С ведущим",
    description: "Приложение помогает вести фазы день/ночь.",
    ruleSummary: "Ночью роли ходят, днём обсуждение и голосование.",
  },
  {
    id: "truthbluff",
    title: "Правда или Блеф",
    minPlayers: 4,
    maxPlayers: 12,
    duration: "15–20 мин",
    category: "Блеф",
    mode: "С ведущим",
    description: "Истории, блеф и попытка угадать правду.",
    ruleSummary: "Делитесь историями и угадывайте, где правда.",
  },
];

const SPY_LOCATIONS = ["Аэропорт", "Пляж", "Школа", "Банк", "Кинотеатр", "Корабль"];
const UNDERCOVER_WORDS = [
  ["Собака", "Волк"],
  ["Кофе", "Какао"],
  ["Гитара", "Скрипка"],
  ["Пицца", "Лазанья"],
];
const WHO_AMI_ROLES = ["Шерлок", "Бэтмен", "Гарри Поттер", "Тор", "Илон Маск", "Пикачу"];
const MAFIA_ROLES = ["Мафия", "Доктор", "Проститутка", "Комиссар", "Мирный"];

function pickRecommendations(players) {
  return GAME_LIBRARY.filter((game) => players >= game.minPlayers && players <= game.maxPlayers).slice(0, 3);
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildDealData(gameId, players) {
  const names = Array.from({ length: players }, (_, i) => `Игрок ${i + 1}`);

  if (gameId === "spy") {
    const spyIndex = Math.floor(Math.random() * players);
    const location = randomFrom(SPY_LOCATIONS);
    return names.map((name, idx) => ({
      name,
      secret: idx === spyIndex ? "Ты — Шпион" : `Локация: ${location}`,
      hint: idx === spyIndex ? "Слушай вопросы и вычисли локацию." : "Не выдавайте локацию слишком прямо.",
    }));
  }

  if (gameId === "undercover") {
    const oddIndex = Math.floor(Math.random() * players);
    const [commonWord, undercoverWord] = randomFrom(UNDERCOVER_WORDS);
    return names.map((name, idx) => ({
      name,
      secret: `Твоё слово: ${idx === oddIndex ? undercoverWord : commonWord}`,
      hint: "Опиши слово осторожно, чтобы не спалиться.",
    }));
  }

  if (gameId === "whoami") {
    return names.map((name, idx) => ({
      name,
      secret: `Ты: ${WHO_AMI_ROLES[idx % WHO_AMI_ROLES.length]}`,
      hint: "Задавай вопросы, на которые отвечают Да/Нет.",
    }));
  }

  if (gameId === "alias") {
    return names.map((name, idx) => ({
      name,
      secret: idx % 2 === 0 ? "Команда A" : "Команда B",
      hint: "Объясняйте слова быстро, не используя однокоренные.",
    }));
  }

  return names.map((name, idx) => ({
    name,
    secret: `Твоя роль: ${MAFIA_ROLES[idx % MAFIA_ROLES.length]}`,
    hint: "Сохрани роль в секрете и следуй фазам игры.",
  }));
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(6);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [dealData, setDealData] = useState([]);
  const [dealIndex, setDealIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [mafiaPhase, setMafiaPhase] = useState(0);

  const selectedGame = useMemo(
    () => GAME_LIBRARY.find((g) => g.id === selectedGameId) || null,
    [selectedGameId]
  );

  const recommendations = useMemo(() => pickRecommendations(players), [players]);

  const chips = ["6–8 игроков", "быстро", "скрытые роли", "на 10 минут"];

  const startDeal = () => {
    if (!selectedGame) return;
    setDealData(buildDealData(selectedGame.id, players));
    setDealIndex(0);
    setShowSecret(false);
    setScreen("deal");
  };

  const nextPlayer = () => {
    if (dealIndex + 1 >= dealData.length) {
      if (selectedGame?.id === "mafia") {
        setMafiaPhase(0);
        setScreen("mafia");
        return;
      }
      setScreen("round");
      return;
    }
    setDealIndex((p) => p + 1);
    setShowSecret(false);
  };

  const mafiaPhases = [
    "Ночь 1: Город засыпает",
    "Мафия выбирает цель",
    "Доктор выбирает кого спасти",
    "Проститутка выбирает, кого блокировать",
    "Комиссар проверяет игрока",
    "Утро: объявите исход ночи",
    "День: обсуждение и голосование",
  ];

  return (
    <main className="app">
      <header className="app-header">
        <button className="ghost" onClick={() => setScreen("home")}>Party Companion</button>
        <nav>
          <button className="ghost" onClick={() => setScreen("games")}>Игры</button>
          <button className="ghost" onClick={() => setScreen("packs")}>Паки</button>
          <button className="ghost" onClick={() => setScreen("profile")}>Профиль</button>
        </nav>
      </header>

      {screen === "home" && (
        <section className="card center">
          <h1>Быстрые игры для компании</h1>
          <p>Один телефон. Быстрый старт. Без хаоса.</p>
          <button className="cta" onClick={() => setScreen("players")}>Начать игру</button>
          <button className="secondary" onClick={() => selectedGame ? setScreen("setup") : setScreen("players")}>
            Продолжить последнюю игру
          </button>
          <div className="chips">{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
        </section>
      )}

      {screen === "players" && (
        <section className="card">
          <h2>Сколько вас игроков?</h2>
          <p className="big-number">{players}</p>
          <div className="grid">
            {Array.from({ length: 8 }, (_, i) => i + 3).map((count) => (
              <button
                key={count}
                className={count === players ? "active" : ""}
                onClick={() => setPlayers(count)}
              >
                {count}
              </button>
            ))}
          </div>
          <button className="cta" onClick={() => setScreen("recommendations")}>Дальше</button>
        </section>
      )}

      {screen === "recommendations" && (
        <section className="stack">
          <h2>Подходящие игры для {players} игроков</h2>
          {recommendations.map((game) => (
            <article key={game.id} className="card game-card">
              <div>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
              <div className="meta">
                <span>{game.duration}</span>
                <span>{game.minPlayers}–{game.maxPlayers}</span>
                <span>{game.category}</span>
                <span className={game.mode === "Без ведущего" ? "badge no-host" : "badge host"}>{game.mode}</span>
              </div>
              <button className="cta" onClick={() => { setSelectedGameId(game.id); setScreen("setup"); }}>
                Играть
              </button>
            </article>
          ))}
        </section>
      )}

      {screen === "games" && (
        <section className="stack">
          <h2>Библиотека игр</h2>
          <h3>Игры без ведущего</h3>
          {GAME_LIBRARY.filter((g) => g.mode === "Без ведущего").map((game) => (
            <article className="card game-card" key={game.id}>
              <h4>{game.title}</h4>
              <p>{game.description}</p>
              <button className="secondary" onClick={() => { setSelectedGameId(game.id); setScreen("setup"); }}>Открыть</button>
            </article>
          ))}
          <h3>Игры с ведущим</h3>
          {GAME_LIBRARY.filter((g) => g.mode === "С ведущим").map((game) => (
            <article className="card game-card" key={game.id}>
              <h4>{game.title}</h4>
              <p>{game.description}</p>
              <button className="secondary" onClick={() => { setSelectedGameId(game.id); setScreen("setup"); }}>Открыть</button>
            </article>
          ))}
        </section>
      )}

      {screen === "setup" && selectedGame && (
        <section className="card stack">
          <h2>{selectedGame.title}</h2>
          <p>{selectedGame.ruleSummary}</p>
          <div className="meta">
            <span>Игроков: {players}</span>
            <span>Длительность: {selectedGame.duration}</span>
            <span>{selectedGame.mode}</span>
          </div>
          <button className="cta" onClick={startDeal}>Раздать роли</button>
        </section>
      )}

      {screen === "deal" && dealData[dealIndex] && (
        <section className="card center stack">
          <h2>{dealData[dealIndex].name}</h2>
          <p>Передайте телефон и нажмите кнопку ниже.</p>
          {!showSecret ? (
            <button className="cta" onClick={() => setShowSecret(true)}>Показать роль</button>
          ) : (
            <>
              <div className="secret">
                <h3>{dealData[dealIndex].secret}</h3>
                <p>{dealData[dealIndex].hint}</p>
              </div>
              <button className="cta" onClick={nextPlayer}>
                {dealIndex + 1 === dealData.length ? "Начать игру" : "Передать следующему"}
              </button>
            </>
          )}
          <small>{dealIndex + 1} / {dealData.length}</small>
        </section>
      )}

      {screen === "round" && (
        <section className="card center stack">
          <h2>Раунд запущен</h2>
          <p>{selectedGame?.id === "spy" ? "Задавайте вопросы, чтобы вычислить шпиона." : "Обсуждение началось. Таймер идёт."}</p>
          <div className="row">
            <button className="secondary">Пауза</button>
            <button className="cta">Завершить</button>
          </div>
          <button className="ghost" onClick={() => setScreen("home")}>Новая игра</button>
        </section>
      )}

      {screen === "mafia" && (
        <section className="card stack">
          <h2>Мафия · Ассистент ведущего</h2>
          <p>{mafiaPhases[mafiaPhase]}</p>
          <div className="row">
            <button className="secondary" onClick={() => setMafiaPhase((p) => Math.max(p - 1, 0))}>Назад</button>
            <button className="cta" onClick={() => setMafiaPhase((p) => Math.min(p + 1, mafiaPhases.length - 1))}>Дальше</button>
          </div>
          {mafiaPhase === mafiaPhases.length - 1 && (
            <button className="cta" onClick={() => setScreen("home")}>Начать новую партию</button>
          )}
        </section>
      )}

      {screen === "packs" && (
        <section className="card stack">
          <h2>Паки</h2>
          <div className="grid packs">
            {["Classic Party", "New Friends", "Late Night"].map((pack) => <span key={pack}>{pack}</span>)}
          </div>
        </section>
      )}

      {screen === "profile" && (
        <section className="card stack">
          <h2>Профиль</h2>
          <p>Последняя компания: 7 игроков</p>
          <p>Любимая игра: Шпион</p>
          <button className="secondary" onClick={() => setScreen("setup")}>Вернуться к последнему сценарию</button>
        </section>
      )}
    </main>
  );
}
