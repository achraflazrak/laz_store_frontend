import React from 'react';

export default function Spinner() {
    return (
        <div className='d-flex justify-content-center my-5'>
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
  )
}
