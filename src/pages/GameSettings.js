import React, { useState } from 'react';

const GameSettings = ({ onStartGame }) => {
  const [pieceColor, setPieceColor] = useState('White');
  const [boardColor, setBoardColor] = useState('Classic');

  const handleStart = () => {
    if (onStartGame) {
      onStartGame({ pieceColor, boardColor });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h2 className="text-3xl mb-8">Customize Your Chess Game</h2>
      <div className="mb-6">
        <label className="block mb-2">Piece Color:</label>
        <select
          className="p-2 rounded bg-gray-800"
          value={pieceColor}
          onChange={(e) => setPieceColor(e.target.value)}
        >
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2">Board Color:</label>
        <select
          className="p-2 rounded bg-gray-800"
          value={boardColor}
          onChange={(e) => setBoardColor(e.target.value)}
        >
          <option value="Classic">Classic (Black/White)</option>
          <option value="Wood">Wooden</option>
          <option value="Blue/Red">Blue/Red</option>
          <option value="Green/Gold">Green/Gold</option>
        </select>
      </div>
      <button
        className="bg-blue-500 px-6 py-2 rounded"
        onClick={handleStart}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameSettings;
