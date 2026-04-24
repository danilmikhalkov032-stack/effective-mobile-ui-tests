import { useEffect, useMemo, useState } from "react";

const GAME_LIBRARY = [
  { id: "spy", title: "Шпион", minPlayers: 3, maxPlayers: 10, duration: "10–15 мин", category: "Скрытые роли", mode: "Без ведущего", difficulty: "Средняя", description: "Один игрок — шпион, остальные знают общую локацию.", ruleSummary: "Задавайте вопросы и найдите шпиона до конца таймера.", defaultRoundSeconds: 180 },
  { id: "undercover", title: "Undercover", minPlayers: 3, maxPlayers: 12, duration: "10–15 мин", category: "Скрытые слова", mode: "Без ведущего", difficulty: "Средняя", description: "Один игрок получает отличающееся слово.", ruleSummary: "Обсуждайте, голосуйте и вычислите undercover-игрока.", defaultRoundSeconds: 180 },
  { id: "whoami", title: "Кто я?", minPlayers: 3, maxPlayers: 10, duration: "15–20 мин", category: "Роли и догадки", mode: "Без ведущего", difficulty: "Лёгкая", description: "Каждый угадывает своего персонажа через вопросы.", ruleSummary: "По очереди задавайте вопросы и угадайте роль.", defaultRoundSeconds: 240 },
  { id: "alias", title: "Alias Party", minPlayers: 4, maxPlayers: 12, duration: "15–25 мин", category: "Командная", mode: "Без ведущего", difficulty: "Лёгкая", description: "Объясняй слова своей команде на время.", ruleSummary: "Объясняйте слова, не используя однокоренные.", defaultRoundSeconds: 120 },
  { id: "mafia", title: "Мафия", minPlayers: 5, maxPlayers: 14, duration: "25–45 мин", category: "Социальная", mode: "С ведущим", difficulty: "Высокая", description: "Приложение помогает вести фазы день/ночь.", ruleSummary: "Ночью роли ходят, днём обсуждение и голосование.", defaultRoundSeconds: 0 },
  { id: "truthbluff", title: "Правда или Блеф", minPlayers: 4, maxPlayers: 12, duration: "15–20 мин", category: "Блеф", mode: "С ведущим", difficulty: "Лёгкая", description: "Истории, блеф и попытка угадать правду.", ruleSummary: "Делитесь историями и угадывайте, где правда.", defaultRoundSeconds: 180 },
];

const SPY_LOCATIONS = ["Аэропорт", "Пляж", "Школа", "Банк", "Кинотеатр", "Корабль"];
const UNDERCOVER_WORDS = [["Собака", "Волк"], ["Кофе", "Какао"], ["Гитара", "Скрипка"], ["Пицца", "Лазанья"]];
const WHO_AMI_ROLES = ["Шерлок", "Бэтмен", "Гарри Поттер", "Тор", "Илон Маск", "Пикачу"];
const BASE_MAFIA_ROLES = ["Мафия", "Доктор", "Проститутка", "Комиссар", "Мирный"];

const APP_TABS = [
  { id: "home", label: "Старт" },
  { id: "games", label: "Игры" },
  { id: "packs", label: "Паки" },
  { id: "profile", label: "Профиль" },
];

const MAFIA_PHASES = ["intro", "mafia", "doctor", "escort", "commissioner", "morning", "dayvote"];

const pickRecommendations = (players) =>
  GAME_LIBRARY.filter((game) => players >= game.minPlayers && players <= game.maxPlayers).slice(0, 3);

const randomFrom = (array) => array[Math.floor(Math.random() * array.length)];

