import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Product, { ProductSkeleton } from '../Product/Product';
import Container from '@mui/material/Container';
import './BrandNewItems.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux'
import { sortItem } from '../Slice/SortSlice';



BrandNewItems.propTypes = {
    data: PropTypes.array.isRequired,
};

function BrandNewItems({ data, isLoading }) {

    const [activeLink, setActiveLink] = useState(0)
    const ref = useRef({});

    const dispatch = useDispatch();
    const handleSort = (sort) => {
        const action = sortItem(sort);
        dispatch(action)
    }
    const toggleActive = (index, e) => {
        e.preventDefault();
        setActiveLink(index)
    }
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 701,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 1190,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
            ,
            {
                breakpoint: 1191,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                }
            }
        ]
    };

    const navLinks = [{
        id: 1,
        name: "all",
        category: "all",
        className: "nav-link",
    },
    {
        id: 2,
        name: "furniture",
        category: "furniture",
        className: "nav-link",
    },
    {
        id: 3,
        name: "Man cloth",
        category: "men",
        className: "nav-link",
    },
    {
        id: 4,
        name: "woman cloth",
        category: "woman",
        className: "nav-link",
    }]

    const navLink = navLinks.map((item, index) => {
        return (

            <li key={index} onClick={(e) => { handleSort(`${item.category}`); toggleActive(index, e) }} className={activeLink === index ? `active nav-link` : `nav-link`}><a href="/">{item.name}</a></li >

        )
    });

    return (
        <div className="bestSeller">
            <Container sx={{ maxWidth: { md: 1755 } }}>
                <Grid container sx={{ alignItems: 'center', marginBottom: '50px' }}>
                    <Box sx={{
                        marginBottom: {
                            xs: '30px',
                            md: '20px',
                            lg: '0px'
                        }
                    }} className="area-title">
                        <h2>Brand New Products</h2>
                        <p>Browse the huge variety of our products</p>
                    </Box>

                    <Box sx={{
                        marginLeft: {
                            md: '0px',
                            lg: 'auto'
                        }
                    }} className="product-tab">
                        <ul className="nav product-nav">
                            {navLink}
                        </ul>
                    </Box>
                </Grid>
                <Slider ref={ref} {...settings}>
                    {
                        isLoading && Array(20).fill(0).map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ProductSkeleton />
                                </React.Fragment>
                            )
                        })
                    }
                    {
                        !isLoading && data.map((item, index) => {
                            return (

                                <Product key={index} arr={data} itemClick={item} id={item.id} image={item.image} price={item.price} title={item.title} category={item.category} hoverImage={item.hoverImage} sale={item.sale} saleItem={item.salePrice} newItem={item.newItem} isLoading={isLoading}></Product>

                            )
                        })
                    }

                </Slider>
            </Container>


        </div >
    );
}

export default BrandNewItems;