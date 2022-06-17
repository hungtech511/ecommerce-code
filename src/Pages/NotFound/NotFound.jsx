import React from 'react';
import './NotFound.css'

function NotFound(props) {
    return (
        <>
            <div className='not-found'>
                <h1>404</h1>
                <div>
                    <p>This page could not be found.</p>
                    <p>                Return to <a href="/">Home</a></p>
                </div>
            </div>
        </>
    );
}

export default NotFound;