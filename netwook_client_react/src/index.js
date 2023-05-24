import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import ProfilPage from './pages/profilpage/ProfilPage'
import Register from './pages/register/Register'
import SignIn from './pages/SignIn/SignIn'
import Map from './components/map/Map'


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/profil', element: <ProfilPage /> },
  { path: '/login', element: <SignIn /> },
  { path: '/register', element: <Register /> },
  { path: '/map', element: <Map /> },
  { path: '*', element: <div>404</div> },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
