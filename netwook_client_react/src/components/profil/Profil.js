import React, { useEffect, useState } from 'react'
import './profil.css'
import { Check, Close, Edit, PersonAdd, PersonRemove } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import Badge from '../badge/Badge'
import { updateUser } from '../../redux/userSlice'


export default function Profil({ userId, type, setIsPrivate, isPrivate, isFriend, setIsFriend }) {

  const myProfile = useSelector((state) => state.user)

  // dispatch import 
  const dispatch = useDispatch()

  const [userDetails, setUserDetails] = useState(undefined)
  const [friendsList, setFriendsList] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState("")
  const [backgroundPicture, setBackgroundPicture] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [isEditable, setIsEditable] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isPending, setIsPending] = useState(false)


  const { id } = useParams();

  function getProfil() {
    api.get('/api/users/' + id)
      .then(res => {
        setUserDetails(res.data)
        setFriendsList(res.data.friends)
        setIsFriend(res.data.friends.includes(myProfile?._id))
        setDescription(res.data.desc)
        setBackgroundPicture(res.data.coverPicture)
        setProfilePicture(res.data.profilePicture)
        setIsSending(res.data.friendsRequestReceived.includes(myProfile?._id))
        setIsPending(res.data.friendsRequestSent.includes(myProfile?._id))
        setIsPrivate(res.data.isPrivate)
      }
      )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProfil()
  }, [id, myProfile?._id])


  useEffect(() => {
    if (myProfile?._id === id) {
      setIsEditable(true)
    }
    else if (myProfile?.isAdmin) {
      setIsEditable(true)
    }
    else {
      setIsEditable(false)
    }
  }, [myProfile?._id, id, myProfile?.isAdmin])





  function addRemoveFriend() {
    if (!isFriend) {
      api.put('/api/users/' + id + '/follow')
        .then(res => {
          setIsSending(true)
        })
        .catch(err => console.log(err))
    } else {
      api.put('/api/users/' + id + '/unfollow')
        .then(res => {
          setIsFriend(false)
          setFriendsList(friendsList.filter((friend) => friend !== myProfile?._id))
        })
        .catch(err => console.log(err))
    }
  }

  function sendAndClose() {
    api.put('/api/users/' + id, { desc: description, coverPicture: backgroundPicture, profilePicture: profilePicture, isPrivate: isPrivate })
      .then(res => {
        setIsEditing(false)
        getProfil()
        // mise en place du nouveau token 
        //on vérifie qu'on est bien sur notre profil
        if (myProfile?._id === id) {
          dispatch(updateUser(res.data));
        }
      }
      )
      .catch(err => console.log(err))

  }


  function DeleteRequest() {
    api.put("/api/users/" + id + "/remove")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          setIsSending(false)
        }
      })
      .catch((err) => console.log(err))
  }

  function DeclineRequest() {
    api.put("/api/users/" + id + "/refuse")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          setIsPending(false)
        }
      })
      .catch((err) => console.log(err))
  }

  function AcceptRequest() {
    api.put("/api/users/" + id + "/accept")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          setFriendsList([...friendsList, myProfile?._id])
          setIsPending(false)
        }
      })
      .catch((err) => console.log(err))
  }

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked);
  };




  return (
    <div className='profil'>
      <div className="profil_header">
        <img src={userDetails?.coverPicture} alt="background" className="profil_header_background" />
        <img src={userDetails?.profilePicture} alt="profilpicture" className="profil_header_photo" />
        <div className="profil_infos">
          <div className="profil_header_name">{`${userDetails?.firstName} ${userDetails?.name}`}
            <Badge fontSize={"25px"} margin={"0 35px 0 10px"} statut={userDetails?.isAdmin} />

            <div className='profil_actions'>

              {isEditable && isEditing === false ?
                <button className='profil_header_button' onClick={() => setIsEditing(true)}><Edit /></button>
                :
                isEditable && isEditing === true
                  ?
                  <><button className='profil_header_button' onClick={() => setIsEditing(false)}><Close /></button> <button className='profil_header_button' onClick={() => sendAndClose()}><Check /></button></>
                  :
                  null
              } {
                myProfile?._id === id
                  ?
                  null
                  :
                  isSending ?
                    <button className='profil_header_button' onClick={DeleteRequest} id='cancel'>Pending... </button>
                    :
                    isPending ?
                      <>
                        <button className='profil_header_button' onClick={AcceptRequest}>Accept</button>
                        <button className='profil_header_button' onClick={DeclineRequest}>Decline</button>
                      </>
                      :
                      !isFriend
                        ?
                        <button className='profil_header_button' onClick={addRemoveFriend}><PersonAdd /></button>
                        :
                        <button className='profil_header_button' onClick={addRemoveFriend}><PersonRemove /></button>} </div>
          </div>
          <div className="profil_header_stats">{friendsList.length} friend(s)</div>
          {isEditing ? <><span>Profil picture(link only):</span> <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} /></> : null}
          {isEditing ? <><span>Description:</span><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></> : <div className="profil_header_description">{userDetails?.desc}</div>}
          {isEditing ? <><span>Cover picture(link only):</span><input type="text" value={backgroundPicture} onChange={(e) => setBackgroundPicture(e.target.value)} /></> : null}
          {isEditing ? <div style={{ display: "flex", gap: "5px" }}><span>Private account:</span><input type='checkbox' checked={isPrivate} onChange={handleCheckboxChange} /></div> : null}
        </div>
      </div>
    </div>
  )
}
