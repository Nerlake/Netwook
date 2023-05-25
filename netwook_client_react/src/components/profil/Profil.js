import React, { useEffect, useState } from 'react'
import leo from '../../assets/leo.jpg'
import './profil.css'
import background from '../../assets/background.jpg'
import { PersonAdd, PersonRemove } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import api from '../../api/api'

export default function Profil({ userId }) {

  const myProfile = useSelector((state) => state.user)

  const [userDetails, setUserDetails] = useState(undefined)

  useEffect(() => {
    if (!!userId) {
      setUserDetails(myProfile)
    }
    else {
      api.get('/api/users/646f5c4f08c941d0f2555249')
        .then(res => {
          setUserDetails(res.data)
        }
        )
        .catch(err => console.log(err))
    }
  }, [userId, myProfile])







  const pageProfile = {
    id: 3,
    name: 'Léo',
    surname: 'HOTZ',
    photo: "leo",
  }

  const [friendsList, setFriendsList] = useState([
    {
      id: 1,
      name: 'Kylian',
      surname: 'Mbappe',
      photo: "leo",
    },
    {
      id: 2,
      name: 'Alexandra',
      surname: 'Tbo',
      photo: "alex",
    },
    {
      id: 7,
      name: 'Paul',
      surname: 'Pogba',
      photo: "alex",
    },
  ])
  const [friendsNumber, setFriendsNumber] = useState(friendsList.length)
  const [isFriend, setIsFriend] = useState(friendsList.find(friend => friend.id === myProfile.id) ? true : false);
  const IsMe = myProfile.id === pageProfile.id;

  function addRemoveFriend() {
    if (isFriend) {
      setFriendsList(friendsList.filter(friend => friend.id !== myProfile.id))
      setFriendsNumber(friendsNumber - 1)
      setIsFriend(false)
      return
    }
    else {
      setFriendsList([...friendsList, { id: 3, name: 'Léo', surname: 'Hotz', photo: 'leo' }])
      setFriendsNumber(friendsNumber + 1)
      setIsFriend(true)
    }
  }

  return (
    <div className='profil'>
      <div className="profil_header">
        <img src={background} alt="background" className="profil_header_background" />
        <img src={"/assets/" + userDetails?.profilePicture} alt="profilpicture" className="profil_header_photo" />
        <div className="profil_infos">
          <div className="profil_header_name">{`${userDetails?.firstName} ${userDetails?.name}`} {IsMe ? null : !isFriend ? <button className='profil_header_button' onClick={addRemoveFriend}><PersonAdd /></button> : <button className='profil_header_button' onClick={addRemoveFriend}><PersonRemove /></button>} </div>
          <div className="profil_header_stats">{friendsNumber} friend(s)</div>
          <div className="profil_header_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</div>
        </div>
      </div>
    </div>
  )
}
