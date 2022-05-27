import React from 'react';
import Box from '@mui/material/Box';

import { useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { CommentBlogAction } from '../Slice/CommentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function BlogComments(props) {
    const user = JSON.parse(localStorage.getItem('login'));
    const dispatch = useDispatch();
    let myID = useParams();

    const onSubmit = async (data) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const today = new Date();
        let date = `${monthNames[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
        let time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0") + ":" + today.getSeconds().toString().padStart(2, "0");
        let dateTime = date + ' ' + time;

        const userComment = {
            idPost: myID.blogID,
            fullName: user.fullName,
            comment: data.comment,
            date: dateTime
        }

        try {
            const action = CommentBlogAction(userComment)
            const originalPromiseResult = await dispatch(action);
            const comment = unwrapResult(originalPromiseResult);

            toast.success(`Successful Post`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            toast.error(`Error Post`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        window.location.reload();
    };

    const schema = yup.object().shape({
        comment: yup.string().required("Vui lòng nhập comment")
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <Box className="post-comment-title">
                <h2>Post Comments</h2>
            </Box>
            <form className="contact-post-form" onSubmit={handleSubmit(onSubmit)}>
                <Box className="text-review">
                    <Box className="contact-icon contact-message">
                        <textarea placeholder="Your comment..." name="message" id="message" cols="30" rows="10"  {...register("comment", { required: true })}></textarea>
                        <p>{errors.comment?.message}</p>
                    </Box>
                    <button type="submit" className="btn-app orange-btn">Add your comment</button>
                </Box>
            </form >
        </>
    );
}

export default BlogComments;