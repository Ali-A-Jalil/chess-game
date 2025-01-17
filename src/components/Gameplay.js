  

import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '../components/ChessBoard';
import Navbar from '../components/Navbar';

const Gameplay = () => {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState('white');
  const [gameMode, setGameMode] = useState('computer');

  const stockfish = new Worker(new URL('../workers/Stockfish_Worker.js', import.meta.url));


  useEffect(() => {
    if (gameMode === 'computer' && game.turn() !== playerColor[0]) {
      stockfish.onmessage = (e) => {
        const message = e.data;
        if (message.startsWith('bestmove')) {
          const move = message.split(' ')[1];
          if (move) {
            game.move({ from: move.slice(0, 2), to: move.slice(2, 4), promotion: 'q' });
            setGame(new Chess(game.fen()));
          }
        }
      };
      stockfish.postMessage(`position fen ${game.fen()}`);
      stockfish.postMessage('go');
    }
  }, [game, gameMode, playerColor]);

  const handleMove = (move) => {
    const validMove = game.move(move);
    if (validMove) {
      setGame(new Chess(game.fen()));
      if (gameMode === 'computer') {
        stockfish.postMessage(`position fen ${game.fen()}`);
        stockfish.postMessage('go');
      }
    }
  };

  return (
    <div>
      <Navbar onColorSelect={setPlayerColor} onGameModeChange={setGameMode} />
      <ChessBoard
        position={game.fen()}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })
        }
        boardTheme={{ light: '#f0d9b5', dark: '#b58863' }}
      />
    </div>
  );
};

export default Gameplay;
