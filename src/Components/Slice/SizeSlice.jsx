import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sizeSlice = createSlice({
    name: 'size',
    initialState: {
        sizeData: []
    },
    reducers: {
        sizeItem: (state, action) => {
            state.sizeData = action.payload
        }
    },
})
export const { sizeItem } = sizeSlice.actions

export default sizeSlice.reducer
