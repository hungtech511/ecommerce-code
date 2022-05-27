import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const priceSlice = createSlice({
    name: 'price',
    initialState: {
        priceData: [0, 1000]
    },
    reducers: {
        priceItem: (state, action) => {
            state.priceData = action.payload
        }
    },
})
export const { priceItem } = priceSlice.actions

export default priceSlice.reducer
