import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './OffersCarousel.css';

import img1 from '../../assets/store/slide-1.jpg';
import img2 from '../../assets/store/slide-2.jpg';

export const OffersCarousel = () => {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel className='offer' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img  className="d-block w-100" src={img1} alt="First slide" />  
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" src={img2} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
}
