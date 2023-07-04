import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import FriendsList from '../../components/friendslist/FriendsList'
import './accueil.css'
import { useSelector } from 'react-redux'
import api from '../../api/api'

export default function Accueil() {


  const userDetails = useSelector((state) => state.user)
  const [friendsList, setFriendsList] = useState([])

  useEffect(() => {
    api.get('/api/users/friends/' + userDetails?._id)
      .then(res => {
        console.log(res.data)
        setFriendsList(res.data)
      })
      .catch(err => console.log(err))
  }, [userDetails])

  //recupération de l'id avec redux
  return (
    <div className='accueil'>
      <div className="accueil_friend_list">
        <FriendsList friendsList={friendsList} setFriendsList={setFriendsList} />
      </div>
      <div className="accueil_feed">
        <Feed />
      </div>
    </div>
  )
}
