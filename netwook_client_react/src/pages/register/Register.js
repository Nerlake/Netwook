import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

export default function Register() {

  const [userInfos, setUserInfos] = useState({
    firstName: '',
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  })

  return (
    <div className='register'>
      <div className="register_container">
        <div className="register_logo">NetWook</div>
          <p className='register_description'>Welcome to your social network</p>
        <div className="register_form">
          <input type="text" placeholder='First name' className='register_input' onKeyUp={(e)=>setUserInfos({...userInfos, firstName:e.currentTarget.value})} />
          <input type="text" placeholder='Name' className='register_input' onKeyUp={(e)=>setUserInfos({...userInfos, name:e.currentTarget.value})}/>
          <input type="text" placeholder='Email' className='register_input' onKeyUp={(e)=>setUserInfos({...userInfos, email:e.currentTarget.value})}/>
          <input type="password" placeholder='Password' className='register_input' onKeyUp={(e)=>setUserInfos({...userInfos, password:e.currentTarget.value})}/>
          <input type="password" placeholder='Repeat password' className='register_input' onKeyUp={(e)=>setUserInfos({...userInfos, passwordRepeat:e.currentTarget.value})}/>
          <button className='register_button'>Register</button>
          <Link to={"/login"} className="link"><span className='register_signup_button'>Already have an accout? Log in</span></Link>
        </div>
      </div>
    </div>
  )
}
