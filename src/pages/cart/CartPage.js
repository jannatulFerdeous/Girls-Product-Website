import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

import { Cart } from '../../components/cart/Cart';
import './CartPage.css';

const CartPage = () => {
  return (
    <main className='cart-page'>
      <section className='cart-page__topbar'>
        <div className='page-shell cart-page__topbar-inner'>
          <div className='cart-page__title-block'>
            <span className='cart-page__eyebrow'>Shopping cart</span>
            <h1>Your Cart</h1>
            <p>Review your products, update quantities, and continue to checkout.</p>
          </div>

          <div className='cart-page__actions'>
            <Link to='/shop' className='cart-page__button cart-page__button--primary'>
              <FiShoppingBag />
              Continue Shopping
            </Link>
            <Link to='/' className='cart-page__button cart-page__button--ghost'>
              <FiArrowLeft />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className='cart-page__body page-shell'>
        <Cart showClose={false} />
      </section>
    </main>
  );
};

export default CartPage;
