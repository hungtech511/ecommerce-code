import React from 'react';
import Box from '@mui/material/Box';

function WidgetFeed() {
    const feeds = ['popular', 'design', 'usability', 'develop', 'consult', 'icon', 'html', 'ux', 'business', 'kit', 'keyboard', 'tech'];
    return (
        <Box className="widget">
            <Box className="widget-title-box">
                <h3 className="widget-title">Instagram Feeds</h3>
            </Box>
            <Box className="feeds">
                {
                    feeds.map((feed, i) => {
                        return (
                            <a key={i} href="#!">
                                {feed}
                            </a>
                        )
                    })
                }
            </Box>
        </Box>
    );
}

export default WidgetFeed;