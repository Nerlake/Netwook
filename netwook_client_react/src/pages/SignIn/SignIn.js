import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signin.css'
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addNumber, setUser } from '../../redux/userSlice';


export default function SignIn() {

  // const user = useSelector((state) => state.user)

  const dispatch = useDispatch()


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  function login() {
    api.post('/api/auth/login', loginData)
      .then(res => {
        dispatch(setUser(res.data.user));
        localStorage.setItem('session_token', res?.data?.session_token);
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      }
      );
  }


  return (
    <div className='signin'>
      <div className="signin_container">
        <div className="signin_logo">NetWook</div>
        <p className='signin_description'>Welcome to your social network</p>
        <div className="signin_form">
          {/* <button onClick={() => dispatch(setUser())}>dispatch</button> */}

          <input type="text" placeholder='Email' className='signin_input' onKeyUp={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })} />
          <input type="password" placeholder='Password' className='signin_input' onKeyUp={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })} />
          {/* <Link to={"/"} className="link signin_button">Log In</Link> */}
          <div className="link signin_button" onClick={login}>Log In</div>
          <Link to={"/register"} className="link"><span className='signin_signup_button'>Sign Up</span></Link>
        </div>
      </div>
    </div>
  )
}
