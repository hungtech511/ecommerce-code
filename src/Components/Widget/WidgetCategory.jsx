import React from 'react';
import Box from '@mui/material/Box';

function WidgetCategory(props) {
    const category = [
        {
            name: 'Lifestyle',
            total: 78
        },
        {
            name: 'Travel',
            total: 42
        },
        {
            name: 'Fashion',
            total: 32
        },
        {
            name: 'Music',
            total: 85
        },
        {
            name: 'Branding',
            total: 5
        }
    ];
    return (
        <Box className="widget">
            <Box className="widget-title-box">
                <h3 className="widget-title">Categories</h3>
            </Box>
            <ul className="category">
                {
                    category.map((cat, i) => {
                        return (
                            <li key={i}>
                                <a href="#!">
                                    {cat.name}
                                    <span>{cat.total.toString().padStart(2, "0")}</span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </Box>
    );
}

export default WidgetCategory;