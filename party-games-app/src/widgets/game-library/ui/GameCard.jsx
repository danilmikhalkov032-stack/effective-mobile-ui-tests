import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

export function GameCard({ game, onPlay }) {
  return (
    <Card>
      <div className="game-row">
        <div>
          <h3>{game.name}</h3>
          <p>{game.description}</p>
        </div>
        <span>{game.duration}</span>
      </div>
      <div className="tags">
        <span>{game.playersMin}–{game.playersMax} игроков</span>
        <span>{game.category}</span>
      </div>
      <Button onClick={onPlay}>Выбрать</Button>
    </Card>
  );
}
