import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx'; // مكتبة تصميم اللوحة
import Chess from 'chess.js'; // مكتبة إدارة اللعبة
import Stockfish from 'stockfish'; // مكتبة الذكاء الاصطناعي
import ThemeSelector from '../components/ThemeSelector'; // استيراد ThemeSelector

const Gameplay = () => {
  const [game, setGame] = useState(new Chess()); // إنشاء حالة اللعبة
  const stockfish = Stockfish(); // محرك الذكاء الاصطناعي
  const [boardTheme, setBoardTheme] = useState({
    light: '#f0d9b5',
    dark: '#b58863',
  });
  const [pieceTheme, setPieceTheme] = useState({
    white: '#ffffff',
    black: '#000000',
  });

  useEffect(() => {
    stockfish.onmessage = (message) => {
      if (message.startsWith('bestmove')) {
        const move = message.split(' ')[1];
        if (move) {
          game.move({ from: move.slice(0, 2), to: move.slice(2, 4) });
          setGame(new Chess(game.fen()));
        }
      }
    };
  }, [game]);

  const handleMove = (move) => {
    if (game.move(move)) {
      setGame(new Chess(game.fen()));
      stockfish.postMessage(`position fen ${game.fen()}`);
      stockfish.postMessage('go');
    }
  };

  const handleThemeChange = (themeType, color, player) => {
    if (themeType === 'board') {
      setBoardTheme({ ...boardTheme, [player]: color });
    } else {
      setPieceTheme({ ...pieceTheme, [player]: color });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800">
      <ThemeSelector
        boardTheme={boardTheme}
        pieceTheme={pieceTheme}
        handleThemeChange={handleThemeChange}
      />
      <Chessboard
        width={480}
        position={game.fen()}
        boardStyle={{
          backgroundImage: `linear-gradient(${boardTheme.light}, ${boardTheme.dark})`,
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q',
          })
        }
      />
    </div>
  );
};

export default Gameplay;
