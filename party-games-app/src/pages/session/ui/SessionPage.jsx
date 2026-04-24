import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';

export function SessionPage({ session, onReset }) {
  const role = session.roles[session.currentPlayerIndex];
  const isLast = session.currentPlayerIndex >= session.roles.length - 1;

  if (!role) {
    return (
      <div className="page">
        <Card>
          <h2>Нет ролей</h2>
          <p>Сначала раздайте роли.</p>
          <Button onClick={onReset}>Назад</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="page stack">
      <Card>
        <h2>Игрок {session.currentPlayerIndex + 1}</h2>
        <img src={role.image} alt={role.title} className="role-image" />
        <h3>{role.title}</h3>
        <p>{role.helper}</p>
      </Card>

      {isLast ? (
        <Button onClick={onReset}>Новая игра</Button>
      ) : (
        <Button onClick={() => session.setCurrentPlayerIndex((v) => v + 1)}>Следующий игрок</Button>
      )}
    </div>
  );
}
