import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'; // استيراد المزود الحديث
import { HTML5Backend } from 'react-dnd-html5-backend'; // استيراد HTML5 backend
import Login from './pages/Login';
import CommanderSelection from './pages/CommanderSelection';
import GameSettings from './pages/GameSettings';
import Gameplay from './pages/Gameplay';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Login');

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login onLogin={() => setCurrentPage('CommanderSelection')} />;
      case 'CommanderSelection':
        return (
          <CommanderSelection onSelectCommander={() => setCurrentPage('GameSettings')} />
        );
      case 'GameSettings':
        return <GameSettings onStartGame={() => setCurrentPage('Gameplay')} />;
      case 'Gameplay':
        return <Gameplay />;
      default:
        return <Login />;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>{renderPage()}</div>
    </DndProvider>
  );
};

export default App;
