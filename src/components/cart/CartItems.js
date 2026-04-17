import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './CartItems.css';

export const CartItems = () => {
  const { all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext);

  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);
  const subtotal = cartProducts.reduce(
    (total, product) => total + product.new_price * cartItems[product.id],
    0,
  );
  const totalItems = cartProducts.reduce((total, product) => total + cartItems[product.id], 0);
  const shipping = cartProducts.length ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <section className='cartItems'>
      <div className='cartItems__header'>
        <span className='cartItems__eyebrow'>Your bag</span>
        <h2>Cart summary</h2>
        <p>{cartProducts.length ? `${totalItems} items ready to check out.` : 'Your beauty picks will appear here.'}</p>
      </div>

      {cartProducts.length ? (
        <>
          <div className='cartItems__layout'>
            <div className='cartItems__list'>
              {cartProducts.map((product) => (
                <article key={product.id} className='cartItems__card'>
                  <div className='cartItems__media'>
                    <img src={product.image} alt={product.name} className='carticon-product-icon' />
                  </div>

                  <div className='cartItems__details'>
                    <div className='cartItems__copy'>
                      <span className='cartItems__label'>Soft glow pick</span>
                      <h3>{product.name}</h3>
                      <p>Tk. {product.new_price} each</p>
                    </div>

                    <div className='cartItems__controls'>
                      <div className='cartItems__quantity'>
                        <button type='button' onClick={() => removeFromCart(product.id)} aria-label={`Decrease quantity for ${product.name}`}>
                          -
                        </button>
                        <span>{cartItems[product.id]}</span>
                        <button type='button' onClick={() => addToCart(product.id)} aria-label={`Increase quantity for ${product.name}`}>
                          +
                        </button>
                      </div>

                      <div className='cartItems__actions'>
                        <strong>Tk. {(product.new_price * cartItems[product.id]).toFixed(2)}</strong>
                        <button
                          type='button'
                          className='cartItems-remove-icon'
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className='cartItems__summary'>
              <div className='cartItems__summary-row'>
                <span>Subtotal</span>
                <strong>Tk. {subtotal.toFixed(2)}</strong>
              </div>
              <div className='cartItems__summary-row'>
                <span>Shipping</span>
                <strong>Tk. {shipping.toFixed(2)}</strong>
              </div>
              <div className='cartItems__summary-row cartItems__summary-row--total'>
                <span>Total</span>
                <strong>Tk. {total.toFixed(2)}</strong>
              </div>

              <button type='button' className='cartItems__checkout'>
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='cartItems__empty'>
          <div className='cartItems__empty-orb'></div>
          <h3>Your cart is still empty</h3>
          <p>Add skincare or makeup picks from the shop to see them here.</p>
        </div>
      )}
    </section>
  );
};
