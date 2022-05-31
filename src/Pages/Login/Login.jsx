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
import { LoginAction } from '../../Components/Slice/LoginSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ecomApi from '../../Api/ecomApi';
import ButtonApp from '../../Components/ButtonApp/ButtonApp';

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([])
    const loginSuccesful = localStorage.getItem('login');

    if (loginSuccesful) {
        navigate('/')
    }

    useEffect(() => {
        const getUsers = async () => {
            const users = await ecomApi.getUsers();
            setUsers(users.data)
        }
        getUsers();
    }, [])


    const onSubmit = async (data) => {
        const userData = {
            userName: data.userName,
            password: data.password,
        }
        let hasUser = users && Object.values(users).some(i => i.userName === userData.userName)
        const action = LoginAction(userData);
        const originalPromiseResult = await dispatch(action);
        const user = unwrapResult(originalPromiseResult);

        if (!hasUser) {
            toast.error(`Username does not exist, please register`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.success(`Successful Login`, {
                position: "top-left",
                theme: 'colored',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate('/')
        }
    }
    const schema = yup.object().shape({
        userName: yup.string().required("Please enter a username").test(
            'Username must not have space', "Username must not have space", (value) => {
                return value.split(" ").length === 1;
            }
        ),
        password: yup.string().required("Please enter a password").test(
            'Password must have more than 8 values', "Password must have more than 8 values", (value) => {
                return value.length > 8;
            }
        ),
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    return (
        <>
            <Nav />
            <FeatureTitle title="Login" page="Login" />
            <Box className="form-area">
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item md={9} xs={12}>
                                <Box className="basic-login">
                                    <h3>Login From Here</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <Box className="text-field">
                                            <label htmlFor="username">Username <span className="required">*</span></label>
                                            <input type="text" label="User Name" placeholder="Enter username..." {...register("userName", { required: true })}></input >
                                            <p>{errors.userName?.message}</p>
                                        </Box>
                                        <Box className="text-field">
                                            <label htmlFor="password">Password <span className="required">*</span></label>
                                            <input type="password" label="Password" placeholder="Enter password..."  {...register("password", { required: true })}></input >
                                            <p>{errors.password?.message}</p>
                                        </Box>
                                        <button type="submit" className="btn-app green-btn">Login now</button>
                                        <div className="or-divide"><span>or</span></div>
                                        <ButtonApp classColor="orange-btn" value="register now" direction="/register"></ButtonApp>
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

export default Login;