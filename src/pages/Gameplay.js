import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import moveSound from '../assets/sounds/move-sound.mp3';
import captureSound from '../assets/sounds/capture-sound.mp3';
import errorSound from '../assets/sounds/error-sound.mp3';

const Gameplay = () => {
  const [chess] = useState(new Chess()); // إنشاء كائن اللعبة
  const [fen, setFen] = useState(chess.fen()); // الحالة الحالية للوحة
  const [playerTurn, setPlayerTurn] = useState('white'); // دور اللاعب

  // دالة تحريك القطعة
  const handleMove = (move) => {
    const result = chess.move(move);

    if (result) {
      // إذا كانت الحركة صحيحة
      setFen(chess.fen());
      setPlayerTurn(chess.turn() === 'w' ? 'white' : 'black');
      playSound(move.captured ? captureSound : moveSound); // صوت الحركة أو الأكل
    } else {
      // إذا كانت الحركة غير صحيحة
      playSound(errorSound);
    }
  };

  // تشغيل الأصوات
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // عرض اسم اللاعب الحالي
  const renderPlayerTurn = () => (
    <div className="text-center text-white mt-4">
      <h3 className="text-2xl font-bold">
        {playerTurn === 'white' ? "White's Turn" : "Black's Turn"}
      </h3>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <h2 className="text-4xl text-white mb-6">Chess Game</h2>
      <Chessboard
        width={500}
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleMove({ from: sourceSquare, to: targetSquare })
        }
        boardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}
        lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
        darkSquareStyle={{ backgroundColor: '#b58863' }}
      />
      {renderPlayerTurn()}
    </div>
  );
};

export default Gameplay;
