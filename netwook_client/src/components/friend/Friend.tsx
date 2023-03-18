import React from 'react'
import leo from '../../assets/leo.jpg'
import './friend.css'

export default function Friend() {
  return (
    <div className='friend'>
        <div className="friend_container">
            <img src={leo} alt="profile picture" className='friend_picture'/>
            <span className='friend_name'>Léo HOTZ</span>
        </div>
    </div>
  )
}
