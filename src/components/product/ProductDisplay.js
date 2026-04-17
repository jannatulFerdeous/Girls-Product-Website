import React, { useContext, useMemo, useState } from 'react'
import { FiCheck, FiHeart, FiShield, FiShoppingBag, FiStar, FiTruck } from 'react-icons/fi';
import { ShopContext } from '../../context/ShopContext';
import './ProductDisplay.css';

export const ProductDisplay = (props) => {
    const {product} = props; 
    const {addToCart} = useContext(ShopContext);
    const [selectedImage, setSelectedImage] = useState(product.image);

    const productMood = useMemo(() => {
        const details = {
            1: {
                badge: 'Best Seller',
                description: 'A soft gel cleanser that lifts away buildup while keeping your skin balanced, fresh, and comfortably hydrated after every wash.',
                notes: ['Niacinamide care', 'Daily barrier support', 'Fresh gel texture'],
            },
            2: {
                badge: 'Brightening Pick',
                description: 'A glow-focused serum designed to visibly refresh dull skin with a lightweight finish that layers beautifully under moisturizer.',
                notes: ['Vitamin-rich formula', 'Morning glow boost', 'Fast absorbing finish'],
            },
            3: {
                badge: 'Hydration Edit',
                description: 'A refreshing mist that gives skin a dewy reset through the day while adding a smoother, softer-looking finish.',
                notes: ['Rosewater infusion', 'Midday refresh', 'Soft dewy feel'],
            },
            4: {
                badge: 'Night Repair',
                description: 'A rich overnight cream that helps replenish dry, tired skin with a comfort-first texture and a polished glow by morning.',
                notes: ['Overnight comfort', 'Velvet cream finish', 'Deep moisture feel'],
            },
        };

        return details[product.id] || {
            badge: 'Signature Care',
            description: 'A premium skincare essential curated for a smoother routine, refined texture, and an elevated everyday self-care experience.',
            notes: ['Skincare-first formula', 'Premium finish', 'Daily ritual essential'],
        };
    }, [product.id]);

    const galleryImages = [product.image, product.image, product.image];
    const ratingValue = 4.8;

  return (
    <div className='productDisplay'>
        <div className='productDisplay-left'>
            <div className='productDisplay-img-list'>
                {galleryImages.map((image, index) => (
                    <button
                        key={`${product.id}-${index}`}
                        type='button'
                        className={`productDisplay-thumb ${selectedImage === image ? 'is-active' : ''}`}
                        onClick={() => setSelectedImage(image)}
                        aria-label={`Preview image ${index + 1} for ${product.name}`}
                    >
                        <img src={image} alt={product.name}/>
                    </button>
                ))}
            </div>
            <div className='productDisplay-img'>
                <span className='productDisplay-badge'>{productMood.badge}</span>
                <img className='productDisplay-main-img' src={selectedImage} alt={product.name}/>
                <div className='productDisplay-glow'></div>
            </div>
        </div>
        <div className='productDisplay-right'>
            <span className='productDisplay-right__eyebrow'>Skincare essential</span>
            <h1>{product.name}</h1>
            <div className='productDisplay-right-star'> 
                <div className='productDisplay-right-star__icons'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FiStar key={index} className={index < 4 ? 'is-filled' : ''} />
                    ))}
                </div>
                <p>{ratingValue} rating</p>
                <span>122 reviews</span>
            </div>
            <div className='productDisplay-right-prices'>
                <div className='productDisplay-right-price-old'>Tk.{product.old_price}</div>
                <div className='productDisplay-right-price-new'>Tk.{product.new_price}</div>
                <div className='productDisplay-right-price-save'>Save Tk.{(product.old_price - product.new_price).toFixed(1)}</div>
            </div>
            <div className='productDisplay-right-description'>
                {productMood.description}
            </div>

            <div className='productDisplay-points'>
                {productMood.notes.map((note) => (
                    <div key={note} className='productDisplay-point'>
                        <FiCheck />
                        <span>{note}</span>
                    </div>
                ))}
            </div>

            <div className='productDisplay-meta'>
                <div className='productDisplay-meta__item'>
                    <FiTruck />
                    <div>
                        <strong>Fast Delivery</strong>
                        <span>Ships within 24 hours in Bangladesh</span>
                    </div>
                </div>
                <div className='productDisplay-meta__item'>
                    <FiShield />
                    <div>
                        <strong>Skin-Friendly Pick</strong>
                        <span>Curated formulas with a comfort-first finish</span>
                    </div>
                </div>
            </div>

            <div className='productDisplay-actions'>
                <button className='productDisplay-cart-btn' onClick={()=> {addToCart(product.id)}}>
                    <FiShoppingBag />
                    Add To Cart
                </button>
                <button type='button' className='productDisplay-wishlist-btn'>
                    <FiHeart />
                </button>
            </div>

            <div className='productDisplay-footer'>
                <span><strong>Category:</strong> {product.category}</span>
                <span><strong>Finish:</strong> Radiant skincare glow</span>
            </div>
        </div>
    </div> 
  )
}
