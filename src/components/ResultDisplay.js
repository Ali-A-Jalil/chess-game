import React from 'react';

const ResultDisplay = ({ isGameOver, message }) => {
  return (
    isGameOver && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">{message}</h2>
        </div>
      </div>
    )
  );
};

export default ResultDisplay;
