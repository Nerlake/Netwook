import React from 'react'
import './error.css'

export default function Error({ error }) {
    return (
        <div className='error_container'>
            <h2>Error {error}</h2>
            <h5>Page not found</h5>
        </div>
    )
}
