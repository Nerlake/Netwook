import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import api from '../../api/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

export default function Register() {

  const dispatch = useDispatch()

  const [userInfos, setUserInfos] = useState({
    username: '',
    firstName: '',
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  })

  function register() {
    api.post('/api/auth/register', userInfos)
      .then(res => {
        dispatch(setUser(res.data.user));
        localStorage.setItem('session_token', res?.data?.session_token);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      }
      );
  }

  return (
    <div className='register'>
      <div className="register_container">
        <div className="register_logo">NetWook</div>
        <p className='register_description'>Welcome to your social network</p>
        <div className="register_form">
          <input type="text" placeholder='Username' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, username: e.currentTarget.value })} />
          <input type="text" placeholder='First name' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, firstName: e.currentTarget.value })} />
          <input type="text" placeholder='Name' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, name: e.currentTarget.value })} />
          <input type="text" placeholder='Email' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, email: e.currentTarget.value })} />
          <input type="password" placeholder='Password' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, password: e.currentTarget.value })} />
          <input type="password" placeholder='Repeat password' className='register_input' onKeyUp={(e) => setUserInfos({ ...userInfos, passwordRepeat: e.currentTarget.value })} />
          <button className='register_button' onClick={register}>Register</button>
          <Link to={"/login"} className="link"><span className='register_signup_button'>Already have an accout? Log in</span></Link>
        </div>
      </div>
    </div>
  )
}
