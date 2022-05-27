import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import banner from './shop-banner.jpg'

import Product, { ProductSkeleton } from '../Product/Product';
import Pagination from '../Pagination/Pagination'

import './ShopArea.css';

function ShopArea({ settings, data, isLoading }) {

    const [active, setActive] = useState(1);
    const [grid, setGrid] = useState(settings.gridView);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    const listView = () => {
        setActive(0)
        setGrid(12)
    }
    const gridView = () => {
        setActive(1)
        setGrid(settings.gridView)
    }


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // When you are in page 4 but search for something, it will return to page 1 
    useEffect(() => {
        if (currentProducts === undefined || currentProducts.length === 0) {
            paginate(1)
        }
    }, [currentProducts])
    return (
        <div className="shop-area">
            <Container sx={{ maxWidth: { md: 1200 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Box className="shop-list">
                            <div className="shop-gallery">
                                {window.location.pathname === '/shop' && <Box>
                                    <img src={banner} alt="banner" />
                                </Box>}

                                <div className="shop-head">
                                    <div className="product-showing">
                                        <p>Showing {(currentProducts.length > 0 ? indexOfFirstProduct + 1 : '00').toString().padStart(2, "0")} - {(indexOfFirstProduct + currentProducts.length).toString().padStart(2, "0")} of {data.length} results</p>
                                    </div>
                                    <ul className="grid-list">
                                        <li className="nav-item"><a href="#!" onClick={listView} className={active === 0 ? "active" : null}><i className="fas fa-list-ul"></i></a></li>
                                        <li className="nav-item"><a href="#!" onClick={gridView} className={active === 1 ? "active" : null}><i className="fas fa-th-large"></i></a></li>
                                    </ul>
                                </div>
                                <Grid className="shop-wrapper" container spacing={4}>
                                    {isLoading && Array(20).fill(0).map((item, index) => {
                                        return (
                                            <Grid item md={grid} sm={6} xs={12} key={index}>
                                                <ProductSkeleton />
                                            </Grid>
                                        )
                                    })}
                                    {
                                        !isLoading && currentProducts.map((item, index) => {
                                            return (
                                                <Grid item md={grid} sm={6} xs={12} className={`${grid === 12 ? 'product-block' : 'product-col'}`} key={item.id}>
                                                    <Product arr={data} itemClick={item} id={item.id} image={item.image} price={item.price} title={item.title} category={item.category} hoverImage={item.hoverImage} sale={item.sale} saleItem={item.salePrice} newItem={item.newItem} desc={item.details.description}></Product>
                                                </Grid>
                                            )
                                        })
                                    }
                                    {
                                        !currentProducts.length > 0 && <div className="show-error">
                                            <h2>Data Not Found </h2>
                                        </div>
                                    }
                                </Grid>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <Pagination currentProducts={currentProducts} itemsPerPage={productsPerPage} total={data.length} paginate={paginate}></Pagination>
            </Container>
        </ div>
    );
}

export default ShopArea;