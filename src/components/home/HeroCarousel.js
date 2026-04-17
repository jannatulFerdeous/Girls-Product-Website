import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { siteImages } from '../../assets/newImageAssets';

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={siteImages.heroVisual} alt="Featured beauty campaign" />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={siteImages.posterVisualTwo} alt="Beauty product story" />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={siteImages.spaProducts} alt="Spa inspired collection" />
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
