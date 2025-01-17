import React, { useState } from 'react';
import Select from 'react-select';
import backgroundVideo from '../assets/videos/background.mp4';

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('+20');

  const countryOptions = [
    { value: '+20', label: '🇪🇬 Egypt (+20)' },
    { value: '+1', label: '🇺🇸 USA (+1)' },
    { value: '+44', label: '🇬🇧 UK (+44)' },
  ];

  // التحقق من صحة رقم الهاتف
  const validatePhone = (value, countryCode) => {
    const phoneLength = countryCode === '+20' ? 10 : 10; // الأطوال حسب الدولة
    if (value.length !== phoneLength) {
      setError('Invalid phone number');
      return false;
    }
    setError('');
    return true;
  };

  // دالة معالجة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !validatePhone(phone, selectedCountry)) {
      setError('Please enter a valid phone number.');
      return;
    }
    onLogin();
  };

  return (
    <div className="relative w-screen h-screen flex">
      {/* خلفية الفيديو */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay مع تقسيم الشاشة */}
      <div className="absolute inset-0 flex">
        {/* العمود الأيسر: الفورم */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-12">
          <form
            onSubmit={handleLogin}
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md"
          >
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Please log in to your account
            </p>

            {/* اسم المستخدم */}
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* اختيار الدولة */}
            <Select
              options={countryOptions}
              placeholder="Select Country"
              className="mb-4"
              onChange={(option) => setSelectedCountry(option.value)}
              defaultValue={countryOptions[0]}
            />

            {/* رقم الهاتف */}
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => validatePhone(phone, selectedCountry)}
              required
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* البريد الإلكتروني */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* كلمة المرور */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* العمود الأيمن: شفافية مع الفيديو */}
        <div className="w-1/2 h-full bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default Login;
