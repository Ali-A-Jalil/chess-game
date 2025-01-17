import React from 'react';

const ThemeSelector = ({ boardTheme, pieceTheme, handleThemeChange }) => {
  return (
    <div className="mb-4 text-white">
      <h3>Customize Board</h3>
      <div className="flex gap-4 mb-4">
        <label>
          Light Square:
          <input
            type="color"
            value={boardTheme.light}
            onChange={(e) => handleThemeChange('board', e.target.value, 'light')}
          />
        </label>
        <label>
          Dark Square:
          <input
            type="color"
            value={boardTheme.dark}
            onChange={(e) => handleThemeChange('board', e.target.value, 'dark')}
          />
        </label>
      </div>
      <h3>Customize Pieces</h3>
      <div className="flex gap-4">
        <label>
          White Pieces:
          <input
            type="color"
            value={pieceTheme.white}
            onChange={(e) => handleThemeChange('piece', e.target.value, 'white')}
          />
        </label>
        <label>
          Black Pieces:
          <input
            type="color"
            value={pieceTheme.black}
            onChange={(e) => handleThemeChange('piece', e.target.value, 'black')}
          />
        </label>
      </div>
    </div>
  );
};

export default ThemeSelector;
