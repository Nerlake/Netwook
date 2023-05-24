import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './signin.css'

export default function SignIn() {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  return (
    <div className='signin'>
        <div className="signin_container">
            <div className="signin_logo">NetWook</div>
              <p className='signin_description'>Welcome to your social network</p>
            <div className="signin_form">

                <input type="text" placeholder='Email' className='signin_input' onKeyUp={(e)=>setLoginData({...loginData, email:e.currentTarget.value})}/>
                <input type="password" placeholder='Password' className='signin_input' onKeyUp={(e)=>setLoginData({...loginData, password:e.currentTarget.value})}/>
                <Link to={"/"} className="link signin_button">Log In</Link>
                <Link to={"/register"} className="link"><span className='signin_signup_button'>Sign Up</span></Link> 
            </div>
        </div>
    </div>
  )
}
