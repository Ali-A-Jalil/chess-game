import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import moveSound from '../assets/sounds/move-sound.mp3';
import captureSound from '../assets/sounds/capture-sound.mp3';
import errorSound from '../assets/sounds/error-sound.mp3';

const Gameplay = () => {
  const [chess, setChess] = useState(new Chess()); // إنشاء كائن اللعبة
  const [fen, setFen] = useState(chess.fen()); // الحالة الحالية للوحة
  const [playerTurn, setPlayerTurn] = useState('white'); // دور اللاعب
  const [gameMode, setGameMode] = useState('friend'); // وضع اللعب: 'friend' أو 'computer'
  const [playerColor, setPlayerColor] = useState('white'); // لون اللاعب
  const [soundEnabled, setSoundEnabled] = useState(true); // تحكم في الأصوات

  const stockfish = new Worker(new URL('../workers/Stockfish_Worker.js', import.meta.url)); // محرك الذكاء الاصطناعي

  // تحريك القطعة
  const handleMove = (move) => {
    const result = chess.move(move);

    if (result) {
      setFen(chess.fen());
      setPlayerTurn(chess.turn() === 'w' ? 'white' : 'black');
      playSound(result.captured ? captureSound : moveSound);

      if (gameMode === 'computer' && chess.turn() !== playerColor[0]) {
        computerMove();
      }
    } else {
      playSound(errorSound);
    }
  };

  // حركة الكمبيوتر
  const computerMove = () => {
    stockfish.onmessage = (e) => {
      const message = e.data;
      if (message.startsWith('bestmove')) {
        const move = message.split(' ')[1];
        if (move) {
          chess.move({ from: move.slice(0, 2), to: move.slice(2, 4), promotion: 'q' });
          setFen(chess.fen());
          setPlayerTurn(chess.turn() === 'w' ? 'white' : 'black');
        }
      }
    };
    stockfish.postMessage(`position fen ${chess.fen()}`);
    stockfish.postMessage('go');
  };

  // تشغيل الأصوات
  const playSound = (sound) => {
    if (soundEnabled) {
      const audio = new Audio(sound);
      audio.play();
    }
  };

  // إعادة تشغيل اللعبة
  const resetGame = () => {
    setChess(new Chess());
    setFen(chess.fen());
    setPlayerTurn('white');
  };

  // اختيار لون القطع
  const selectPlayerColor = (color) => {
    setPlayerColor(color);
    resetGame();
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <h2 className="text-4xl text-white mb-6">Chess Game</h2>

      {/* خيارات وضع اللعب */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setGameMode('friend')}
          className={`px-4 py-2 rounded ${gameMode === 'friend' ? 'bg-blue-600' : 'bg-gray-600'}`}
        >
          Play with Friend
        </button>
        <button
          onClick={() => setGameMode('computer')}
          className={`px-4 py-2 rounded ${gameMode === 'computer' ? 'bg-green-600' : 'bg-gray-600'}`}
        >
          Play vs Computer
        </button>
      </div>

      {/* اختيار لون القطع */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => selectPlayerColor('white')}
          className={`px-4 py-2 rounded ${playerColor === 'white' ? 'bg-white text-black' : 'bg-gray-600 text-white'}`}
        >
          Play as White
        </button>
        <button
          onClick={() => selectPlayerColor('black')}
          className={`px-4 py-2 rounded ${playerColor === 'black' ? 'bg-black text-white' : 'bg-gray-600 text-white'}`}
        >
          Play as Black
        </button>
      </div>

      {/* لوحة الشطرنج */}
      <Chessboard
        width={500}
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })
        }
        boardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}
        lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
        darkSquareStyle={{ backgroundColor: '#b58863' }}
      />

      {/* عرض دور اللاعب */}
      <div className="text-center text-white mt-4">
        <h3 className="text-2xl font-bold">
          {playerTurn === 'white' ? "White's Turn" : "Black's Turn"}
        </h3>
      </div>

      {/* التحكم في الأصوات */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded"
      >
        {soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
      </button>

      {/* زر إعادة التشغيل */}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Gameplay;
