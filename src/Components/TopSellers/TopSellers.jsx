import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import AppHeading from '../SmallComponents/AppHeading/AppHeading';
import ButtonApp from '../ButtonApp/ButtonApp';
import './TopSellers.css';
import firstSeller from './banner1.jpg';
import secondSeller from './banner2.jpg';

function TopSellers(props) {
    return (
        <Box className="top-seller">
            <Container sx={{ maxWidth: { md: 1755 } }}>
                <Box className="top-seller-wrapper">
                    <Box>
                        <Grid container sx={{
                            marginBottom: {
                                xs: '50px',
                                md: '0px'
                            }
                        }}>
                            <Grid item sm={5} xs={12}>
                                <Box sx={{
                                    marginBottom: {
                                        xs: '30px',
                                        md: '50px',
                                    }
                                }}>
                                    <AppHeading headingText="Top Sellers"></AppHeading>
                                </Box>
                            </Grid>
                            <Grid item sm={7} xs={12}>
                                <Box sx={{
                                    textAlign: {
                                        sm: 'right',
                                        md: 'right'
                                    }
                                }} className="top-seller-right">
                                    <ButtonApp value="Collection" classColor="orange-btn" direction="/shop"></ButtonApp>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={5} xs={12}>
                                <Box className="top-seller-left">
                                    <img src={firstSeller} alt="seller" />
                                    <Box className="seller-box">
                                        <Box className="seller-box-content">
                                            <Typography variant="h2" className="hover-title red-color heading" sx={{
                                                fontSize: {
                                                    xs: '25px',
                                                    sm: '40px'
                                                }
                                            }}><Link to="/shop">Minimal Home Decor</Link></Typography>
                                            <Box className="pro-price">
                                                <span>$207.00 USD</span>
                                                <span className="old-price">$230.00 USD</span>
                                            </Box>
                                            <ButtonApp value="Shop Now" classColor="orange-btn" direction="/shop"></ButtonApp>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <Box className="top-seller-right">
                                    <img src={secondSeller} alt="seller" />
                                    <Box className="seller-box">
                                        <Box className="seller-box-content-2">
                                            <Typography variant="h2" className="hover-title red-color heading" sx={{
                                                fontSize: {
                                                    xs: '25px',
                                                    sm: '40px',
                                                    xl: '80px'
                                                }
                                            }}><Link to="/shop">Xcross Comoer Furniture</Link></Typography>
                                            <Box className="pro-price">
                                                <span>$207.00 USD</span>
                                                <span className="old-price">$230.00 USD</span>
                                            </Box>
                                            <ButtonApp value="View Details" classColor="green-btn" direction="/shop"></ButtonApp>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default TopSellers;