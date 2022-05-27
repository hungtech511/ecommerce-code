import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './Newsletter.css'
import ButtonApp from '../ButtonApp/ButtonApp';
import Subscribe from './subscribe.png';


function Newsletter() {
    return (
        <div className="newsletter">
            <Container sx={{
                maxWidth: { md: 1755 },
                padding: {
                    xs: 0
                }
            }}>
                <div className="newsletter-wrapper">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid sx={{ alignItems: 'center' }} container spacing={2}>
                            <Grid item lg={5} xs={12}>
                                <div className="subscribe d-flex fix">
                                    <div className="subscribe-icon">
                                        <img src={Subscribe} alt="" />
                                    </div>
                                    <div className="area-title">
                                        <h2>Newsletter</h2>
                                        <p>Subsribe here for get every single updates</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={7} xs={12}>
                                <div className="subscribe-form">
                                    <div className="subscribe-form-wrapper">
                                        <form action="#">
                                            <input type="text" placeholder="Enter your email address" />
                                            <ButtonApp value="Subscribe now" classColor="orange-btn"></ButtonApp>
                                        </form>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container>
        </div>
    );
}

export default Newsletter;