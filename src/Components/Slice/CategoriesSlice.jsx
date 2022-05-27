import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoriesData: []
    },
    reducers: {
        categoriesItem: (state, action) => {
            state.categoriesData = action.payload
        }
    },
})
export const { categoriesItem } = categoriesSlice.actions

export default categoriesSlice.reducer
