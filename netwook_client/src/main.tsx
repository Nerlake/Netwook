import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ProfilPage from './pages/profilpage/ProfilPage'
import Register from './pages/register/Register'
import SignIn from './pages/SignIn/SignIn'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProfilPage/>
    {/* <App /> */}
    {/* <SignIn/> */}
    {/* <Register/> */}
  </React.StrictMode>,
)
