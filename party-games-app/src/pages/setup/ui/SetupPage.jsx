import { getRecommendations } from '../../../entities/game/model/games';
import { GameCard } from '../../../widgets/game-library/ui/GameCard';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

export function SetupPage({ session, onStartSession }) {
  const recommended = getRecommendations(session.playersCount);

  return (
    <div className="page stack">
      <Card>
        <h2>Настройка</h2>
        <p>Игроков: {session.playersCount}</p>
        <div className="stepper">
          <Button variant="secondary" onClick={() => session.setPlayersCount(Math.max(3, session.playersCount - 1))}>−</Button>
          <strong>{session.playersCount}</strong>
          <Button variant="secondary" onClick={() => session.setPlayersCount(Math.min(12, session.playersCount + 1))}>+</Button>
        </div>
      </Card>

      {recommended.map((game) => (
        <GameCard key={game.id} game={game} onPlay={() => session.setSelectedGameId(game.id)} />
      ))}

      <Button onClick={onStartSession}>Раздать роли</Button>
    </div>
  );
}
