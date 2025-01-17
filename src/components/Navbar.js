import React from 'react';

const Navbar = ({ onColorSelect, onGameModeChange }) => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-700 text-white">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onGameModeChange('computer')}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Play vs Computer
        </button>
        <button
          onClick={() => onGameModeChange('friend')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Play with Friend
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onColorSelect('white')}
          className="px-4 py-2 bg-white text-black hover:bg-gray-300 rounded"
        >
          Play as White
        </button>
        <button
          onClick={() => onColorSelect('black')}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded"
        >
          Play as Black
        </button>
      </div>
    </div>
  );
};

export default Navbar;
