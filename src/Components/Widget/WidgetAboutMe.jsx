import React from 'react';

import Box from '@mui/material/Box';
import SocialMedia from '../SocialMedia/SocialMedia';
import author from './author.png'

function WidgetAboutMe(props) {
    return (
        <Box className="widget">
            <Box className="widget-title-box">
                <h3 className="widget-title">About Me</h3>
            </Box>
            <Box sx={{ textAlign: 'center' }} className="about-me">
                <img src={author} alt="author" />
                <h4>MD. Salim Rana</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <SocialMedia typeColor="dark-text"></SocialMedia>
            </Box>
        </Box>
    );
}

export default WidgetAboutMe;