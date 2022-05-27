import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalData: {},
        isOpen: false
    },
    reducers: {
        getDataToModal: (state, action) => {
            state.modalData = action.payload
        },
        openModal: (state, action) => {
            state.isOpen = true;
        },
        closeModal: (state, action) => {
            state.isOpen = false
        }
    },
})
export const { getDataToModal, openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
