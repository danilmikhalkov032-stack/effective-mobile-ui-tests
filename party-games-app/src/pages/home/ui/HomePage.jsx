import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';

export function HomePage({ onStart }) {
  return (
    <div className="page">
      <Card>
        <h2>Во что поиграем?</h2>
        <p>Запусти игру за пару шагов — выбор игры, роли и старт раунда.</p>
        <Button onClick={onStart}>Начать</Button>
      </Card>
    </div>
  );
}
