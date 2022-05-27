import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: localStorage.getItem('AddToWishlist') ? JSON.parse(localStorage.getItem('AddToWishlist')) : [],
    },
    reducers: {
        addToWishlist: (state, action) => {

            const newItem = action.payload;
            const index = state.wishlist.findIndex(x => x.id === newItem.id)

            if (index === -1) {
                state.wishlist.push(newItem);
            }
            toast.success(`Add item to wishlist`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToWishlist', JSON.stringify(state.wishlist))
        },
        removeItem: (state, action) => {
            const newItem = action.payload;

            const filterItem = state.wishlist.filter(item => item.id !== newItem.id);

            state.wishlist = filterItem;
            toast.error(`Remove item from wishlist`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToWishlist', JSON.stringify(state.wishlist))
        }
    },
})
export const { addToWishlist, removeItem } = wishlistSlice.actions

export default wishlistSlice.reducer
