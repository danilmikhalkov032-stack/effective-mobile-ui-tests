import { useState } from 'react';
import { useGameSession } from '../features/session/model/useGameSession';
import { HomePage } from '../pages/home/ui/HomePage';
import { SetupPage } from '../pages/setup/ui/SetupPage';
import { SessionPage } from '../pages/session/ui/SessionPage';

export function App() {
  const session = useGameSession();
  const [flow, setFlow] = useState('home');

  const startSession = () => {
    session.buildSession();
    setFlow('session');
  };

  const reset = () => {
    setFlow('home');
    session.setCurrentPlayerIndex(0);
  };

  return (
    <main className="app-shell">
      {flow === 'home' && <HomePage onStart={() => setFlow('setup')} />}
      {flow === 'setup' && <SetupPage session={session} onStartSession={startSession} />}
      {flow === 'session' && <SessionPage session={session} onReset={reset} />}
    </main>
  );
}
