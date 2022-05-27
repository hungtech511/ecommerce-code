import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import logo from '../Nav/logo.png';
import banner from './footer-banner.jpg';
import time from './time.png';
import './Footer.css'

function Footer(props) {
    return (
        <footer>
            <Container sx={{ maxWidth: { md: 1755 } }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item md={3} xs={12}>
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <a href="#"><img src={logo} alt="logo" /></a>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore mag na aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <div className="footer-time">
                                    <div className="time-icon">
                                        <img src={time} alt="time" />
                                    </div>
                                    <div className="time-text">
                                        <Typography component="span" sx={{ color: `#747691`, marginBottom: 5, fontSize: 14 }} >Got Questions ? Call us 24/7!</Typography>
                                        <Typography sx={{ fontWeight: 300, fontSize: 30 }} component="h2">(0600) 874 548</Typography></div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Box className="footer-widget" sx={{
                                marginLeft: {
                                    xs: 0,
                                    md: '50px'
                                }
                            }}>
                                <h3>Social Media</h3>
                                <ul className="footer-link">
                                    <li><a href="#">Facebook</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Behance</a></li>
                                    <li><a href="#"> Dribbble</a></li>
                                    <li><a href="#">Linkedin</a></li>
                                    <li><a href="#">Youtube</a></li>
                                </ul>
                            </Box>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Box className="footer-widget" sx={{
                                marginLeft: {
                                    xs: 0,
                                    md: '30px'
                                }
                            }}>
                                <h3>Location</h3>
                                <ul className="footer-link">
                                    <li><a href="#">New York</a></li>
                                    <li><a href="#">Tokyo</a></li>
                                    <li><a href="#">Dhaka</a></li>
                                    <li><a href="#"> Chittagong</a></li>
                                    <li><a href="#">China</a></li>
                                    <li><a href="#">Japan</a></li>
                                </ul>
                            </Box>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <div className="footer-widget">
                                <h3>Social Media</h3>
                                <ul className="footer-link">
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#"> Privacy Policy</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Wholesale</a></li>
                                    <li><a href="#">Direction</a></li>
                                </ul>
                            </div>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <div className="footer-widget">
                                <div className="footer-banner">
                                    <img src={banner} alt="" />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Box className="footer-bottom">
                        <Grid container>
                            <Grid item md={6}>
                                <Box className="copyright">
                                    <p>Copyright © 2021 <a href="#">BasicTheme</a>. All Rights Reserved</p>
                                </Box>
                            </Grid>
                            <Grid item md={6} sx={{
                                marginLeft: {
                                    xs: 0,
                                    md: 'auto'
                                }
                            }}>
                                <Box sx={{ textAlign: 'right' }} className="footer-icon">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-behance"></i></a>
                                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;