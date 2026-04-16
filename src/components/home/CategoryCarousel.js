import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import card1 from '../../assets/img/cat-1.jpg';
import card2 from '../../assets/img/cat-2.jpg';
import card3 from '../../assets/img/cat-3.jpg';
import card4 from '../../assets/img/cat-4.jpg';
import './CategoryCarousel.css';

const CategoryCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx">
                            <Carousel responsive={responsive} infinite={true} className="skill-slider">
                                <div className="item">
                                    <img src={card1} alt="Skin Care" />
                                    <h5>SKIN CARE</h5>
                                </div>
                                <div className="item">
                                    <img src={card2} alt="Body Care" />
                                    <h5>BODY CARE</h5>
                                </div>
                                <div className="item">
                                    <img src={card3} alt="Make Up" />
                                    <h5>MAKE UP</h5>
                                </div>
                                <div className="item">
                                    <img src={card4} alt="Spa Care" />
                                    <h5>SPA CARE</h5>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryCarousel;
