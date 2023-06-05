import React, { useEffect, useState } from 'react'
import leo from '../../assets/leo.jpg'
import './profil.css'
import background from '../../assets/background.jpg'
import { PersonAdd, PersonRemove } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import api from '../../api/api'

export default function Profil({ userId, type }) {

  const myProfile = useSelector((state) => state.user)

  const [userDetails, setUserDetails] = useState(undefined)
  const [friendsList, setFriendsList] = useState([])
  const [isFriend, setIsFriend] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    api.get('/api/users/' + id)
      .then(res => {
        setUserDetails(res.data)
        setFriendsList(res.data.friends)
        setIsFriend(res.data.friends.includes(myProfile._id))
      }
      )
      .catch(err => console.log(err))
  }, [id, myProfile])


  function addRemoveFriend() {
    if (!isFriend) {
      api.put('/api/users/' + id + '/follow', { userId: myProfile._id })
        .then(res => {
          setIsFriend(true)
          setFriendsList([...friendsList, myProfile._id])

        })
        .catch(err => console.log(err))
    } else {
      api.put('/api/users/' + id + '/unfollow', { userId: myProfile._id })
        .then(res => {
          setIsFriend(false)
          setFriendsList(friendsList.filter((friend) => friend !== myProfile._id))
        })
        .catch(err => console.log(err))
    }
  }









  return (
    <div className='profil'>
      <div className="profil_header">
        <img src={background} alt="background" className="profil_header_background" />
        <img src={"/assets/" + userDetails?.profilePicture} alt="profilpicture" className="profil_header_photo" />
        <div className="profil_infos">
          <div className="profil_header_name">{`${userDetails?.firstName} ${userDetails?.name}`} {type === "myprofil" ? null : !isFriend ? <button className='profil_header_button' onClick={addRemoveFriend}><PersonAdd /></button> : <button className='profil_header_button' onClick={addRemoveFriend}><PersonRemove /></button>} </div>
          <div className="profil_header_stats">{friendsList.length} friend(s)</div>
          <div className="profil_header_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</div>
        </div>
      </div>
    </div>
  )
}
