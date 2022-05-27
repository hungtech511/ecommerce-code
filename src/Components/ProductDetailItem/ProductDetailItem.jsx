import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, setTotal, setTotalPrice } from '../Slice/CartSlice'
import { addToWishlist, removeItem } from '../Slice/WishlistSlice'


function ProductDetailItem({ item, isLoading }) {


    const [wishlist, setWishList] = useState(false);
    const [toggleImage, setToggleImage] = useState(0)
    const [count, setCount] = useState(0);

    let sizeArr = ["L", "M", "X", "XL", "XXL"];
    const dispatch = useDispatch();
    const wishlistArr = useSelector(state => state.wishlist.wishlist) || [];

    const getImage = (idx) => {
        setToggleImage(idx)
    }

    const increaseCount = () => {
        setCount(count + 1);
    }
    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addItem = () => {
        if (count > 0) {
            const productCart = {
                id: item.id,
                product: item,
                quantity: count,
                totalPrice: item.sale ? count * item.salePrice : count * item.price
            }
            const actionAddToCart = addToCart(productCart);
            const actionSetTotal = setTotal();
            const actionSetTotalPrice = setTotalPrice();
            dispatch(actionAddToCart);
            dispatch(actionSetTotal);
            dispatch(actionSetTotalPrice);
        }

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

    return (
        <>
            {
                isLoading && <ProductDetailItemSkeleton />
            }
            {
                !isLoading && < Box className="product-detail-item" >
                    <Container>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={4}>
                                <Grid item md={6} xs={12}>
                                    <Box className="product-detail-image">
                                        <Box className="detail-image-wrapper">
                                            <img className='first-image' src={item.imageGallery && item.imageGallery[toggleImage].src} alt="image" />
                                        </Box>
                                        <Box className="detail-image-lists">
                                            {item.imageGallery && item.imageGallery.map((galleryItem, index) => {
                                                return (
                                                    <Box key={index} onClick={() => getImage(index)} className="detail-image-list">
                                                        <img key={index} src={item.imageGallery && item.imageGallery[index].src} alt="image" />
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Box className="product-detail-content">
                                        <Box className="details-cat">
                                            <a href="#">{item.category}, </a>
                                            <a href="#">{Array.isArray(item.branding) ? item.branding[0] : item.branding}</a>
                                        </Box>
                                        <h2 className="pro-details-title">{item.title}</h2>
                                        <Box className="details-price">
                                            <span>${item.price && item.price.toFixed(2)}</span>
                                            {item.salePrice && <span className="old-price">$230.00</span>}
                                        </Box>
                                        {
                                            item.details && item.details.sizeCloth &&
                                            <Box className="detail-size variant-item">
                                                <Box className="variant-name">
                                                    <span>size</span>
                                                </Box>
                                                <ul className="shop-link">
                                                    {
                                                        sizeArr.map((link, i) => {
                                                            if (Array.isArray(item.details.size)) {
                                                                return (
                                                                    <li className={item.details && item.details.size.indexOf(link) !== -1 ? 'active' : null} key={i}>
                                                                        <span>{link}</span>
                                                                    </li>
                                                                )
                                                            } else {
                                                                return (
                                                                    <li className={item.details && link === item.details.size ? 'active' : null} key={i}>
                                                                        <span>{link}</span>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </Box>
                                        }
                                        <Box className="detail-desc variant-item">
                                            <p>{item.details && item.details.description}</p>
                                        </Box>
                                        <Box className="product-info-list variant-item">
                                            <ul>
                                                <li className="text-capitalize">
                                                    <span>Brands:</span> {item.branding && item.branding.toString()}</li>
                                                <li>
                                                    <span>Product Code:</span> f1</li>
                                                <li><span>Reward Points:</span> 100</li>
                                                <li><span>Stock:</span>
                                                    <span className="in-stock">{item.details && item.details.stock ? 'In Stock' : 'Out Stock'}</span>
                                                </li></ul>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }} className="variant-item">
                                            <Box className="cart-plus-minus">
                                                <p>{count}</p>
                                                <button onClick={decreaseCount} className="dec qtybutton">-</button>
                                                <button onClick={increaseCount} className="inc qtybutton">+</button>
                                            </Box>
                                            <Box className="product-wishlist">
                                                <span className={wishlistArr.some(i => i.id === item.id) || wishlist ? 'active details-action-icon' : 'details-action-icon'} onClick={() => toggleProductToWishList(item)}><i className="fas fa-heart" title="Wishlist"></i></span>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <span className="btn-app orange-btn" onClick={addItem}>Purchase</span>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container >
                </ Box >
            }
        </>
    );
}

const ProductDetailItemSkeleton = () => {
    return (
        < Box className="product-detail-item loading-skeleton-custom" >
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item md={6} xs={12}>
                            <Box className="product-detail-image">
                                <Box className="detail-image-wrapper">
                                    <Skeleton />
                                </Box>
                                <Box className="detail-image-lists">
                                    <Skeleton inline={true} />
                                    <Skeleton inline={true} />
                                    <Skeleton inline={true} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box className="product-detail-content">
                                <Box className="details-cat">
                                    <Skeleton height={19} />
                                </Box>
                                <h2 className="pro-details-title">
                                    <Skeleton />
                                </h2>
                                <Box className="details-price">
                                    <Skeleton />
                                </Box>

                                <Box sx={{ marginBottom: '25px' }}>
                                    <Skeleton height={99} />
                                </Box>
                                <Box sx={{ marginBottom: '25px' }}>
                                    <Skeleton style={{ marginBottom: '10px' }} count={5} />
                                </Box>
                                <Box sx={{ marginBottom: '20px' }}>
                                    <Skeleton height={100} />
                                </Box>
                                <Box sx={{ marginBottom: '20px' }}>
                                    <Skeleton height={100} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </ Box >
    )
}

export default ProductDetailItem;