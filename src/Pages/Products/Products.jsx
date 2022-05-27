import React, { useState, useEffect } from 'react';

import ecomApi from '../../Api/ecomApi'

import Nav from '../../Components/Nav/Nav';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import ShopArea from '../../Components/ShopArea/ShopArea';


function Products(props) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getProduct = async () => {
            const products = await ecomApi.getProducts();
            setProducts(products.data)
            setIsLoading(false)
        }
        getProduct();
    }, [])
    const settings = {
        gridView: 4
    }
    return (
        <>
            <Nav />
            <FeatureTitle title="Our Shop" page="Shop" />
            <ShopArea data={products} settings={settings} isLoading={isLoading}></ShopArea>
            <Footer />
        </>
    );
}

export default Products;