import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiLogIn, FiShield, FiStar } from 'react-icons/fi';

import { AuthContext } from '../../context/AuthContext';
import heroImage from '../../assets/store/product_3.jpg';
import '../register/RegisterPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email and password.' });
      return;
    }

    const result = login(formData);
    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Logged in successfully. Redirecting to shop...' });
    window.setTimeout(() => navigate('/shop'), 900);
  };

  return (
    <main className='auth-page'>
      <section className='auth-page__section page-shell'>
        <div className='auth-page__panel auth-page__panel--form'>
          <div className='auth-page__form-header'>
            <span className='auth-page__badge'>
              <FiLogIn />
              Welcome back
            </span>
            <h2>Log In</h2>
            <p>Access your saved beauty picks, orders, and account details.</p>
          </div>

          <form className='auth-form' onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
            </label>
            <label>
              <span>Password</span>
              <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
            </label>

            {message.text ? (
              <p className={`auth-form__message auth-form__message--${message.type}`}>{message.text}</p>
            ) : null}

            <button type='submit' className='auth-form__submit'>
              Log in <FiArrowRight />
            </button>
          </form>

          <div className='auth-page__footer'>
            <span><FiShield /> Protected sign-in experience</span>
            <p>
              New here? <Link to='/register'>Create an account</Link>
            </p>
          </div>
        </div>

        <div className='auth-page__panel auth-page__panel--visual'>
          <span className='auth-page__eyebrow'>Member access</span>
          <h1>Step back into your beauty space with a simple, secure login.</h1>
          <p>
            Sign in to continue shopping, revisit your cart, and manage your skincare and makeup
            routine from one place.
          </p>

          <div className='auth-page__benefits'>
            <div className='auth-page__benefit'>
              <FiStar />
              <span>Quick access to saved picks and new arrivals</span>
            </div>
            <div className='auth-page__benefit'>
              <FiLock />
              <span>Safer account experience with protected login details</span>
            </div>
          </div>

          <div className='auth-page__image-shell'>
            <img src={heroImage} alt='Beauty login visual' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
