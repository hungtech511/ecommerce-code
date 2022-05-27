import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchData: ''
    },
    reducers: {
        searchItem(state, action) {
            state.searchData = action.payload
        }
    },
})
export const { searchItem } = searchSlice.actions

export default searchSlice.reducer