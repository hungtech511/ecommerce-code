import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// First, create the thunk

export const RegisterAction = createAsyncThunk(

    'users/register',
    async (payload) => {

        await fetch('https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const response = await fetch("https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json");
        let users = await response.json();
        let arrUsers = Object.keys(users);
        let lastUserRegister = arrUsers[arrUsers.length - 1];



        const registerResponse = await fetch(` https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Users/${lastUserRegister}.json`);
        const userData = await registerResponse.json();


        localStorage.setItem("register", JSON.stringify(userData));

        return userData;
    }
)

const RegisterSlice = createSlice({
    name: "register",
    initialState: {
        currentUser: {

        }
    },
    extraReducers: {
        [RegisterAction.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export default RegisterSlice.reducer