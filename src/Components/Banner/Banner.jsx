import React from 'react';
import {
    Link
} from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BannerImage from './BannerImage/BannerImage';
import firstBanner from './banner1.jpg';
import secondBanner from './banner2.jpg';
import thirdBanner from './banner3.jpg';


function Banner(props) {
    return (
        <div className="banner">
            <Container sx={{ maxWidth: { md: 1874 } }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid sx={{ alignItems: 'center' }} container spacing={{
                        sm: 2,
                        md: 5
                    }}>
                        <Grid item xl={4} md={4} sm={12}>
                            <Link to="/shop"><BannerImage imgSrc={firstBanner}></BannerImage></Link>
                        </Grid>
                        <Grid item xl={4} md={4} sm={12}>
                            <Link to="/shop"><BannerImage imgSrc={secondBanner}></BannerImage></Link>
                        </Grid>
                        <Grid item xl={4} md={4} sm={12}>
                            <Link to="/shop"><BannerImage imgSrc={thirdBanner}></BannerImage></Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Banner;