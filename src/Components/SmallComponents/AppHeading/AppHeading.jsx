import React from 'react';
import './AppHeading.css';

function AppHeading(props) {
    const { headingText } = props;
    return (
        <div className="app-heading">
            <h2>{headingText}</h2>
            <p>Browse the huge variety of our products</p>
        </div>
    );
}

export default AppHeading;