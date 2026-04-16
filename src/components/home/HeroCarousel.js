import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import img1 from '../../assets/img/banner1.jpg';
import img2 from '../../assets/img/banner2.jpg';
import img3 from '../../assets/img/banner3.jpg';

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={img1} alt="First slide" />  
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={img2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:'80vh'}} className="d-block w-100" src={img3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
