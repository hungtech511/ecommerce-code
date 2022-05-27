import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ButtonApp from '../ButtonApp/ButtonApp';
import './UpComingProduct.css';
import backgroundProduct from './bg.jpg';
import UpComingItem from './UpComingItem/UpComingItem';
import Countdown from './Countdown/Countdown';
import CirclePlus from './CirclePlus/CirclePlus';

function UpComingProduct(props) {
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    const actualTime = new Date(Date.now());
    const endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
    const timeRemaining = new Date(endOfDay.getTime() - actualTime.getTime()).getTime();


    let interval;

    const startTimer = () => {
        interval = setInterval(() => {
            let days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000)).toString().padStart(2, "0");
            let hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)).toString().padStart(2, "0");
            let minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (1000 * 60)).toString().padStart(2, "0");
            let seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000).toString().padStart(2, "0");

            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);

        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(interval)
    }, [timerDays, timerHours, timerMinutes, timerSeconds]);

    return (
        <div className="upcoming-product-area" style={{ background: `url(${backgroundProduct}) no-repeat center center/cover` }}>
            <CirclePlus circleNumber="one"></CirclePlus>
            <CirclePlus circleNumber="two"></CirclePlus>
            <CirclePlus circleNumber="three"></CirclePlus>
            <Container sx={{ maxWidth: { md: 1755 } }}>
                <Grid container spacing={2} sx={{
                    justifyContent: {
                        md: 'flex-start',
                        lg: 'flex-end',
                        xl: 'flex-end'
                    }
                }}>
                    <Grid item xl={6} sm={12}>
                        <Box className="upcoming-product">
                            <span className="product-price">$500.00</span>
                            <h2 className="hover-title green-color"><Link to="/shop">Lodge Flush Mount</Link></h2>
                            <Box className="upcoming-info">
                                <UpComingItem firstText="Origin From" secondText="Sweden"></UpComingItem>
                                <UpComingItem firstText="Material" secondText="Aluminum"></UpComingItem>
                                <UpComingItem firstText="Designer" secondText="Basictheme"></UpComingItem>
                            </Box>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
                            <Box className="group-btn">
                                <ButtonApp value="Shop Now" classColor="orange-btn" direction="/shop"></ButtonApp>
                                <ButtonApp value="Details" classColor="white-btn" direction="/shop"></ButtonApp>
                            </Box>
                            <Countdown timerDays={timerDays} timerHours={timerHours} timerMinutes={timerMinutes} timerSeconds={timerSeconds}></Countdown>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default UpComingProduct;