import { Message } from '@mui/icons-material'
import React from 'react'
import leo from '../../assets/leo.jpg'
import './friend.css'

export default function Friend() {
  return (
    <div className='friend'>
        <div className="friend_container">
          <div className="friend_info">
            <img src={leo} alt="profile picture" className='friend_picture'/>
            <span className='friend_name'>Léo HOTZ</span>
          </div>
          <div className="friend_actions">
            <button className='friend_button'><Message/></button>
          </div>
        </div>
    </div>
  )
}
