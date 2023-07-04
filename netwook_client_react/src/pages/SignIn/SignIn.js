import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signin.css'
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addNumber, setUser } from '../../redux/userSlice';


export default function SignIn() {

  // const user = useSelector((state) => state.user)

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage] = useState()


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  function login() {
    api.post('/api/auth/login', loginData)
      .then(res => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element*
        if (res.status === 200) {
          dispatch(setUser(res.data.user));
          localStorage.setItem('session_token', res?.data?.session_token);
          navigate('/');
          window.location.reload();
        } if (res.status === 404) {
          setErrorMessage(res.response.data);
        }
      })
      .catch(err => {
        // console.log(err.response.data);
        setErrorMessage(err.response.data);
      }
      );
  }


  return (
    <div className='signin'>
      <div className="signin_container">
        {/* <div className="signin_logo">Sociamix</div> */}
        <img src="/logo.png" className='signin_logo' alt='logo' />
        <p className='signin_description'>Welcome to your social network</p>
        <div className="signin_form">
          {/* <button onClick={() => dispatch(setUser())}>dispatch</button> */}

          <input type="text" placeholder='Email' className='signin_input' onKeyUp={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })} />
          <input type="password" placeholder='Password' className='signin_input' onKeyUp={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })} />
          <span style={{ color: "white" }}>{errorMessage}</span>
          {/* <Link to={"/"} className="link signin_button">Log In</Link> */}
          <div className="link signin_button" onClick={login}>Log In</div>
          <Link to={"/register"} className="link"><span className='signin_signup_button'>Sign Up</span></Link>
        </div>
      </div>
    </div>
  )
}
