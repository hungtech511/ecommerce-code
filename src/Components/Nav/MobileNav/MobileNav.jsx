import React, { useState } from 'react';
import './MobileNav.css';
import logo from '../logo.png';

import {
    NavLink, Link, useNavigate
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

function MobileNav({ toggleMobileNav, handleCloseNavMobile, openSearchForm }) {

    let navigate = useNavigate();

    const cart = useSelector((state) => state.cart.cartItems);
    const totalCart = cart.length;
    const totalPrice = JSON.parse(localStorage.getItem('TotalAmountProduct')) || 0
    const currentUser = JSON.parse(localStorage.getItem('login')) || {}
    const isEmptyUser = Object.keys(currentUser).length === 0;
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();


    const [openNavMobile, setOpenNavMobile] = useState(false);


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
        <div className={toggleMobileNav ? `mobile-nav expanded` : `mobile-nav`}>
            <div className="mobile-nav-overlay" onClick={() => handleCloseNavMobile()}></div>
            <div className="mobile-nav-content">
                <div className="mobile-logo">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <div className="mobile-content-wrapper">
                    <ul className="mobile-list">
                        <li><NavLink className={(navData) => (navData.isActive ? 'active' : 'link')}
                            to="/">Home</NavLink></li>
                        <li><NavLink to="/shop">Shop</NavLink></li>
                        <li><NavLink to="/products">Products</NavLink></li>
                        <li><NavLink to="/blogs">Blog</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>
                <div className="header-right">
                    <ul>
                        <li>
                            <a onClick={() => openSearchForm()} className="search-btn">
                                <i className="fas fa-search"></i>
                            </a>
                        </li>
                        <li className="d-shop-cart">
                            <Link to="/cart">
                                <i className="far fa-shopping-cart"></i><span className="cart-count">{totalCart}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MobileNav;