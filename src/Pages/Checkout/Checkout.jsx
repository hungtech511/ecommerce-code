import React, { useState, useEffect, useCallback } from 'react';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";



import './Checkout.css';

function Checkout(props) {

    const cart = useSelector((state) => state.cart.cartItems)
    let totalCart = JSON.parse(localStorage.getItem('TotalAmountProduct')) || 0
    const [finalPrice, setFinalPrice] = useState(totalCart)

    const onSubmit = async (data) => {
        const userData = {
            fullName: data.fullName,
            email: data.email,
            price: finalPrice
        }
        console.log(userData);
    }
    const schema = yup.object().shape({
        fullName: yup.string().required("Please enter a fullname").test(
            'Enter 2 words', "Please enter 2 words", (value) => {
                return value.split(" ").length >= 2;
            }
        ),
        email: yup.string().required("Please enter a email").test(
            'Invalid email', "Invalid email", (value) => {
                // validate email, copy regex
                let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return value.match(mailFormat);
            }
        ),
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const changeValue = (e) => {
        const decreasePrice = parseInt(e.target.value)
        if (e.target.checked) {
            setFinalPrice(finalPrice - decreasePrice)
        } else {
            setFinalPrice(finalPrice + decreasePrice)
        }
    }

    useEffect(() => {
        setFinalPrice(totalCart)
    }, [totalCart])
    return (
        <>
            {console.log(totalCart, finalPrice)}
            <Nav></Nav>
            <FeatureTitle title="Checkout" page="Checkout" ></FeatureTitle>
            <Box sx={{ padding: '100px 0' }} className="checkout-area">
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item md={8}>
                                <Box className="billing-details basic-login">
                                    <h3>Billing Details</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container spacing={2}>
                                            <Grid item md={12}>
                                                <Box className="text-field">
                                                    <label htmlFor="fullname">Full Name <span className="required">*</span></label>
                                                    < input type="text" label="Full Name" placeholder="Enter fullname..."  {...register("fullName", { required: true })}></ input >
                                                    <p>{errors.fullName?.message}</p>
                                                </Box>
                                            </Grid>
                                            <Grid item md={12}>
                                                <Box className="text-field">
                                                    <label htmlFor="email">Email <span className="required">*</span></label>
                                                    <input type="text" label="Email" placeholder="Enter email..." {...register("email", { required: true })}></input >
                                                    <p>{errors.email?.message}</p>
                                                </Box>
                                            </Grid>
                                            <Grid item md={12}>
                                                <h4>Your order</h4>
                                                <Box className="your-order">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="product-name">Product</th>
                                                                <th className="product-total">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {totalCart > 0 && cart.map((item, index) => {
                                                                return (
                                                                    <tr key={index} className="cart_item">
                                                                        <td className="product-name">{item.product.title}<strong className="product-quantity"> × {item.quantity}</strong></td>
                                                                        <td className="product-total"><span className="amount">${item.totalPrice.toFixed(2)}</span></td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                        <tfoot>
                                                            <tr className="cart-subtotal">
                                                                <th>Cart Subtotal</th>
                                                                <td><span className="amount">$ {totalCart.toFixed(2)}</span></td>
                                                            </tr>
                                                            <tr className="shipping">
                                                                <th>Shipping</th>
                                                                <td>
                                                                    <ul>
                                                                        <li>
                                                                            <input type="checkbox" id="flat" onChange={(e) => changeValue(e)} value={7} />
                                                                            <label htmlFor="flat">Flat Rate: <span className="amount">$7.00</span></label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="checkbox" id="shipping" onChange={(e) => changeValue(e)} value={30} />
                                                                            <label htmlFor="shipping">Free Shipping: $30.00</label>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr className="order-total">
                                                                <th>Order Total</th>
                                                                <td><strong><span className="amount">${finalPrice.toFixed(2)}</span></strong></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <button type="submit" className="btn-app green-btn">Place order</button>
                                    </form>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box >
            <Footer></Footer>
        </>
    );
}

export default Checkout;