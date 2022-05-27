import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import Slider from 'react-slick';
import Container from '@mui/material/Container';
import './HomeCarousel.css';
import firstSlide from './slide1.jpg'
import secondSlide from './slide1-1.jpg'
import firstShape from './shape1.png'
import secondShape from './shape2.png'
import thirdShape from './shape3.png'
import fourthShape from './shape4.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonApp from '../ButtonApp/ButtonApp';

const HomeCarousel = () => {
    const ref = useRef({});
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        infinite: true,
        rows: 1,
        responsive: [
            {
                breakpoint: 501,
                settings: {
                    arrows: false,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                }
            }
        ]
    };
    return (
        <div className="banner-slider">
            <Slider ref={ref} {...settings}>
                <div>
                    <div className="background-slider" style={{ background: `url(${firstSlide}) no-repeat center center/cover` }}>
                        <div className="slider-item-custom">
                            <Container>
                                <div className="shape-title">
                                    <h2 className="up-down-animation">UX</h2>
                                </div>
                                <Grid container>
                                    <Grid item md={7} xs={12}>
                                        <Box>
                                            <span>Furniture Collection</span>
                                            <Typography variant="h1" className="heading" sx={{
                                                fontSize: {
                                                    xs: '25px',
                                                    sm: '40px',
                                                    lg: '60px',
                                                    xl: '70px'
                                                }
                                            }}>Synnes Dining Chair Upholstered</Typography>
                                            <Box className="group-btn">
                                                <ButtonApp direction="/shop" value="Shop Now" classColor="orange-btn wow fadeInLeft" data-delay="0.7s"></ButtonApp>
                                                <ButtonApp direction="/shop" value="category" classColor="white-btn wow fadeInLeft" data-delay="0.7s"></ButtonApp>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <Box>
                                            <img className="firstShape wow bounceInRight" src={firstShape} alt="shape" />
                                            <img className="secondShape wow bounceInRight" src={secondShape} alt="shape" />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="background-slider" style={{ background: `url(${secondSlide}) no-repeat center center/cover` }}>
                        <div className="slider-item-custom">
                            <Container>
                                <div className="shape-title">
                                    <h2 className="up-down-animation">UX</h2>
                                </div>
                                <Grid container>
                                    <Grid item md={7} xs={12}>
                                        <Box>
                                            <span>Furniture Collection</span>
                                            <Typography variant="h1" className="heading" sx={{
                                                fontSize: {
                                                    xs: '25px',
                                                    sm: '40px',
                                                    lg: '60px',
                                                    xl: '70px'
                                                }
                                            }}>Synnes Dining Chair Upholstered</Typography>
                                            <Box className="group-btn">
                                                <ButtonApp direction="/shop" value="Shop Now" classColor="orange-btn wow fadeInLeft" data-delay="0.7s"></ButtonApp>
                                                <ButtonApp direction="/shop" value="category" classColor="white-btn wow fadeInLeft" data-delay="0.7s"></ButtonApp>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <Box>
                                            <img className="firstShape wow bounceInRight" src={thirdShape} alt="shape" />
                                            <img className="secondShape wow bounceInRight" src={fourthShape} alt="shape" />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default HomeCarousel;