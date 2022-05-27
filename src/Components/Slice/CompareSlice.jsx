import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        compare: localStorage.getItem('AddToCompare') ? JSON.parse(localStorage.getItem('AddToCompare')) : [],
    },
    reducers: {
        addToCompare: (state, action) => {

            const newItem = action.payload;
            const index = state.compare.findIndex(x => x.id === newItem.id)

            if (index === -1) {
                state.compare.push(newItem);
            }
            toast.success(`Add item to compare`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToCompare', JSON.stringify(state.compare))
        },
        removeCompareItem: (state, action) => {
            const newItem = action.payload;

            const filterItem = state.compare.filter(item => item.id !== newItem.id);

            state.compare = filterItem;
            toast.error(`Remove item from compare`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            localStorage.setItem('AddToCompare', JSON.stringify(state.compare))
        }
    },
})
export const { addToCompare, removeCompareItem } = compareSlice.actions

export default compareSlice.reducer
