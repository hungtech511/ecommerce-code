import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { increaseByOne, decreaseByOne, setTotal, setTotalPrice, removeItem } from '../Slice/CartSlice'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

import './CartTable.css'

import { useSelector } from 'react-redux'
import ButtonApp from '../ButtonApp/ButtonApp';

function CartTable(props) {

    const cart = useSelector((state) => state.cart.cartItems);
    const totalPrice = JSON.parse(localStorage.getItem('TotalAmountProduct')) || 0

    const dispatch = useDispatch();


    const cartItem = cart.map((item, index) => {

        const handleDecrease = (cartItem) => {
            const action = decreaseByOne(cartItem);
            const actionSetTotal = setTotal();
            const actionSetTotalPrice = setTotalPrice();
            dispatch(action)
            dispatch(actionSetTotal);
            dispatch(actionSetTotalPrice);
        }

        const handleIncrease = (cartItem) => {
            const action = increaseByOne(cartItem);
            const actionSetTotal = setTotal();
            const actionSetTotalPrice = setTotalPrice();
            dispatch(action)
            dispatch(actionSetTotal);
            dispatch(actionSetTotalPrice);
        }

        const removeProduct = (cartItem) => {
            const action = removeItem(cartItem);
            const actionSetTotal = setTotal();
            const actionSetTotalPrice = setTotalPrice();
            dispatch(action)
            dispatch(actionSetTotal);
            dispatch(actionSetTotalPrice);
        }

        return (

            <tr key={index}>
                <td className="product-thumbnail">
                    <a href="#">
                        <img src={item.product.image} alt="cart" />
                    </a>
                </td>
                <td className="product-name">
                    <a href="#">{item.product.title}</a>
                </td>
                <td className="product-price">
                    <span className="amount">${item.product.sale ? item.product.salePrice.toFixed(2) : item.product.price.toFixed(2)}</span>
                </td>
                <td className="product-quantity">
                    <div className="cart-plus-minus">
                        <p>{item.quantity}</p>
                        <div onClick={() => handleDecrease(item)} className="dec qtybutton">-</div>
                        <div onClick={() => handleIncrease(item)} className="inc qtybutton">+</div>
                    </div>
                </td>
                <td className="product-subtotal">
                    <span className="amount">${item.totalPrice.toFixed(2)}</span>
                </td>
                <td className="product-remove">
                    <span style={{ cursor: 'pointer' }} onClick={() => removeProduct(item)}><i className="fa fa-times"></i></span>
                </td>
            </tr>

        )
    });


    return (
        <Box className="cart-area">
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid sx={{ alignItems: 'center' }} container spacing={2}>
                        <Grid item xs={12}>
                            <Box className="table-content">

                                {
                                    cart.length > 0 ?
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="product-thumbnail">Images</th>
                                                    <th className="cart-product-name">Product</th>
                                                    <th className="product-price">Unit Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Total</th>
                                                    <th className="product-remove">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItem}
                                            </tbody>
                                        </table> : <Typography varian="h2" sx={{ textAlign: 'center', fontSize: '35px' }}>No Product Found</Typography>}

                            </Box>
                        </Grid>
                        <Grid item md={5}>
                            <Box sx={{ marginBottom: "25px" }} className="cart-page-total">
                                <h2>Cart totals</h2>
                                <ul>
                                    <li>Total : <span className="cart-total-number">${totalPrice.toFixed(2)}</span></li>
                                </ul>
                            </Box>
                            <ButtonApp direction="/checkout" classColor="orange-btn" value="Checkout" />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default CartTable;