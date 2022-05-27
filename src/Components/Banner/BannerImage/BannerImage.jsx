import React from 'react';
import './BannerImage.css';

function BannerImage(props) {
    const { imgSrc } = props
    return (
        <div className="banner-image">
            <img src={imgSrc} alt="banner-image" />
        </div>
    );
}

export default BannerImage;