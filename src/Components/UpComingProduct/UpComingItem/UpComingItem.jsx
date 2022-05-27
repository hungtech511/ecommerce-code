import React from 'react';
import './UpComingItem.css';

function UpComingItem(props) {
    const { firstText, secondText } = props;
    return (
        <div className="upcoming-item">
            <i className="fal fa-layer-group"></i>
            <div>
                <h4>{firstText}</h4>
                <span>{secondText}</span>
            </div>
        </div>
    );
}

export default UpComingItem;