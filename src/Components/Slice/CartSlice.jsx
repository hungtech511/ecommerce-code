import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('AddToCart') ? JSON.parse(localStorage.getItem('AddToCart')) : [],
        total: 0,
        totalPriceProducts: localStorage.getItem('TotalAmount') ? JSON.parse(localStorage.getItem('TotalAmount')) : 0,
    },
    reducers: {
        addToCart: (state, action) => {

            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id)
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity
            } else {
                state.cartItems.push(newItem);
            }
            toast.success(`Add item to cart`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
            localStorage.setItem('TotalAmountProduct', JSON.stringify(state.totalPriceProducts))
        },
        setTotal: state => {
            state.total = state.cartItems.reduce((count, item) => count + item.quantity, 0)
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
        },
        setTotalPrice: state => {
            state.totalPriceProducts = state.cartItems.reduce((count, item) => count + item.totalPrice, 0)
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
            localStorage.setItem('TotalAmountProduct', JSON.stringify(state.totalPriceProducts))
        },
        decreaseByOne: (state, action) => {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id)
            if (state.cartItems[index].quantity > 1) {
                state.cartItems[index].quantity -= 1;
                state.cartItems[index].totalPrice = state.cartItems[index].product.sale ? state.cartItems[index].quantity * state.cartItems[index].product.salePrice : state.cartItems[index].quantity * state.cartItems[index].product.price
                toast.error(`Remove 1 item`, {
                    position: "top-left",
                    theme: 'colored',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
            localStorage.setItem('TotalAmountProduct', JSON.stringify(state.totalPriceProducts))
        },
        increaseByOne: (state, action) => {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id)
            if (index >= 0) {
                state.cartItems[index].quantity += 1;
                state.cartItems[index].totalPrice = state.cartItems[index].product.sale ? state.cartItems[index].quantity * state.cartItems[index].product.salePrice : state.cartItems[index].quantity * state.cartItems[index].product.price
            } else {
                const addOneProduct = { id: newItem.id, product: { ...newItem }, quantity: 1, totalPrice: newItem.sale ? newItem.salePrice : newItem.price }
                state.cartItems.push(addOneProduct);
            }
            toast.success(`Add 1 item`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
            localStorage.setItem('TotalAmountProduct', JSON.stringify(state.totalPriceProducts))
        },
        removeItem: (state, action) => {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id)

            const filterItem = state.cartItems.filter(item => item.id !== newItem.id);

            if (index >= 0) {
                state.totalPriceProducts -= state.cartItems[index].totalPrice;
                localStorage.setItem('TotalAmountProduct', JSON.stringify(state.totalPriceProducts))
            }
            state.cartItems = filterItem;
            toast.error(`Remove item`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToCart', JSON.stringify(state.cartItems))
        }
    },
})
export const { addToCart, setTotal, setTotalPrice, decreaseByOne, increaseByOne, removeItem } = cartSlice.actions

export default cartSlice.reducer
