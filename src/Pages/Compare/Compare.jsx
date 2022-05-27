import React, { useState, useEffect } from 'react';

import Nav from '../../Components/Nav/Nav';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux'
import { removeCompareItem } from '../../Components/Slice/CompareSlice'


function Compare(props) {
    const compare = useSelector((state) => state.compare.compare);
    const dispatch = useDispatch();

    const compareItem = compare.map((item, index) => {


        const removeProduct = (item) => {
            const action = removeCompareItem(item)
            dispatch(action)
        }

        return (

            <tr key={index}>
                <td className="product-thumbnail">
                    <a href="#">
                        <img src={item.image} alt="cart" />
                    </a>
                </td>
                <td className="product-name">
                    <a href="#">{item.title}</a>
                </td>
                <td className="product-price">
                    <span className="amount">${item.sale ? item.salePrice.toFixed(2) : item.price.toFixed(2)}</span>
                </td>
                <td className="product-quantity">
                    <span>{item.detail && item.detail.stock ? 'In stock' : 'Out stock'}</span>
                </td>
                <td className="product-subtotal">
                    <span className="amount">${item.sale ? item.salePrice.toFixed(2) : item.price.toFixed(2)}</span>
                </td>
                <td className="product-remove">
                    <span style={{ cursor: 'pointer' }} onClick={() => removeProduct(item)}><i className="fa fa-times"></i></span>
                </td>
            </tr>

        )
    });

    return (
        <>
            <Nav></Nav>
            <FeatureTitle title="Our Compare" page="Compare" />
            <Box className="cart-area">
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid sx={{ alignItems: 'center' }} container spacing={2}>
                            <Grid item xs={12}>
                                <Box className="table-content">

                                    {
                                        compare.length > 0 ?
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="product-thumbnail">Images</th>
                                                        <th className="cart-product-name">Product</th>
                                                        <th className="product-price">Unit Price</th>
                                                        <th className="product-quantity">Stock</th>
                                                        <th className="product-subtotal">Total</th>
                                                        <th className="product-remove">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {compareItem}
                                                </tbody>
                                            </table> : <Typography varian="h2" sx={{ textAlign: 'center', fontSize: '35px' }}>No Product Found</Typography>}

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Footer></Footer>
        </>
    );
}

export default Compare;