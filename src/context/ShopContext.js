import React, { createContext, useState, useEffect } from 'react';
import all_product from '../data/products/allProducts';

export const ShopContext = createContext(null); 

const getDefaultCart = () => {
    let cart = {};  
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart; 
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        // Get cart from local storage or use default cart
        const savedCart = JSON.parse(localStorage.getItem('cartItems'));
        return savedCart ? savedCart : getDefaultCart();
    });

    useEffect(() => {
        // Save cart to local storage whenever it changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };

    const contextValue = { all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    ); 
}

export default ShopContextProvider;
