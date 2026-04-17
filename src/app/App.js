import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '../components/layout/Footer';
import RobotGuide from '../components/guide/RobotGuide';
import { Navbar } from '../components/layout/Navbar';
import AboutPage from '../pages/about/AboutPage';
import CartPage from '../pages/cart/CartPage';
import ContactPage from '../pages/contact/ContactPage';
import FeaturePage from '../pages/feature/FeaturePage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import { ProductPage } from '../pages/product/ProductPage';
import RegisterPage from '../pages/register/RegisterPage';
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
      <RobotGuide />
      <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/feature' element={<FeaturePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
      </Routes>
      <Footer theme={theme} />
    </BrowserRouter>
  );
}

export default App;
