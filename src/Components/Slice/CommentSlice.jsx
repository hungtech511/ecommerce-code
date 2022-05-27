import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'



// First, create the thunk
export const CommentProductAction = createAsyncThunk(
    'products/comment',
    async (payload) => {
        await fetch(`https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Products/${payload.idPost}/comments.json`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const response = await fetch(`https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Products/${payload.idPost}/comments.json`);
        let comments = await response.json();

        return comments;
    }
)

export const CommentBlogAction = createAsyncThunk(
    'blog/comment',
    async (payload) => {
        await fetch(`https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Posts/${payload.idPost}/comments.json`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const response = await fetch(`https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/Posts/${payload.idPost}/comments.json`);
        let comments = await response.json();

        return comments;
    }
)


const LoginSlice = createSlice({
    name: "login",
    initialState: {
        productComment: {},
        blogComment: {}
    },
    extraReducers: {
        [CommentProductAction.fulfilled]: (state, action) => {
            state.productComment = action.payload
        },
        [CommentBlogAction.fulfilled]: (state, action) => {
            state.blogComment = action.payload
        }
    }
})



export default LoginSlice.reducer