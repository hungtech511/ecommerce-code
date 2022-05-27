import React from 'react';
import './CirclePlus.css';

function CirclePlus(props) {
    const { circleNumber } = props;
    return (
        <div className={`circle-plus ${circleNumber}`}>
            <div className="circle-icon">
                <i className="fal fa-plus"></i>
            </div>
            <div className="circle-text">
                <p>Lodge Flush Mount</p>
            </div>
        </div>
    );
}

export default CirclePlus;