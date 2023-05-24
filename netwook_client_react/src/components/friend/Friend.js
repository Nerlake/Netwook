import { Message } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import leo from '../../assets/leo.jpg'
import './friend.css'

export default function Friend() {
  return (
    <div className='friend'>
        <div className="friend_container">
          <Link to={"/profil"} className="link">
            <div className="friend_info">
              <img src={leo} alt="profile picture" className='friend_picture'/>
              <span className='friend_name'>Léo HOTZ</span>
           </div>
          </Link>
            <div className="friend_actions">
              <Link to={"/register"}><button className='friend_button'><Message/></button></Link>
            </div>
        </div>
    </div>
  )
}
