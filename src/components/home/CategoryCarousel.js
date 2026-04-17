import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { siteImages } from '../../assets/newImageAssets';
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
                                    <img src={siteImages.skincareBottleTwo} alt="Skin Care" />
                                    <h5>SKIN CARE</h5>
                                </div>
                                <div className="item">
                                    <img src={siteImages.serumStillLife} alt="Serum and Glow" />
                                    <h5>SERUM GLOW</h5>
                                </div>
                                <div className="item">
                                    <img src={siteImages.beautyEditorial} alt="Make Up" />
                                    <h5>MAKE UP</h5>
                                </div>
                                <div className="item">
                                    <img src={siteImages.productFlatlay} alt="Beauty Sets" />
                                    <h5>BEAUTY SETS</h5>
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
