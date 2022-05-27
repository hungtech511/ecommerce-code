import { configureStore } from '@reduxjs/toolkit';
import brandingSlice from '../Components/Slice/BrandingSlice';
import cartSlice from '../Components/Slice/CartSlice';
import categoriesSlice from '../Components/Slice/CategoriesSlice';
import priceSlice from '../Components/Slice/PriceSlice';
import searchSlice from '../Components/Slice/SearchSlice';
import sizeSlice from '../Components/Slice/SizeSlice';
import sortSlice from '../Components/Slice/SortSlice';
import wishlistSlice from '../Components/Slice/WishlistSlice';
import compareSlice from '../Components/Slice/CompareSlice';
import ModalSlice from '../Components/Slice/ModalSlice';
import RegisterSlice from '../Components/Slice/RegisterSlice';
import LoginSlice from '../Components/Slice/LoginSlice';
import CommentSlice from '../Components/Slice/CommentSlice';



const rootReducer = {
    search: searchSlice,
    price: priceSlice,
    branding: brandingSlice,
    size: sizeSlice,
    categories: categoriesSlice,
    sort: sortSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    compare: compareSlice,
    modal: ModalSlice,
    register: RegisterSlice,
    login: LoginSlice,
    comment: CommentSlice
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;