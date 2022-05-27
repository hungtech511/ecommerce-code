import React from 'react';
import {
    Link
} from "react-router-dom";
import './LinkToWishlist.css';

import { useSelector } from 'react-redux'

function LinkToWishlist() {
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    var myNumber = wishlist.length;
    var formattedNumber = myNumber > 0 ? ("0" + myNumber).slice(-2) : 0
    return (
        <Link className="icon-page" to='/wishlist'>
            <i className="fas fa-heart"></i>
            <span className="count">{formattedNumber}</span>
        </Link>
    );
}

export default LinkToWishlist;