import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiShield, FiUserPlus } from 'react-icons/fi';

import { siteImages } from '../../assets/newImageAssets';
import { AuthContext } from '../../context/AuthContext';
import './RegisterPage.css';

const benefits = [
  'Save your favorite skincare and makeup picks',
  'Track your beauty orders faster',
  'Get exclusive drops and soft-glow offers',
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Account created successfully. Redirecting to shop...' });
    window.setTimeout(() => navigate('/shop'), 900);
  };

  return (
    <main className='auth-page'>
      <section className='auth-page__section page-shell'>
        <div className='auth-page__panel auth-page__panel--visual'>
          <span className='auth-page__eyebrow'>Create account</span>
          <h1>Join the beauty world and keep every routine in one place.</h1>
          <p>
            Register for a smoother shopping journey, faster checkout, and early access to fresh
            skincare and makeup collections.
          </p>

          <div className='auth-page__benefits'>
            {benefits.map((item) => (
              <div key={item} className='auth-page__benefit'>
                <FiCheck />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className='auth-page__image-shell'>
            <img src={siteImages.beautyEditorial} alt='Beauty register visual' />
          </div>
        </div>

        <div className='auth-page__panel auth-page__panel--form'>
          <div className='auth-page__form-header'>
            <span className='auth-page__badge'>
              <FiUserPlus />
              New member
            </span>
            <h2>Register</h2>
            <p>Start your account in a few simple steps.</p>
          </div>

          <form className='auth-form' onSubmit={handleSubmit}>
            <label>
              <span>Full name</span>
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Enter your full name' />
            </label>
            <label>
              <span>Email</span>
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
            </label>
            <label>
              <span>Password</span>
              <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Create a password' />
            </label>
            <label>
              <span>Confirm password</span>
              <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm your password' />
            </label>

            {message.text ? (
              <p className={`auth-form__message auth-form__message--${message.type}`}>{message.text}</p>
            ) : null}

            <button type='submit' className='auth-form__submit'>
              Create account <FiArrowRight />
            </button>
          </form>

          <div className='auth-page__footer'>
            <span><FiShield /> Secure beauty account setup</span>
            <p>
              Already have an account? <Link to='/login'>Log in here</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
