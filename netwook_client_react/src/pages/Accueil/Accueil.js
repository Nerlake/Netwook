import React from 'react'
import Feed from '../../components/feed/Feed'
import FriendsList from '../../components/friendslist/FriendsList'
import './accueil.css'
import { useSelector } from 'react-redux'

export default function Accueil() {
  //recupération de l'id avec redux
  return (
    <div className='accueil'>
      <div className="accueil_friend_list">
        <FriendsList />
      </div>
      <div className="accueil_feed">
        <Feed />
      </div>
    </div>
  )
}
