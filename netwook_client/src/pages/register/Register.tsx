import React from 'react'
import './register.css'

export default function Register() {
  return (
    <div className='register'>
      <div className="register_container">
        <div className="register_logo">NetWook</div>
          <p className='register_description'>Welcome to your social network</p>
        <div className="register_form">
          <input type="text" placeholder='First name' className='register_input'/>
          <input type="text" placeholder='Name' className='register_input'/>
          <input type="text" placeholder='Email' className='register_input'/>
          <input type="password" placeholder='Password' className='register_input' />
          <input type="password" placeholder='Repeat password' className='register_input' />
          <button className='register_button'>Register</button>
          <span className='register_signup_button'>Already have an accout? Log in</span>
        </div>
      </div>
    </div>
  )
}
