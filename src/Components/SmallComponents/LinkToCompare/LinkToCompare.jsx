import React from 'react';
import {
    Link
} from "react-router-dom";
import '../LinkToWishlist/LinkToWishlist.css';

import { useSelector } from 'react-redux'

function LinkToCompare(props) {
    const compare = useSelector((state) => state.compare.compare);
    var myNumber = compare.length;
    var formattedNumber = myNumber > 0 ? ("0" + myNumber).slice(-2) : 0;
    return (
        <Link className="icon-page compare" to='/compare'>
            <i className="fas fa-compress-alt"></i>
            <span className="count">{formattedNumber}</span>
        </Link>
    );
}

export default LinkToCompare;