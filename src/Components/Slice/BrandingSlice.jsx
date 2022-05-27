import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const brandingSlice = createSlice({
    name: 'branding',
    initialState: {
        brandingData: []
    },
    reducers: {
        brandingItem: (state, action) => {
            state.brandingData = action.payload
        }
    },
})
export const { brandingItem } = brandingSlice.actions

export default brandingSlice.reducer
