import React from 'react';
import { CartItems } from './CartItems';

export const Cart = ({ onClose, showClose = true }) => {
  return (
    <div className='cart-container'>
      <div className='cart-shell'>
        {showClose ? (
          <button className='close-btn' onClick={onClose} aria-label='Close cart'>
            x
          </button>
        ) : null}
        <CartItems />
      </div>
    </div>
  );
};
