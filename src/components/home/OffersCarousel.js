import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './OffersCarousel.css';

import { siteImages } from '../../assets/newImageAssets';

export const OffersCarousel = () => {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel className='offer' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img  className="d-block w-100" src={siteImages.posterVisual} alt="Featured offer collection" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={siteImages.posterVisualTwo} alt="Wellness beauty offer" />
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" src={siteImages.faceCreamModel} alt="Skincare promotion" />
      </Carousel.Item>
    </Carousel>
  );
}
