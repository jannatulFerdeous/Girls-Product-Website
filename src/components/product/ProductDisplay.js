import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import star from '../../assets/store/star_icon.png';
import star_dull from '../../assets/store/star_dull_icon.png';
import './ProductDisplay.css';

export const ProductDisplay = (props) => {

    const {product} = props; 
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productDisplay'>
        <div className='productDisplay-left'>
            <div className='productDisplay-img-list'>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
            </div>
            <div className='productDisplay-img'>
                <img className='productDisplay-main-img' src={product.image} alt=''/>
            </div>
        </div>
        <div className='productDisplay-right'>
            <h1>{product.name}</h1>
            <div className='productDisplay-right-star'> 
                <img src={star} alt=''/>
                <img src={star} alt=''/>
                <img src={star} alt=''/>
                <img src={star} alt=''/>
                <img src={star_dull} alt=''/>
                <p>(122)</p>
            </div>
            <div className='productDisplay-right-prices'>
                <div className='productDisplay-right-price-old'>Tk.{product.old_price}</div>
                <div className='productDisplay-right-price-new'>Tk.{product.new_price}</div>
            </div>
            <div className='productDisplay-right-description'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit animi veniam dicta soluta, 
                consequuntur debitis deserunt dolor nobis magnam quia molestiae quae expedita 
                quidem dolorem repellendus accusamus odio voluptate laudantium.

            </div>
            <button onClick={()=> {addToCart(product.id)}}>ADD TO CART</button>
        </div>
    </div> 
  )
}
