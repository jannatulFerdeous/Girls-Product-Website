import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './CartItems.css';

export const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartItems'>
      <div className='cartItems-format-main'>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id} className='cartItems-format cartItems-format-main'>
              <img src={e.image} alt={e.name} className='carticon-product-icon' />
              <p>Tk.{e.new_price}</p>
              <button className='cartItems-quantity'>{cartItems[e.id]}</button>
              <button
                className='cartItems-remove-icon'
                onClick={() => removeFromCart(e.id)}
                alt='Remove'
              >
                Delete
              </button>
              <hr />
            </div>
          );
        }
        return null;
      })}
      
    </div>
  );
};
