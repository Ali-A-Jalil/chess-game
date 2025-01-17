import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/Login';
import CommanderSelection from './pages/CommanderSelection';
import GameSettings from './pages/GameSettings';
import Gameplay from './pages/Gameplay';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Login');
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('Login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login onLogin={(userData) => { setUser(userData); setCurrentPage('CommanderSelection'); }} />;
      case 'CommanderSelection':
        return (
          <CommanderSelection onSelectCommander={() => setCurrentPage('GameSettings')} />
        );
      case 'GameSettings':
        return <GameSettings onStartGame={() => setCurrentPage('Gameplay')} />;
      case 'Gameplay':
        return <Gameplay />;
      case 'Profile':
        return <Profile />;
      default:
        return <Login />;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {user && <Navbar onLogout={handleLogout} onNavigate={setCurrentPage} />}
        {renderPage()}
      </div>
    </DndProvider>
  );
};

export default App;
