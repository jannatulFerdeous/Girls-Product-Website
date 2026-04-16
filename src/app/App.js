import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import HomePage from '../pages/home/HomePage';
import { ProductPage } from '../pages/product/ProductPage';
import ShopPage from '../pages/shop/ShopPage';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
      </Routes>
      <Footer theme={theme} />
    </BrowserRouter>
  );
}

export default App;
