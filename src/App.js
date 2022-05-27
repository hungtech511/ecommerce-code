import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './Responsive.css';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home/Home';
import Blogs from './Pages/Blogs/Blogs';
import BlogDetail from '../src/Components/BlogDetail/BlogDetail';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Products from './Pages/Products/Products';
import Contact from './Pages/Contact/Contact';
import Shop from './Pages/Shop/Shop';
import Cart from './Pages/Cart/Cart';
import LinkToWishlist from './Components/SmallComponents/LinkToWishlist/LinkToWishlist';
import Wishlist from './Pages/Wishlist/Wishlist';
import LinkToCompare from './Components/SmallComponents/LinkToCompare/LinkToCompare';
import Compare from './Pages/Compare/Compare';

import { useSelector } from 'react-redux'
import ModalView from '../src/Components/ModalView/ModalView';
import ButtonScrollToTop from './Components/SmallComponents/ButtonScrollToTop/ButtonScrollToTop';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';



function App() {

  const modalOpen = useSelector((state) => state.modal.isOpen);
  const modalData = useSelector((state) => state.modal.modalData);


  return (

    <div className="App">
      <LinkToWishlist></LinkToWishlist>
      <LinkToCompare></LinkToCompare>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blogs" exact element={<Blogs />} />
        <Route path="/blog/:blogID" exact element={<BlogDetail />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/products" exact element={<Products />} />
        <Route path="/details/:productID" exact element={<ProductDetail />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/compare" exact element={<Compare />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />

      </Routes>
      {modalOpen && <ModalView toggleModal={modalOpen} item={modalData}></ModalView>}
      <ButtonScrollToTop></ButtonScrollToTop>
    </div>

  );
}

export default App;
