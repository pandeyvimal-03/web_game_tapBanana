import React from 'react'

import Spinner from '../../assets/images/spinner.png';

const Loader = () => {
    return (
        <div className='loader-container'>
            <img alt="Loading..." className='loader' src={Spinner} />
        </div>
    );
}

export default Loader;
