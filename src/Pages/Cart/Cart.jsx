import React from 'react';
import Nav from '../../Components/Nav/Nav';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import CartTable from '../../Components/CartTable/CartTable';
import Footer from '../../Components/Footer/Footer';

function Cart(props) {
    return (
        <>
            <Nav></Nav>
            <FeatureTitle title="Shopping Cart" page="Cart" />
            <CartTable></CartTable>
            <Footer></Footer>
        </>
    );
}

export default Cart;