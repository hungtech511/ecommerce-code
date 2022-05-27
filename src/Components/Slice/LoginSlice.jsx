import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'



// First, create the thunk
export const LoginAction = createAsyncThunk(
    'users/login',
    async (payload) => {
        const response = await fetch("https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json");

        let users = await response.json();
        let arr = [];

        for (let i in users) {
            arr.push(users[i]);
        }

        const userData = arr.filter(user => {
            return user.userName === payload.userName && user.password === payload.password
        })

        if (userData.length > 0) {
            localStorage.setItem('login', JSON.stringify(userData[0]));
        }

        return userData[0];
    }
)


const LoginSlice = createSlice({
    name: "login",
    initialState: {
        currentUser: localStorage.getItem('login') || {}
    },
    extraReducers: {
        [LoginAction.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        }
    }
})



export default LoginSlice.reducer