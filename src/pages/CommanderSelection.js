import React, { useState } from 'react';

// قائمة القادة مع البيانات
const commanders = [
  {
    name: 'Saladin',
    civilization: 'Islamic',
    image: '../assets/images/saladin.png',
    background: '../assets/images/islamic-bg.jpg',
  },
  {
    name: 'Richard the Lionheart',
    civilization: 'Crusader',
    image: '../assets/images/richard.png',
    background: '../assets/images/crusader-bg.jpg',
  },
  {
    name: 'Genghis Khan',
    civilization: 'Mongolian',
    image: '../assets/images/genghis.png',
    background: '../assets/images/mongolian-bg.jpg',
  },
  {
    name: 'Samurai Warrior',
    civilization: 'Samurai',
    image: '../assets/images/samurai.png',
    background: '../assets/images/samurai-bg.jpg',
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
                className="w-32 h-32 object-cover mx-auto"
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
