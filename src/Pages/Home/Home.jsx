import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import HomeCarousel from '../../Components/HomeCarousel/HomeCarousel';
import BrandNewItems from '../../Components/BrandNewItems/BrandNewItems';
import Nav from '../../Components/Nav/Nav';
import Newsletter from '../../Components/Newsletter/Newsletter';
import Footer from '../../Components/Footer/Footer';
import TopSellers from '../../Components/TopSellers/TopSellers';
import UpComingProduct from '../../Components/UpComingProduct/UpComingProduct';
import NewFeed from '../../Components/NewFeed/NewFeed';

import ecomApi from '../../Api/ecomApi'
import { useSelector } from 'react-redux';

function Home() {
    const sort = useSelector((state) => state.sort.sortData);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const showProducts = async () => {
            const getProducts = await ecomApi.getProducts();
            const products = getProducts.data;
            let filterItem = [];

            switch (sort) {
                case 'all':
                    setProducts(products)
                    break;
                case 'furniture':
                    filterItem = products.filter(item => item.category === "furniture")
                    setProducts(filterItem);
                    break;
                case 'men':
                    filterItem = products.filter(item => item.category === `men`);
                    setProducts(filterItem);
                    break;
                case 'woman':
                    filterItem = products.filter(item => item.category === `woman`);
                    setProducts(filterItem);
                    break;
            }
            setIsLoading(false)
        }
        showProducts();
        setIsLoading(true)
    }, [sort])


    return (

        <>
            <Nav></Nav>
            <HomeCarousel></HomeCarousel>
            <Banner></Banner>
            <TopSellers></TopSellers>
            <BrandNewItems data={products} isLoading={isLoading}></BrandNewItems>
            <UpComingProduct></UpComingProduct>
            <NewFeed></NewFeed>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </>
    );
}

export default Home;