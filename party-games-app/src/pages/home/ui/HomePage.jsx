import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';

const QUICK_TAGS = ['3–12 игроков', 'Без ведущего', '10–20 минут'];

export function HomePage({ onStart }) {
  return (
    <div className="page stack home-page">
      <header className="home-topbar">
        <div>
          <div className="home-kicker">Party Games</div>
          <h1>Во что поиграем?</h1>
        </div>
        <div className="home-avatar">🎉</div>
      </header>

      <Card className="home-hero">
        <div className="home-hero-badge">Быстрый старт</div>
        <h2>Запусти игру за 30 секунд</h2>
        <p>Выбери игру, укажи количество игроков и сразу начинайте раунд. Подходит для компании дома, в дороге и на вечеринке.</p>

        <div className="home-tags">
          {QUICK_TAGS.map((tag) => (
            <span key={tag} className="home-tag">{tag}</span>
          ))}
        </div>

        <Button onClick={onStart}>Начать игру</Button>
      </Card>

      <section className="home-grid">
        <Card>
          <div className="home-stat-label">Популярно</div>
          <div className="home-stat-value">Шпион</div>
          <div className="home-stat-sub">Быстрый раунд на компанию</div>
        </Card>

        <Card>
          <div className="home-stat-label">Режим</div>
          <div className="home-stat-value">Pass &amp; Play</div>
          <div className="home-stat-sub">Один телефон на всех</div>
        </Card>
      </section>

      <Card className="home-footer-note">
        <strong>Совет:</strong> держи телефон на столе и передавай игрокам только на этапе выдачи роли.
      </Card>
    </div>
  );
}
