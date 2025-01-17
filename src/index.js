import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// إنشاء الـ root الخاص بالتطبيق
const root = ReactDOM.createRoot(document.getElementById('root'));

// استخدام createRoot بدلاً من render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
