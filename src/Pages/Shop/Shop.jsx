import React, { useState, useEffect } from 'react';

import Nav from '../../Components/Nav/Nav';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import ShopArea from '../../Components/ShopArea/ShopArea';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useSelector } from 'react-redux';
import ecomApi from '../../Api/ecomApi'


import WidgetSearch from '../../Components/Widget/ShopWidget/WidgetSearch';
import WidgetPrice from '../../Components/Widget/ShopWidget/WidgetPrice';
import WidgetBranding from '../../Components/Widget/ShopWidget/WidgetBranding';
import WidgetSize from '../../Components/Widget/ShopWidget/WidgetSize';
import WidgetCategories from '../../Components/Widget/ShopWidget/WidgetCategories';



function Shop(props) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let filterItem = [];

    const settings = {
        gridView: 6
    }
    const search = useSelector((state) => state.search.searchData);
    const price = useSelector((state) => state.price.priceData);
    const brandingArr = useSelector((state) => state.branding.brandingData);
    const sizeArr = useSelector((state) => state.size.sizeData);
    const categoriesArr = useSelector((state) => state.categories.categoriesData);

    function filterData(tableData, array, props1, props2) {
        // Messy Code
        let newTestArr = []
        let a = []
        let b = []
        if (array.length > 0) {
            if (props1 !== undefined && props2 === undefined) {
                let testArr = tableData.filter(item => {
                    newTestArr = tableData.filter(item => array.includes(item[props1]));
                    // Check if properties is array 
                    if (Array.isArray(item[props1])) {
                        let arr = item[props1];
                        if (array.some(r => arr.includes(r))) {
                            a.push(item)
                            newTestArr = [...newTestArr, ...a]
                            b = [...newTestArr]

                        }
                    }
                });
                testArr = [...newTestArr, ...b];
                return testArr;
            } else if (props2 !== undefined) {
                let testArr = tableData.filter(item => {
                    newTestArr = tableData.filter(item => array.includes(item[props1][props2]));
                    // Check if properties is array 
                    if (Array.isArray(item[props1][props2])) {
                        let arr = item[props1][props2];
                        if (array.some(r => arr.includes(r))) {
                            a.push(item)
                            newTestArr = [...newTestArr, ...a]
                            b = [...newTestArr]
                        }
                    }
                });
                testArr = [...b];
                return testArr;
            }

        }
    }

    useEffect(() => {
        const getProduct = async () => {
            const products = await ecomApi.getProducts();

            //  Search Item 
            filterItem = products.data.filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);

            // Price Range Item
            const searchPrice = products.data.filter(item => {
                const getSale = item.sale ? item.salePrice : item.price
                return price[0] <= getSale && getSale <= price[1]
            });
            filterItem = searchPrice.filter(item => filterItem.includes(item));

            // Filter By Branding Name
            const brandingItem = brandingArr.length > 0 ? filterData(products.data, brandingArr, 'branding') : products.data;
            filterItem = brandingItem.filter(item => filterItem.includes(item));

            // Filter By Size
            const sizeItem = sizeArr.length > 0 ? filterData(products.data, sizeArr, 'details', 'size') : products.data;
            filterItem = sizeItem.filter(item => filterItem.includes(item));

            // Filter By categories
            const categoriesItem = categoriesArr.length > 0 ? filterData(products.data, categoriesArr, 'category') : products.data;
            filterItem = categoriesItem.filter(item => filterItem.includes(item));

            setIsLoading(false)
            setItems(filterItem)
        }
        getProduct();
        setIsLoading(true)
    }, [search, price, brandingArr, sizeArr, categoriesArr])


    return (
        <>
            <Nav />
            <FeatureTitle title="Our Shop" page="Shop" />
            <Box className="shop-layout" sx={{ padding: '100px 0' }}>
                <Container sx={{ maxWidth: { md: 1200 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{
                            xs: 0,
                            md: 3
                        }}>
                            <Grid item md={8} xs={12}>
                                <ShopArea data={items} settings={settings} isLoading={isLoading}></ShopArea>
                            </Grid>
                            <Grid item md={4} xs={12} sx={{
                                marginTop: {
                                    xs: '50px',
                                    md: '0px'
                                }
                            }}>
                                <Box className="shop-widget">
                                    <WidgetSearch></WidgetSearch>
                                    <WidgetBranding></WidgetBranding>
                                    <WidgetPrice></WidgetPrice>
                                    <WidgetSize></WidgetSize>
                                    <WidgetCategories></WidgetCategories>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default Shop;