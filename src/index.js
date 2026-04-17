import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import AuthContextProvider from './context/AuthContext';
import ShopContextProvider from './context/ShopContext';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </AuthContextProvider>
);
