import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import featuredProducts from '../../data/products/featuredProducts';
import { ProductCard } from '../product/ProductCard';
import './PopularProducts.css';

export const PopularProducts = () => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='popular'>
            <h1>Top Ranking</h1>
            <hr />
            <div className='popular-items'>
                {featuredProducts.map((item, i) => (
                    <div key={i} className='items-container'>
                        <div className='rank'>{(i + 1).toString().padStart(2, '0')}</div>
                        <ProductCard
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                        <button onClick={() => { addToCart(item.id) }}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
