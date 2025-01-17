import React from 'react';
import Chessboard from 'chessboardjsx';
import crownIcon from '../assets/images/crown.png';

const ChessBoard = ({ position, onDrop, boardTheme, playerTurn }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* عرض دور اللاعب الحالي */}
      <div className="absolute top-0 left-0 m-4 flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg shadow-lg">
        <img src={crownIcon} alt="Player Turn" className="w-6 h-6" />
        <span className="font-semibold text-lg">{playerTurn === 'white' ? 'White's Turn' : 'Black's Turn'}</span>
      </div>
      
      {/* لوحة الشطرنج */}
      <Chessboard
        width={600}
        position={position}
        onDrop={onDrop}
        boardStyle={{
          backgroundImage: `linear-gradient(${boardTheme.light}, ${boardTheme.dark})`,
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          border: '4px solid #444'
        }}
        lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
        darkSquareStyle={{ backgroundColor: '#b58863' }}
        transitionDuration={300}
        draggable={true}
      />

      {/* تعليمات اللعبة */}
      <div className="mt-4 text-center text-white bg-gray-800 px-6 py-3 rounded-lg shadow-md">
        <p className="text-lg font-medium">Drag and drop pieces to move</p>
      </div>
    </div>
  );
};

export default ChessBoard;
