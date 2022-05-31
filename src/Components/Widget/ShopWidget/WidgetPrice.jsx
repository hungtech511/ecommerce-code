import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { priceItem } from '../../Slice/PriceSlice';
import Slider from '@mui/material/Slider';

import './ShopWidget.css';

function PriceWidget(props) {
    const dispatch = useDispatch();
    const valueRange = useSelector((state) => state.price.priceData)
    const [value, setValue] = useState(valueRange)

    const handlePrice = (event, newValue) => {
        setValue(newValue)
        const action = priceItem(newValue);
        dispatch(action)

    };
    return (
        <div className="slider-widget widget">
            <h3 className="shop-title">Filter selection</h3>
            <Box>
                <Slider
                    className="price-range"
                    min={0}
                    max={1000}
                    value={value}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                />
                <span>${value[0]} - </span>
                <span>${value[1]}</span>
            </Box>
        </div>
    );
}

export default PriceWidget;