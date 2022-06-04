import React, { useState, useEffect, useRef } from 'react';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import ecomApi from '../../Api/ecomApi'


import './Checkout.css';

function Checkout(props) {

    let cart = useSelector((state) => state.cart.cartItems)
    let totalCart = JSON.parse(localStorage.getItem('TotalAmountProduct')) || 0
    const currentUser = JSON.parse(localStorage.getItem('login')) || {}
    const isEmptyUser = Object.keys(currentUser).length === 0

    const [flat, setFlat] = useState(0)
    const [freeShip, setFreeShip] = useState(0)
    const [users, setUsers] = useState([])
    const form = useRef();

    useEffect(() => {
        const getUsers = async () => {
            const users = await ecomApi.getUsers();
            setUsers(users.data)
        }
        getUsers();
    }, [])

    const onSubmit = async (data) => {
        const userData = {
            fullName: data.fullName,
            email: data.email,
            price: totalCart - flat - freeShip
        }

        let hasEmail = users && Object.values(users).some(i => i.email === userData.email);

        try {
            if (hasEmail) {
                emailjs.sendForm('service_ldbcnfn', 'template_fjyruuh', form.current, '7zlC7tLnEx84y0g41')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    })
                toast.success(`Successful Send Email`, {
                    position: "top-left",
                    theme: 'colored',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error('Email is not exist in database, please register', {
                    position: "top-left",
                    theme: 'colored',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log('error', error);
        }
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
            switch (decreasePrice) {
                case 7:
                    setFlat(7)
                    break;
                case 30:
                    setFreeShip(30)
                    break;
            }
        } else {
            switch (decreasePrice) {
                case 7:
                    setFlat(0)
                    break;
                case 30:
                    setFreeShip(0)
                    break;
            }
        }
    }

    return (
        <>
            <Nav></Nav>
            <FeatureTitle title="Checkout" page="Checkout" ></FeatureTitle>
            <Box sx={{ padding: '100px 0' }} className="checkout-area">
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item md={8}>
                                <Box className="billing-details basic-login">
                                    <h3>Billing Details</h3>
                                    {
                                        isEmptyUser && <h4 style={{ textAlign: 'center', fontSize: '20px' }}>Please <Link to="/login" style={{ textDecoration: 'underline' }}>log in</Link> to check out</h4>
                                    }
                                    {
                                        !isEmptyUser && <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                                            <Grid container spacing={2}>
                                                <Grid item md={12}>
                                                    <Box className="text-field">
                                                        <label htmlFor="fullname">Full Name <span className="required">*</span></label>
                                                        < input defaultValue={currentUser.fullName || ""} type="text" label="Full Name" placeholder="Enter fullname..."  {...register("fullName", { required: true })} name="name"></ input >
                                                        <p>{errors.fullName?.message}</p>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={12}>
                                                    <Box className="text-field">
                                                        <label htmlFor="email">Email <span className="required">*</span></label>
                                                        <input defaultValue={currentUser.email || ""} type="text" label="Email" placeholder="Enter email..." {...register("email", { required: true })} name="email"></input >
                                                        <p>{errors.email?.message}</p>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={12}>
                                                    <h4>Your order</h4>
                                                    <Box sx={{ marginBottom: '25px' }} className="your-order">
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
                                                                    <td><strong><span className="amount" name="price">${(totalCart - flat - freeShip).toFixed(2)}</span></strong></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <button type="submit" className="btn-app green-btn">Place order</button>
                                        </form>
                                    }
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