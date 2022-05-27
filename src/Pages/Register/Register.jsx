import React, { useState, useEffect } from 'react';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../../Components/Slice/RegisterSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ecomApi from '../../Api/ecomApi'
import './Register.css'
import ButtonApp from '../../Components/ButtonApp/ButtonApp';



function Register(props) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const users = await ecomApi.getUsers();
            setUsers(users.data)
        }
        getUsers();
    }, [])

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const onSubmit = async (data) => {

        const userData = {
            fullName: data.fullName,
            userName: data.userName,
            email: data.email,
            password: data.password,
        }

        let hasEmail = users && Object.values(users).some(i => i.email === userData.email);
        let hasUser = users && Object.values(users).some(i => i.userName === userData.userName)
        let notification;

        if (hasEmail || hasUser) {
            if (hasEmail && hasUser) {
                notification = 'Email and username is exist in database, please use another email and username'
            } else if (hasUser) {
                notification = 'Username is exist in database, please use another username'
            } else {
                notification = 'Email is exist in database, please use another email'
            }
            toast.error(notification, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else {
            // If there's no user in database then add it and announce it
            try {
                const action = RegisterAction(userData)
                const originalPromiseResult = await dispatch(action);
                const user = unwrapResult(originalPromiseResult);
                toast.success(`Successful Register`, {
                    position: "top-left",
                    theme: 'colored',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate('/login')
            } catch (error) {
                console.log('error', error);
            }
        }

    }

    const schema = yup.object().shape({
        fullName: yup.string().required("Please enter a fullname").test(
            'Enter 2 words', "Please enter 2 words", (value) => {
                return value.split(" ").length >= 2;
            }
        ),
        userName: yup.string().required("Please enter a username").test(
            'Username must not have space', "Username must not have space", (value) => {
                return value.split(" ").length === 1;
            }
        ),
        email: yup.string().required("Please enter a email").test(
            'Invalid email', "Invalid email", (value) => {
                // validate email, copy regex
                let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return value.match(mailFormat);
            }
        ),
        password: yup.string().required("Please enter a password").test(
            'Password must have more than 8 values', "Password must have more than 8 values", (value) => {
                return value.length > 8;
            }
        ),
        retypePassword: yup.string().required("Please enter a confirm password").oneOf([yup.ref("password")], "Password is not match"),
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <Nav />
            <FeatureTitle title="Register" page="Register" />
            <Box className="form-area">
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item md={9} xs={12}>
                                <Box className="basic-login">
                                    <h3>Signup From Here</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <Box className="text-field">
                                            <label htmlFor="fullname">Full Name <span className="required">*</span></label>
                                            < input type="text" label="Full Name" placeholder="Enter fullname..."  {...register("fullName", { required: true })}></ input >
                                            <p>{errors.fullName?.message}</p>
                                        </Box>
                                        <Box className="text-field">
                                            <label htmlFor="username">Username <span className="required">*</span></label>
                                            <input type="text" label="User Name" placeholder="Enter username..." {...register("userName", { required: true })}></input >
                                            <p>{errors.userName?.message}</p>
                                        </Box>
                                        <Box className="text-field">
                                            <label htmlFor="email">Email <span className="required">*</span></label>
                                            <input type="text" label="Email" placeholder="Enter email..." {...register("email", { required: true })}></input >
                                            <p>{errors.email?.message}</p>
                                        </Box>
                                        <Box className="text-field">
                                            <label htmlFor="password">Password <span className="required">*</span></label>
                                            <input type="password" label="Password" placeholder="Enter password..."  {...register("password", { required: true })}></input >
                                            <p>{errors.password?.message}</p>
                                        </Box>
                                        <Box className="text-field">
                                            <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                                            <input type="password" label="Re-type Password" placeholder="Enter confirm password..."  {...register("retypePassword", { required: true })}></input >
                                            <p>{errors.retypePassword?.message}</p>
                                        </Box>
                                        <button type="submit" className="btn-app green-btn">Register</button>
                                        <div className="or-divide"><span>or</span></div>
                                        <ButtonApp classColor="orange-btn" value="Login" direction="/login"></ButtonApp>
                                    </form >
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default Register;