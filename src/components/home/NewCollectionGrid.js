import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import newCollections from '../../data/products/newCollections';
import { ProductCard } from '../product/ProductCard';
import './NewCollectionGrid.css';

export const NewCollectionGrid = () => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className='new-collections'>
        <h1>All Products</h1>
        <hr/>
        <div className='new-collections-items'>
            {newCollections.map((item, i) => (
                <div key={i} className='item-container'>
                    <ProductCard
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                    <button onClick={() => addToCart(item.id)}>ADD TO CART</button>
                </div>
            ))}
        </div>
    </div>
  )
};
