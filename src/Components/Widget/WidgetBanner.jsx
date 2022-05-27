import React from 'react';
import Box from '@mui/material/Box';
import banner from './banner.jpg';

function WidgetBanner(props) {
    return (
        <Box>
            <Box className="banner-widget">
                <a href="#!">
                    <img src={banner} alt="banner" />
                </a>
            </Box>
        </Box>
    );
}

export default WidgetBanner;