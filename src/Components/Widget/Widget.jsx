import React from 'react';
import Grid from '@mui/material/Grid';

import './Widget.css';

import WidgetAboutMe from './WidgetAboutMe';
import WidgetRecentPost from './WidgetRecentPost';
import WidgetCategory from './WidgetCategory';
import WidgetSocial from './WidgetSocial';
import WidgetFeed from './WidgetFeed';
import WidgetBanner from './WidgetBanner';

function Widget({ totalBlogs }) {
    return (
        <Grid item md={4} xs={12}>
            <WidgetAboutMe />
            <WidgetRecentPost />
            <WidgetCategory />
            <WidgetSocial />
            <WidgetFeed />
            <WidgetBanner />
        </Grid>
    );
}

export default Widget;