const formatSeconds = (total) => `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

function distributeMafiaRoles(names) {
  const roleDeck = [];
  const mafiaCount = names.length >= 9 ? 2 : 1;
  for (let i = 0; i < mafiaCount; i += 1) roleDeck.push("Мафия");
  roleDeck.push("Доктор", "Проститутка", "Комиссар");
  while (roleDeck.length < names.length) roleDeck.push("Мирный");
  const shuffled = [...roleDeck].sort(() => Math.random() - 0.5);
  const roleByName = {};
  names.forEach((name, idx) => {
    roleByName[name] = shuffled[idx] || BASE_MAFIA_ROLES[idx % BASE_MAFIA_ROLES.length];
  });
  return roleByName;
}

function buildDealPackage(gameId, names) {
  if (gameId === "spy") {
    const spyIndex = Math.floor(Math.random() * names.length);
    const location = randomFrom(SPY_LOCATIONS);
    return {
      entries: names.map((name, idx) => ({ name, secret: idx === spyIndex ? "Ты — Шпион" : `Локация: ${location}`, hint: idx === spyIndex ? "Слушай вопросы и вычисли локацию." : "Не выдавайте локацию слишком прямо." })),
      context: { kind: "spy", spyName: names[spyIndex], location },
    };
  }

  if (gameId === "undercover") {
    const oddIndex = Math.floor(Math.random() * names.length);
    const [commonWord, undercoverWord] = randomFrom(UNDERCOVER_WORDS);
    return {
      entries: names.map((name, idx) => ({ name, secret: `Твоё слово: ${idx === oddIndex ? undercoverWord : commonWord}`, hint: "Опиши слово осторожно, чтобы не спалиться." })),
      context: { kind: "undercover", undercoverName: names[oddIndex], commonWord, undercoverWord },
    };
  }

  if (gameId === "whoami") {
    return {
      entries: names.map((name, idx) => ({ name, secret: `Ты: ${WHO_AMI_ROLES[idx % WHO_AMI_ROLES.length]}`, hint: "Задавай вопросы, на которые отвечают Да/Нет." })),
      context: { kind: "whoami" },
    };
  }

  if (gameId === "alias") {
    return {
      entries: names.map((name, idx) => ({ name, secret: idx % 2 === 0 ? "Команда A" : "Команда B", hint: "Объясняйте слова быстро, не используя однокоренные." })),
      context: { kind: "alias" },
    };
  }

  const roleByName = distributeMafiaRoles(names);
  return {
    entries: names.map((name) => ({ name, secret: `Твоя роль: ${roleByName[name]}`, hint: "Сохрани роль в секрете и следуй фазам игры." })),
    context: { kind: "mafia", roleByName },
  };
}

function ensurePlayerNames(currentNames, players) {
  return Array.from({ length: players }, (_, i) => currentNames[i] || `Игрок ${i + 1}`);
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(6);
  const [playerNames, setPlayerNames] = useState(Array.from({ length: 6 }, (_, i) => `Игрок ${i + 1}`));
  const [selectedGameId, setSelectedGameId] = useState("spy");

  const [dealData, setDealData] = useState([]);
  const [dealContext, setDealContext] = useState({ kind: null });
  const [dealIndex, setDealIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const [roundSeconds, setRoundSeconds] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [votedName, setVotedName] = useState("");

  const [mafiaPhaseIndex, setMafiaPhaseIndex] = useState(0);
  const [mafiaRound, setMafiaRound] = useState(1);
  const [alivePlayers, setAlivePlayers] = useState([]);
  const [mafiaActions, setMafiaActions] = useState({ mafiaTarget: "", doctorSave: "", escortBlock: "", commissionerCheck: "", dayExile: "" });
  const [mafiaNightSummary, setMafiaNightSummary] = useState(null);
  const [mafiaHistory, setMafiaHistory] = useState([]);

  const selectedGame = useMemo(() => GAME_LIBRARY.find((g) => g.id === selectedGameId) || null, [selectedGameId]);
  const recommendations = useMemo(() => pickRecommendations(players), [players]);

  useEffect(() => {
    setPlayerNames((prev) => ensurePlayerNames(prev, players));
  }, [players]);

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
  const mafiaPhase = MAFIA_PHASES[mafiaPhaseIndex];

  const aliveRoles = useMemo(() => {
    if (!dealContext.roleByName) return { mafia: 0, citizens: 0 };
    let mafia = 0;
    let citizens = 0;
    alivePlayers.forEach((name) => {
      if (dealContext.roleByName[name] === "Мафия") mafia += 1;
      else citizens += 1;
    });
    return { mafia, citizens };
  }, [alivePlayers, dealContext]);

  const gameEndLabel = useMemo(() => {
    if (aliveRoles.mafia === 0) return "Мирные победили";
    if (aliveRoles.mafia >= aliveRoles.citizens) return "Мафия победила";
    return "";
  }, [aliveRoles]);

  const activeNames = useMemo(() => playerNames.filter((name) => name.trim()), [playerNames]);

  const openSetup = (gameId) => {
    setSelectedGameId(gameId);
    const game = GAME_LIBRARY.find((item) => item.id === gameId);
    if (game) setRoundSeconds(game.defaultRoundSeconds || 180);
    setScreen("setup");
  };

  const updatePlayerName = (index, value) => {
    setPlayerNames((prev) => {
      const next = [...prev];
      next[index] = value || `Игрок ${index + 1}`;
      return next;
    });
  };

  const startDeal = () => {
    if (!selectedGame) return;
    const names = ensurePlayerNames(playerNames, players).map((name, idx) => name.trim() || `Игрок ${idx + 1}`);
    setPlayerNames(names);
    const dealPackage = buildDealPackage(selectedGame.id, names);
    setDealData(dealPackage.entries);
    setDealContext(dealPackage.context);
    setDealIndex(0);
    setShowSecret(false);
    setVotedName("");
    setTimerActive(false);

    if (selectedGame.id === "mafia") {
      setMafiaRound(1);
      setMafiaPhaseIndex(0);
      setAlivePlayers(names);
      setMafiaActions({ mafiaTarget: "", doctorSave: "", escortBlock: "", commissionerCheck: "", dayExile: "" });
      setMafiaNightSummary(null);
      setMafiaHistory([]);
    }

    setScreen("deal");
  };

  const nextPlayer = () => {
    if (dealIndex + 1 >= dealData.length) {
      if (selectedGame?.id === "mafia") {
        setScreen("mafia");
        return;
      }
      setScreen("round");
      return;
    }
    setDealIndex((p) => p + 1);
    setShowSecret(false);
  };

  const applyNightResolution = () => {
    const roleByName = dealContext.roleByName || {};
    const aliveSet = new Set(alivePlayers);

    const blockedRole = mafiaActions.escortBlock ? roleByName[mafiaActions.escortBlock] : "";
    const mafiaBlocked = blockedRole === "Мафия";
    const doctorBlocked = blockedRole === "Доктор";

    const killTarget = mafiaBlocked ? "" : mafiaActions.mafiaTarget;
    const healed = !doctorBlocked && mafiaActions.doctorSave && mafiaActions.doctorSave === killTarget;

    let died = "";
    if (killTarget && !healed && aliveSet.has(killTarget)) {
      died = killTarget;
      aliveSet.delete(killTarget);
    }

    let commissionerResult = "";
    if (mafiaActions.commissionerCheck) {
      const checkedRole = roleByName[mafiaActions.commissionerCheck] || "—";
      commissionerResult = checkedRole === "Мафия" ? "Проверка: это мафия" : "Проверка: не мафия";
    }

    const summary = {
      round: mafiaRound,
      died,
      healed: healed ? mafiaActions.doctorSave : "",
      blocked: mafiaActions.escortBlock,
      commissionerResult,
    };

    setMafiaNightSummary(summary);
    setMafiaHistory((prev) => [...prev, summary]);
    setAlivePlayers(Array.from(aliveSet));
  };

  const applyDayVote = () => {
    if (!mafiaActions.dayExile) return;
    setAlivePlayers((prev) => prev.filter((name) => name !== mafiaActions.dayExile));
    setMafiaHistory((prev) => [
      ...prev,
      { round: mafiaRound, dayVote: mafiaActions.dayExile },
    ]);
  };

  const nextMafiaPhase = () => {
    if (gameEndLabel) return;
    if (mafiaPhase === "commissioner") {
      applyNightResolution();
    }
    if (mafiaPhase === "dayvote") {
      applyDayVote();
      setMafiaRound((r) => r + 1);
      setMafiaActions({ mafiaTarget: "", doctorSave: "", escortBlock: "", commissionerCheck: "", dayExile: "" });
      setMafiaNightSummary(null);
      setMafiaPhaseIndex(0);
      return;
    }
    setMafiaPhaseIndex((idx) => Math.min(idx + 1, MAFIA_PHASES.length - 1));
  };

  const prevMafiaPhase = () => setMafiaPhaseIndex((idx) => Math.max(idx - 1, 0));

  const resultTitle = useMemo(() => {
    if (dealContext.kind === "spy") return votedName === dealContext.spyName ? "Шпион найден" : "Шпион ушёл от подозрений";
    if (dealContext.kind === "undercover") return votedName === dealContext.undercoverName ? "Undercover раскрыт" : "Undercover выжил";
    return "Раунд завершён";
  }, [dealContext, votedName]);

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
          <button className="secondary" onClick={() => setScreen(selectedGame ? "setup" : "players")}>Продолжить последнюю игру</button>
          <div className="chips">{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
        </section>
      )}

      {screen === "players" && (
        <section className="card stack">
          <h2>Сколько вас игроков?</h2>
          <p className="big-number">{players}</p>
          <div className="grid">
            {Array.from({ length: 8 }, (_, i) => i + 3).map((count) => (
              <button key={count} className={count === players ? "active" : ""} onClick={() => setPlayers(count)}>{count}</button>
            ))}
          </div>
          <div className="stack">
            <h3>Имена игроков</h3>
            <div className="names-grid">
              {ensurePlayerNames(playerNames, players).map((name, index) => (
                <label key={`${index}-name`} className="name-field">
                  <span>Игрок {index + 1}</span>
                  <input value={name} onChange={(event) => updatePlayerName(index, event.target.value)} />
                </label>
              ))}
            </div>
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
              <button className="cta" onClick={() => openSetup(game.id)}>Играть</button>
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
              <input type="range" min="60" max="420" step="30" value={roundSeconds} onChange={(event) => setRoundSeconds(Number(event.target.value))} />
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
              <button className="cta" onClick={nextPlayer}>{dealIndex + 1 === dealData.length ? "Начать игру" : "Передать следующему"}</button>
            </>
          )}
          <small>{dealIndex + 1} / {dealData.length}</small>
        </section>
      )}

      {screen === "round" && (
        <section className="card center stack">
          <h2>Этап обсуждения</h2>
          <p className="timer">{formatSeconds(roundSeconds)}</p>
          <p>{selectedGame?.id === "spy" ? "Задавайте вопросы и ищите шпиона." : "Обсуждайте улики и ищите отличающегося игрока."}</p>
          <div className="row">
            <button className="secondary" onClick={() => setTimerActive((s) => !s)}>{timerActive ? "Пауза" : "Старт"}</button>
            <button className="secondary" onClick={() => { setTimerActive(false); setRoundSeconds(selectedGame?.defaultRoundSeconds || 180); }}>Сброс</button>
            <button className="cta" onClick={() => { setTimerActive(false); setScreen("vote"); }}>К голосованию</button>
          </div>
        </section>
      )}

      {screen === "vote" && (
        <section className="card stack">
          <h2>Голосование</h2>
          <p>Кого считаете подозрительным?</p>
          <div className="vote-list">
            {dealData.map((entry) => (
              <button key={entry.name} className={votedName === entry.name ? "active" : ""} onClick={() => setVotedName(entry.name)}>{entry.name}</button>
            ))}
          </div>
          <button className="cta" disabled={!votedName} onClick={() => setScreen("result")}>Подтвердить голос</button>
        </section>
      )}

      {screen === "result" && (
        <section className="card center stack">
          <h2>{resultTitle}</h2>
          <p>Вы выбрали: {votedName || "—"}</p>
          {dealContext.kind === "spy" && <div className="secret"><p>Шпион: {dealContext.spyName}</p><p>Локация: {dealContext.location}</p></div>}
          {dealContext.kind === "undercover" && <div className="secret"><p>Undercover: {dealContext.undercoverName}</p><p>Слова: {dealContext.commonWord} / {dealContext.undercoverWord}</p></div>}
          <div className="row">
            <button className="secondary" onClick={() => setScreen("setup")}>Сыграть ещё</button>
            <button className="cta" onClick={() => setScreen("home")}>Новая игра</button>
          </div>
        </section>
      )}

      {screen === "mafia" && (
        <section className="card stack">
          <h2>Мафия · Ночь {mafiaRound}</h2>
          <div className="meta">
            <span>В игре: {alivePlayers.length}</span>
            <span>Мафия: {aliveRoles.mafia}</span>
            <span>Мирные: {aliveRoles.citizens}</span>
          </div>
          {gameEndLabel && <div className="banner-success">{gameEndLabel}</div>}

          {mafiaPhase === "intro" && <p>Город засыпает. Подготовьте ведущего и передайте устройство только нужной роли.</p>}

          {mafiaPhase === "mafia" && (
            <label className="phase-pick">
              <span>Мафия выбирает цель</span>
              <select value={mafiaActions.mafiaTarget} onChange={(e) => setMafiaActions((prev) => ({ ...prev, mafiaTarget: e.target.value }))}>
                <option value="">Выбрать игрока</option>
                {alivePlayers.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          )}

          {mafiaPhase === "doctor" && (
            <label className="phase-pick">
              <span>Доктор лечит</span>
              <select value={mafiaActions.doctorSave} onChange={(e) => setMafiaActions((prev) => ({ ...prev, doctorSave: e.target.value }))}>
                <option value="">Выбрать игрока</option>
                {alivePlayers.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          )}

          {mafiaPhase === "escort" && (
            <label className="phase-pick">
              <span>Проститутка блокирует</span>
              <select value={mafiaActions.escortBlock} onChange={(e) => setMafiaActions((prev) => ({ ...prev, escortBlock: e.target.value }))}>
                <option value="">Выбрать игрока</option>
                {alivePlayers.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          )}

          {mafiaPhase === "commissioner" && (
            <label className="phase-pick">
              <span>Комиссар проверяет</span>
              <select value={mafiaActions.commissionerCheck} onChange={(e) => setMafiaActions((prev) => ({ ...prev, commissionerCheck: e.target.value }))}>
                <option value="">Выбрать игрока</option>
                {alivePlayers.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          )}

          {mafiaPhase === "morning" && (
            <div className="secret">
              <p>{mafiaNightSummary?.died ? `Выбыл: ${mafiaNightSummary.died}` : "Никто не выбыл этой ночью"}</p>
              <p>{mafiaNightSummary?.healed ? `Спасён: ${mafiaNightSummary.healed}` : "Доктор никого не спас"}</p>
              <p>{mafiaNightSummary?.blocked ? `Заблокирован: ${mafiaNightSummary.blocked}` : "Блокировки не было"}</p>
              <p>{mafiaNightSummary?.commissionerResult || "Проверки нет"}</p>
            </div>
          )}

          {mafiaPhase === "dayvote" && (
            <label className="phase-pick">
              <span>Дневное голосование</span>
              <select value={mafiaActions.dayExile} onChange={(e) => setMafiaActions((prev) => ({ ...prev, dayExile: e.target.value }))}>
                <option value="">Кого изгнать</option>
                {alivePlayers.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          )}

          <div className="row">
            <button className="secondary" onClick={prevMafiaPhase}>Назад</button>
            {!gameEndLabel && <button className="cta" onClick={nextMafiaPhase}>Дальше</button>}
            {gameEndLabel && <button className="cta" onClick={() => setScreen("home")}>Новая партия</button>}
          </div>

          <div className="history">
            <h3>История</h3>
            {mafiaHistory.length === 0 && <p>Пока нет событий.</p>}
            {mafiaHistory.map((item, idx) => (
              <p key={`${item.round}-${idx}`}>
                Ночь {item.round}: {item.died ? `выбыл ${item.died}` : "без выбывших"}
                {item.dayVote ? ` · Днём изгнан ${item.dayVote}` : ""}
              </p>
            ))}
          </div>
        </section>
      )}

      {screen === "packs" && <section className="card stack"><h2>Паки</h2><div className="grid packs">{["Classic Party", "New Friends", "Late Night"].map((pack) => <span key={pack}>{pack}</span>)}</div></section>}

      {screen === "profile" && (
        <section className="card stack">
          <h2>Профиль</h2>
          <p>Последняя компания: {players} игроков</p>
          <p>Игроки: {activeNames.join(", ")}</p>
          <p>Любимая игра: {selectedGame?.title || "Шпион"}</p>
          <button className="secondary" onClick={() => setScreen("setup")}>Вернуться к последнему сценарию</button>
        </section>
      )}

      <footer className="tabbar">
        {APP_TABS.map((tab) => (
          <button key={tab.id} className={screen === tab.id ? "tab active" : "tab"} onClick={() => setScreen(tab.id)}>{tab.label}</button>
        ))}
      </footer>
    </main>
  );
}
