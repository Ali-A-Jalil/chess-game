import React, { useState } from 'react';
import KingSaladin from '../assets/images/saladin.png';
import KingRichard from '../assets/images/richard.png';
import KingGenghis from '../assets/images/genghis.png';
import KingSamurai from '../assets/images/samurai.png';
import IslamicBackground from '../assets/images/islamic-bg.jpg';
import CrusaderBackground from '../assets/images/crusader-bg.jpg';
import MongolianBackground from '../assets/images/mongolian-bg.jpg';
import SamuraiBackground from '../assets/images/samurai-bg.jpg';








// قائمة القادة مع البيانات
const commanders = [
  {
    name: 'Soltan Saladin',
    civilization: 'Islamic',
    image: KingSaladin,
    background: IslamicBackground,
  },
  {
    name: 'Richard the Lionheart',
    civilization: 'Crusader',
    image: KingRichard,
    background: CrusaderBackground,
  },
  {
    name: 'Genghis Khan',
    civilization: 'Mongolian',
    image: KingGenghis,
    background: MongolianBackground,
  },
  {
    name: 'Samurai Warrior',
    civilization: 'Samurai',
    image: KingSamurai,
    background: SamuraiBackground,
  },
];

const CommanderSelection = ({ onSelectCommander }) => {
  const [selectedCommander, setSelectedCommander] = useState(null);

  // تغيير القائد المختار
  const handleCommanderClick = (commander) => {
    setSelectedCommander(commander);
    if (onSelectCommander) {
      onSelectCommander(commander); // تمرير القائد المختار للمرحلة التالية
    }
  };

  // إعدادات الخلفية
  const backgroundStyle = {
    backgroundImage: `url(${selectedCommander?.background || '../assets/images/default-bg.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="relative w-screen h-screen" style={backgroundStyle}>
      {/* Overlay معتم فوق الخلفية */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        {/* العنوان */}
        <h2 className="text-4xl text-white font-bold mb-8">Select Your Commander</h2>

        {/* قائمة القادة */}
        <div className="grid grid-cols-2 gap-6">
          {commanders.map((commander) => (
            <div
              key={commander.name}
              className={`cursor-pointer p-4 rounded-lg shadow-lg bg-white ${
                selectedCommander?.name === commander.name
                  ? 'border-4 border-yellow-500' // تمييز القائد المختار
                  : ''
              }`}
              onClick={() => handleCommanderClick(commander)}
            >
              {/* صورة القائد */}
              <img
                src={commander.image}
                alt={commander.name}
                className="w-28 h-26 object-cover mx-auto"
              />
              {/* اسم القائد */}
              <h3 className="text-xl text-center mt-4">{commander.name}</h3>
              {/* الحضارة */}
              <p className="text-center text-sm text-gray-600">{commander.civilization}</p>
            </div>
          ))}
        </div>

        {/* زر "Next" */}
        {selectedCommander && (
          <button
            className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg"
            onClick={() => alert(`Selected Commander: ${selectedCommander.name}`)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CommanderSelection;
