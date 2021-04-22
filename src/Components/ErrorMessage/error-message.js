import React from 'react';
import './error-message.css';
import ErrorImg from './img/error.png';

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <img className='error-img' src={ErrorImg} alt="Error" />
            <span className='error-title'>Error</span>
        </div>
    )
}

export default ErrorMessage;