import React from 'react';

function Error(props) {
    return (
        <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
            <h2 className='display-3'>404</h2>
            <p className='lead'> Page not found</p>
        </div>
    );
}

export default Error;