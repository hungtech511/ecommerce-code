import React from 'react';
import { Link } from "react-router-dom";
import './ButtonApp.css'


function ButtonApp(props) {
    const { value, classColor, direction } = props;
    return (
        <>
            {direction ? <Link to={`${direction}`} className={`btn-app ${classColor}`}> {value}</Link > : <Link to="/#!" className={`btn-app ${classColor}`}>{value}</Link>}
        </>

    );
}

export default ButtonApp;