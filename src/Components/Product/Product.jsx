import React, { useState, useEffect, useRef } from 'react';
import './Product.css';
import {
    Link
} from "react-router-dom";
import Box from '@mui/material/Box';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { increaseByOne, setTotal, setTotalPrice } from '../Slice/CartSlice'
import { addToWishlist, removeItem } from '../Slice/WishlistSlice'
import { addToCompare, removeCompareItem } from '../Slice/CompareSlice'
import { getDataToModal, openModal } from '../Slice/ModalSlice'



function Product(props) {

    const wishlistArr = useSelector((state) => state.wishlist.wishlist) || [];
    const compareArr = useSelector((state) => state.compare.compare) || [];
    const dispatch = useDispatch();

    const { image, price, sale, title, category, hoverImage, saleItem, newItem, id, desc, itemClick, arr, isLoading } = props;

    const [wishlist, setWishList] = useState(false);
    const [compare, setCompare] = useState(false);

    const handleModalView = (item) => {
        let html = document.querySelector("html");
        const action = getDataToModal(item);
        const actionOpenModal = openModal()
        dispatch(action)
        dispatch(actionOpenModal)
        html.classList.add('prevent-scroll')
    }
    const increaseByOneProduct = (item) => {
        const action = increaseByOne(item);
        const actionSetTotal = setTotal();
        const actionSetTotalPrice = setTotalPrice();
        dispatch(action)
        dispatch(actionSetTotal);
        dispatch(actionSetTotalPrice);
    }


    const toggleProductToWishList = (item) => {
        if (!wishlistArr.some(i => i.id === item.id)) {
            const action = addToWishlist(item)
            dispatch(action)
            setWishList(true)
        } else {
            const action = removeItem(item)
            dispatch(action)
            setWishList(false)
        }
    }
    const toggleProductToCompare = (item) => {
        if (!compareArr.some(i => i.id === item.id)) {
            const action = addToCompare(item)
            dispatch(action)
        } else {
            const action = removeCompareItem(item)
            dispatch(action)
        }
    }





    return (
        <>
            {isLoading && <ProductSkeleton />}
            {!isLoading && <Box className="product-wrapper">
                <Box className="product-img">
                    <Link to={`/details/${id - 1}`}>
                        <img src={image} alt="image" />
                        <img className="secondary-img" src={hoverImage} alt="imge 2"></img>
                    </Link>
                    <Box className="product-action text-center">
                        <span onClick={() => increaseByOneProduct(itemClick)} title="Shopping Cart"><i className="fal fa-cart-plus" ></i></span >
                        <span onClick={() => handleModalView(itemClick)} title="Quick View"><i className="fal fa-eye"></i></span>
                        <span className={compareArr.some(item => item.id === itemClick.id) || compare ? 'active' : ''} onClick={() => toggleProductToCompare(itemClick)} title="Compare"><i className="far fa-exchange-alt"></i></span>
                    </Box>
                    <Box className="sale-tag">
                        {newItem && <span className="new">new</span>}
                        {sale && <span className="sale">sale</span>}
                    </Box>
                </Box>

                <Box className="product-content">
                    <Box className="pro-cat mb-10">
                        <a href="#!">{category} </a>
                    </Box>
                    <h4><Link to={`/details/${id - 1}`}>{title}</Link></h4>
                    <Box className="product-meta">
                        <Box className="pro-price">
                            <span>{sale ? saleItem.toFixed(2) : price.toFixed(2)} USD</span>
                            {sale ? <span className="old-price">$230.00 USD</span> : <></>}
                        </Box>
                        <Box className="pro-content">
                            <p>{desc}</p>
                        </Box>
                    </Box>
                    <Box className="product-wishlist">
                        <span onClick={() => increaseByOneProduct(itemClick)} title="Shopping Cart"><i className="fal fa-cart-plus" ></i></span >
                        <span onClick={() => handleModalView(itemClick)} title="Quick View"><i className="fal fa-eye"></i></span>
                        <span className={wishlistArr.some(item => item.id === itemClick.id) || wishlist ? 'active' : ''} onClick={() => toggleProductToWishList(itemClick)}><i className="far fa-heart" title="Wishlist"></i></span>
                    </Box>
                </Box>
            </Box>}
        </>
    );
}

export const ProductSkeleton = () => {
    return (
        <Box className="product-wrapper">
            <Skeleton height={325} />
            <Box className="product-content">
                <Box className="pro-cat mb-10">
                    <Skeleton />
                </Box>
                <Skeleton />
                <Box className="product-meta">
                    <Box className="pro-price">
                        <Skeleton />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Product;