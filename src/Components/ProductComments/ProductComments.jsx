import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { CommentProductAction } from '../Slice/CommentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import './ProductComments.css'
import Box from '@mui/material/Box';

function ProductComments(props) {
    const user = JSON.parse(localStorage.getItem('login'));
    let myID = useParams();

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const today = new Date();
        let date = `${monthNames[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
        let time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0") + ":" + today.getSeconds().toString().padStart(2, "0");
        let dateTime = date + ' ' + time;

        const userComment = {
            idPost: myID.productID,
            fullName: user.fullName,
            comment: data.comment,
            date: dateTime
        }

        try {
            const action = CommentProductAction(userComment)
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
        <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
            <Box className="text-review">
                <label>YOUR REVIEW</label>
                <textarea name="message" id="message" cols="30" rows="10"  {...register("comment", { required: true })}></textarea>
                <p>{errors.comment?.message}</p>
            </Box>
            <button type="submit" className="btn-app orange-btn">Add your review</button>
        </form >

    );
}
export default ProductComments;