import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sortSlice = createSlice({
    name: 'size',
    initialState: {
        sortData: 'all'
    },
    reducers: {
        sortItem: (state, action) => {
            state.sortData = action.payload
        }
    },
})
export const { sortItem } = sortSlice.actions

export default sortSlice.reducer
