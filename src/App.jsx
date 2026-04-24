import { useEffect, useMemo, useState } from "react";

const GAME_LIBRARY = [
  {
    id: "spy",
    title: "Шпион",
    minPlayers: 3,
    maxPlayers: 10,
    duration: "10–15 мин",
    category: "Скрытые роли",
    mode: "Без ведущего",
    difficulty: "Средняя",
    description: "Один игрок — шпион, остальные знают общую локацию.",
    ruleSummary: "Задавайте вопросы и найдите шпиона до конца таймера.",
    defaultRoundSeconds: 180,
  },
  {
    id: "undercover",
    title: "Undercover",
    minPlayers: 3,
    maxPlayers: 12,
    duration: "10–15 мин",
    category: "Скрытые слова",
    mode: "Без ведущего",
    difficulty: "Средняя",
    description: "Один игрок получает отличающееся слово.",
    ruleSummary: "Обсуждайте, голосуйте и вычислите undercover-игрока.",
    defaultRoundSeconds: 180,
  },
  {
    id: "whoami",
    title: "Кто я?",
    minPlayers: 3,
    maxPlayers: 10,
    duration: "15–20 мин",
    category: "Роли и догадки",
    mode: "Без ведущего",
    difficulty: "Лёгкая",
    description: "Каждый угадывает своего персонажа через вопросы.",
    ruleSummary: "По очереди задавайте вопросы и угадайте роль.",
    defaultRoundSeconds: 240,
  },
  {
    id: "alias",
    title: "Alias Party",
    minPlayers: 4,
    maxPlayers: 12,
    duration: "15–25 мин",
    category: "Командная",
    mode: "Без ведущего",
    difficulty: "Лёгкая",
    description: "Объясняй слова своей команде на время.",
    ruleSummary: "Объясняйте слова, не используя однокоренные.",
    defaultRoundSeconds: 120,
  },
  {
    id: "mafia",
    title: "Мафия",
    minPlayers: 5,
    maxPlayers: 14,
    duration: "25–45 мин",
    category: "Социальная",
    mode: "С ведущим",
    difficulty: "Высокая",
    description: "Приложение помогает вести фазы день/ночь.",
    ruleSummary: "Ночью роли ходят, днём обсуждение и голосование.",
    defaultRoundSeconds: 0,
  },
  {
    id: "truthbluff",
    title: "Правда или Блеф",
    minPlayers: 4,
    maxPlayers: 12,
    duration: "15–20 мин",
    category: "Блеф",
    mode: "С ведущим",
    difficulty: "Лёгкая",
    description: "Истории, блеф и попытка угадать правду.",
    ruleSummary: "Делитесь историями и угадывайте, где правда.",
    defaultRoundSeconds: 180,
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

const APP_TABS = [
  { id: "home", label: "Старт" },
  { id: "games", label: "Игры" },
  { id: "packs", label: "Паки" },
  { id: "profile", label: "Профиль" },
];

function pickRecommendations(players) {
  return GAME_LIBRARY.filter((game) => players >= game.minPlayers && players <= game.maxPlayers).slice(0, 3);
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function formatSeconds(total) {
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function buildDealPackage(gameId, players) {
  const names = Array.from({ length: players }, (_, i) => `Игрок ${i + 1}`);

  if (gameId === "spy") {
    const spyIndex = Math.floor(Math.random() * players);
    const location = randomFrom(SPY_LOCATIONS);
    return {
      entries: names.map((name, idx) => ({
        name,
        secret: idx === spyIndex ? "Ты — Шпион" : `Локация: ${location}`,
        hint: idx === spyIndex ? "Слушай вопросы и вычисли локацию." : "Не выдавайте локацию слишком прямо.",
      })),
      context: {
        kind: "spy",
        spyName: names[spyIndex],
        location,
      },
    };
  }

  if (gameId === "undercover") {
    const oddIndex = Math.floor(Math.random() * players);
    const [commonWord, undercoverWord] = randomFrom(UNDERCOVER_WORDS);
    return {
      entries: names.map((name, idx) => ({
        name,
        secret: `Твоё слово: ${idx === oddIndex ? undercoverWord : commonWord}`,
        hint: "Опиши слово осторожно, чтобы не спалиться.",
      })),
      context: {
        kind: "undercover",
        undercoverName: names[oddIndex],
        commonWord,
        undercoverWord,
      },
    };
  }

  if (gameId === "whoami") {
    return {
      entries: names.map((name, idx) => ({
        name,
        secret: `Ты: ${WHO_AMI_ROLES[idx % WHO_AMI_ROLES.length]}`,
        hint: "Задавай вопросы, на которые отвечают Да/Нет.",
      })),
      context: { kind: "whoami" },
    };
  }

  if (gameId === "alias") {
    return {
      entries: names.map((name, idx) => ({
        name,
        secret: idx % 2 === 0 ? "Команда A" : "Команда B",
        hint: "Объясняйте слова быстро, не используя однокоренные.",
      })),
      context: { kind: "alias" },
    };
  }

  return {
    entries: names.map((name, idx) => ({
      name,
      secret: `Твоя роль: ${MAFIA_ROLES[idx % MAFIA_ROLES.length]}`,
      hint: "Сохрани роль в секрете и следуй фазам игры.",
    })),
    context: { kind: "mafia" },
  };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(6);
  const [selectedGameId, setSelectedGameId] = useState("spy");
  const [dealData, setDealData] = useState([]);
  const [dealContext, setDealContext] = useState({ kind: null });
  const [dealIndex, setDealIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [mafiaPhase, setMafiaPhase] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [votedName, setVotedName] = useState("");

  const selectedGame = useMemo(
    () => GAME_LIBRARY.find((g) => g.id === selectedGameId) || null,
    [selectedGameId]
  );

  const recommendations = useMemo(() => pickRecommendations(players), [players]);

  useEffect(() => {
    if (!timerActive || screen !== "round") return;
    const timer = setInterval(() => {
      setRoundSeconds((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive, screen]);

  const chips = ["6–8 игроков", "быстро", "скрытые роли", "на 10 минут"];

  const openSetup = (gameId) => {
    setSelectedGameId(gameId);
    const game = GAME_LIBRARY.find((item) => item.id === gameId);
    if (game) {
      setRoundSeconds(game.defaultRoundSeconds || 180);
    }
    setScreen("setup");
  };

  const startDeal = () => {
    if (!selectedGame) return;
    const dealPackage = buildDealPackage(selectedGame.id, players);
    setDealData(dealPackage.entries);
    setDealContext(dealPackage.context);
    setDealIndex(0);
    setShowSecret(false);
    setVotedName("");
    setTimerActive(false);
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

  const resultTitle = useMemo(() => {
    if (dealContext.kind === "spy") {
      const hitSpy = votedName === dealContext.spyName;
      return hitSpy ? "Шпион найден" : "Шпион ушёл от подозрений";
    }
    if (dealContext.kind === "undercover") {
      const hit = votedName === dealContext.undercoverName;
      return hit ? "Undercover раскрыт" : "Undercover выжил";
    }
    return "Раунд завершён";
  }, [dealContext, votedName]);

  const goToVoting = () => {
    setTimerActive(false);
    setScreen("vote");
  };

  return (
    <main className="app">
      <header className="app-header">
        <button className="brand" onClick={() => setScreen("home")}>Party Companion</button>
      </header>

      {screen === "home" && (
        <section className="card center">
          <h1>Быстрые игры для компании</h1>
          <p>Один телефон. Быстрый старт. Без хаоса.</p>
          <button className="cta" onClick={() => setScreen("players")}>Начать игру</button>
          <button className="secondary" onClick={() => setScreen(selectedGame ? "setup" : "players")}>
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
          <h2>Подбор для {players} игроков</h2>
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
                <span>{game.difficulty}</span>
                <span className={game.mode === "Без ведущего" ? "badge no-host" : "badge host"}>{game.mode}</span>
              </div>
              <button className="cta" onClick={() => openSetup(game.id)}>
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
              <button className="secondary" onClick={() => openSetup(game.id)}>Открыть</button>
            </article>
          ))}
          <h3>Игры с ведущим</h3>
          {GAME_LIBRARY.filter((g) => g.mode === "С ведущим").map((game) => (
            <article className="card game-card" key={game.id}>
              <h4>{game.title}</h4>
              <p>{game.description}</p>
              <button className="secondary" onClick={() => openSetup(game.id)}>Открыть</button>
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
          {selectedGame.mode === "Без ведущего" && (
            <label className="timer-setting">
              Таймер раунда (сек)
              <input
                type="range"
                min="60"
                max="420"
                step="30"
                value={roundSeconds}
                onChange={(event) => setRoundSeconds(Number(event.target.value))}
              />
              <strong>{formatSeconds(roundSeconds)}</strong>
            </label>
          )}
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
          <h2>Этап обсуждения</h2>
          <p className="timer">{formatSeconds(roundSeconds)}</p>
          <p>
            {selectedGame?.id === "spy"
              ? "Задавайте вопросы и ищите шпиона."
              : "Обсуждайте улики и ищите отличающегося игрока."}
          </p>
          <div className="row">
            <button className="secondary" onClick={() => setTimerActive((s) => !s)}>
              {timerActive ? "Пауза" : "Старт"}
            </button>
            <button className="secondary" onClick={() => { setTimerActive(false); setRoundSeconds(selectedGame?.defaultRoundSeconds || 180); }}>
              Сброс
            </button>
            <button className="cta" onClick={goToVoting}>К голосованию</button>
          </div>
        </section>
      )}

      {screen === "vote" && (
        <section className="card stack">
          <h2>Голосование</h2>
          <p>Кого считаете подозрительным?</p>
          <div className="vote-list">
            {dealData.map((entry) => (
              <button
                key={entry.name}
                className={votedName === entry.name ? "active" : ""}
                onClick={() => setVotedName(entry.name)}
              >
                {entry.name}
              </button>
            ))}
          </div>
          <button className="cta" disabled={!votedName} onClick={() => setScreen("result")}>Подтвердить голос</button>
        </section>
      )}

      {screen === "result" && (
        <section className="card center stack">
          <h2>{resultTitle}</h2>
          <p>Вы выбрали: {votedName || "—"}</p>
          {dealContext.kind === "spy" && (
            <div className="secret">
              <p>Шпион: {dealContext.spyName}</p>
              <p>Локация: {dealContext.location}</p>
            </div>
          )}
          {dealContext.kind === "undercover" && (
            <div className="secret">
              <p>Undercover: {dealContext.undercoverName}</p>
              <p>Слова: {dealContext.commonWord} / {dealContext.undercoverWord}</p>
            </div>
          )}
          <div className="row">
            <button className="secondary" onClick={() => setScreen("setup")}>Сыграть ещё</button>
            <button className="cta" onClick={() => setScreen("home")}>Новая игра</button>
          </div>
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
          <p>Последняя компания: {players} игроков</p>
          <p>Любимая игра: {selectedGame?.title || "Шпион"}</p>
          <button className="secondary" onClick={() => setScreen("setup")}>Вернуться к последнему сценарию</button>
        </section>
      )}

      <footer className="tabbar">
        {APP_TABS.map((tab) => (
          <button
            key={tab.id}
            className={screen === tab.id ? "tab active" : "tab"}
            onClick={() => setScreen(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </footer>
    </main>
  );
}
