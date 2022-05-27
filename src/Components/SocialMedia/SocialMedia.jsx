import React from 'react';
import './SocialMedia.css';

function SocialMedia({ typeColor }) {
    return (
        <div className={`social-media ${typeColor}`}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-vimeo-v"></i></a>
        </div>
    );
}

export default SocialMedia;