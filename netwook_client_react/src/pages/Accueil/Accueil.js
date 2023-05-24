import React from 'react'
import Feed from '../../components/feed/Feed'
import FriendsList from '../../components/friendslist/FriendsList'
import './accueil.css'

export default function Accueil() {
  return (
    <div className='accueil'>
        <div className="accueil_friend_list">
            <FriendsList/>
        </div>
        <div className="accueil_feed">
          <Feed/>
        </div>
    </div>
  )
}
