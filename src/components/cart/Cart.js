import React from 'react';
import { CartItems } from './CartItems';

export const Cart = ({ onClose }) => {
  return (
    <div className='cart-container'>
      <button className='close-btn' onClick={onClose}>X</button>
      <CartItems />
    </div>
  );
};
