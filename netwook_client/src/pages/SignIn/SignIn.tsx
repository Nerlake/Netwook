import React from 'react'
import './signin.css'

export default function SignIn() {
  return (
    <div className='signin'>
        <div className="signin_container">
            <div className="signin_logo">NetWook</div>
                            <p className='signin_description'>Welcome to your social network</p>
            <div className="signin_form">

                <input type="text" placeholder='Email' className='signin_input'/>
                <input type="password" placeholder='Password' className='signin_input' />
                <button className='signin_button'>Log In</button>
                <span className='signin_signup_button'>Sign Up</span>
            </div>
        </div>
    </div>
  )
}
