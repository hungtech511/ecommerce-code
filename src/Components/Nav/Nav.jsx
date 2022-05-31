import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import logo from './logo.png'
import {
    NavLink, Link, useNavigate
} from "react-router-dom";
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux'
import { setTotal, setTotalPrice, removeItem } from '../Slice/CartSlice'
import { searchItem } from '../Slice/SearchSlice'

import ButtonApp from '../ButtonApp/ButtonApp'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import MobileNav from './MobileNav/MobileNav';



function Nav() {
    let navigate = useNavigate();

    const cart = useSelector((state) => state.cart.cartItems);
    const totalCart = cart.length;
    const totalPrice = JSON.parse(localStorage.getItem('TotalAmountProduct')) || 0
    const currentUser = JSON.parse(localStorage.getItem('login')) || {}
    const isEmptyUser = Object.keys(currentUser).length === 0;
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();


    const [openSearch, setOpenSearch] = useState(false);
    const [openNavMobile, setOpenNavMobile] = useState(false);


    // Submit Data & Go To Shop Page
    const onSubmit = data => {
        const action = searchItem(data.searchData);
        dispatch(action)
        navigate('/shop');
        setOpenSearch(false)
    };

    // Open Nav Mobile
    const handleOpenNavMobile = () => {
        setOpenNavMobile(true)
    }
    const handleCloseNavMobile = () => {
        setOpenNavMobile(false)
    }

    // Open Search Form
    const openSearchForm = () => {
        setOpenSearch(true)
    }
    const closeSearchForm = () => {
        setOpenSearch(false)
    }

    // Remove Item In Cart List
    const removeProduct = (cartItem) => {
        const action = removeItem(cartItem);
        const actionSetTotal = setTotal()
        const actionSetTotalPrice = setTotalPrice()
        dispatch(action)
        dispatch(actionSetTotal)
        dispatch(actionSetTotalPrice)
    }

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    // Nav add class
    const isSticky = () => {
        const nav = document.querySelector('.nav');
        const scrollTop = window.scrollY;
        scrollTop >= 160 ? nav.classList.add('is-sticky') : nav.classList.remove('is-sticky');
    };

    const logOut = () => {
        localStorage.removeItem('login');
        toast.success(`Successful Logout`, {
            position: "top-left",
            theme: 'colored',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        navigate('/');
    }


    return (
        <>
            <nav className="nav">
                <Container sx={{ maxWidth: { md: 1724 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid sx={{ alignItems: 'center' }} container spacing={2}>
                            <Grid item md={2}>
                                <Box>
                                    <Link to="/"><img src={logo} alt="logo" /></Link>
                                </Box>
                            </Grid>
                            <Grid sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                }
                            }} item md={7}>
                                <ul className="nav-list">
                                    <li><NavLink className={(navData) => (navData.isActive ? 'active' : 'link')}
                                        to="/">Home</NavLink></li>
                                    <li><NavLink to="/shop">Shop</NavLink></li>
                                    <li><NavLink to="/products">Products</NavLink></li>
                                    <li><NavLink to="/blogs">Blog</NavLink></li>
                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </Grid>
                            <Grid sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                }
                            }} item md={3}>
                                <Box className="header-right">
                                    <ul>
                                        <li>
                                            <a onClick={() => openSearchForm()} className="search-btn">
                                                <i className="fas fa-search"></i>
                                            </a></li>
                                        <li className="login-btn">
                                            <Link to={!isEmptyUser ? `/` : '/login'}><i className="far fa-user"></i > <span className={!isEmptyUser ? `cart-count` : ''}></span> </Link>
                                            {!isEmptyUser > 0 &&
                                                <ul className="minicart">
                                                    <h2>Welcome, {currentUser.fullName}</h2>
                                                    <li className="total-price log-out">
                                                        <span onClick={() => logOut()} className="btn-app orange-btn">Log out</span>
                                                    </li>
                                                </ul>
                                            }
                                        </li>
                                        <li className="d-shop-cart">
                                            <Link to="/cart">
                                                <i className="far fa-shopping-cart"></i><span className="cart-count">{totalCart}</span>
                                            </Link>

                                            <ul className="minicart">
                                                {totalCart > 0 ? cart.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <div className="cart-img">
                                                                <Link to={`/details/${item.id - 1}`}><img src={item.product.image} alt="Cart" /></Link>
                                                            </div>
                                                            <div className="cart-content">
                                                                <h3><Link to={`/details/${item.id - 1}`}>{item.product.title}</Link></h3>
                                                                <div className="cart-price">
                                                                    <span className="new">${item.product.sale ? item.product.salePrice : item.product.price} * {item.quantity}</span> = <span className="new ml-1 ">${item.totalPrice}</span>
                                                                </div>
                                                            </div>
                                                            <div className="del-icon">
                                                                <span onClick={() => removeProduct(item)}><i className="far fa-trash-alt"></i></span>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <h2>Product Not Found</h2>}
                                                <li>
                                                    <div className="total-price">
                                                        <span>Total:</span>
                                                        <span>${totalPrice.toFixed(2)}</span>
                                                    </div>
                                                </li>
                                                <li className="go-to-cart">
                                                    <ButtonApp value="shopping cart" direction="/cart" classColor="orange-btn"></ButtonApp>
                                                </li>
                                                <li className="go-to-cart">
                                                    <ButtonApp value="check out" direction="/checkout" classColor="green-btn"></ButtonApp>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Box>
                            </Grid>
                            <Grid sx={{
                                display: {
                                    xs: 'block',
                                    md: 'none'
                                },
                                marginLeft: 'auto'
                            }} item md={10}>
                                <Box className="mobile-btn header-right">
                                    <ul>
                                        <li className="login-btn">
                                            <Link to={!isEmptyUser ? `/` : '/login'}><i className="far fa-user"></i > <span className={!isEmptyUser ? `cart-count` : ''}></span> </Link>
                                            {!isEmptyUser > 0 &&
                                                <ul className="minicart">
                                                    <h2>Welcome, {currentUser.fullName}</h2>
                                                    <li className="total-price log-out">
                                                        <span onClick={() => logOut()} className="btn-app orange-btn">Log out</span>
                                                    </li>
                                                </ul>
                                            }
                                        </li>
                                        <li onClick={() => handleOpenNavMobile()}>
                                            <i className="fas fa-bars hamburger-bars"></i>
                                        </li>
                                    </ul>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </nav>
            {
                openSearch && <div className="search-wrap">
                    <div className="search-inner">
                        <i onClick={() => closeSearchForm()} className="fa fa-times search-close"></i>
                        <div className="search-cell">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="search-field-holder">
                                    <input placeholder="Search Entire Store....." type="text" {...register("searchData")} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <MobileNav toggleMobileNav={openNavMobile} handleCloseNavMobile={handleCloseNavMobile} openSearchForm={openSearchForm}></MobileNav>
        </>
    );
}

export default Nav;