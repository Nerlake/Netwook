import { Check, Delete, Message } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import leo from '../../assets/leo.jpg'
import './friend.css'
import { changeConversation } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import api from '../../api/api'

export default function Friend({ data, isRequest = false, isSent = false, setFriendsRequestReceived, friendsRequestReceived, setFriendsList, friendsList, setFriendsRequestSent, friendsRequestSent }) {
  const dispatch = useDispatch()



  function AcceptRequest() {
    api.put("/api/users/" + data?._id + "/accept")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          const tempArray = friendsRequestReceived.filter((request) => request._id !== data._id);
          setFriendsRequestReceived(tempArray);
          setFriendsList([...friendsList, data])
        }
      })
      .catch((err) => console.log(err))
  }

  function DeleteRequest() {
    api.put("/api/users/" + data?._id + "/remove")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          const tempArray = friendsRequestSent.filter((request) => request._id !== data._id);
          setFriendsRequestSent(tempArray);
        }
      })
      .catch((err) => console.log(err))
  }

  function DeclineRequest() {
    api.put("/api/users/" + data?._id + "/refuse")
      .then((res) => {
        // si statut 200 on met a jour la liste setReceveidRequest en supprimant l'element
        if (res.status === 200) {
          const tempArray = friendsRequestReceived.filter((request) => request._id !== data._id);
          setFriendsRequestReceived(tempArray);
        }
      })
      .catch((err) => console.log(err))
  }





  return (
    <div className='friend'>
      <div className="friend_container">
        <Link to={"/" + data?._id} className="link">
          <div className="friend_info">
            <img src={data?.profilePicture} alt="profilepicture" className='friend_picture' />
            <span className='friend_name'>{`${data?.firstName} ${data?.name}`}</span>
          </div>
        </Link>
        {!isRequest ? (
          <div className="friend_actions">
            <Link to={"/messages"}><button className='friend_button' onClick={() => dispatch(changeConversation(data))}><Message /></button></Link>
          </div>
        ) : (
          <div className="friend_actions">
            {
              isSent ? (
                <>
                  <span className='friend_request'>Demande envoyée</span>
                  <button className='friend_button' onClick={DeleteRequest}><Delete /></button>
                </>
              ) : (
                <>
                  <button className='friend_button' onClick={AcceptRequest}><Check /></button>
                  <button className='friend_button' onClick={DeclineRequest}><Delete /></button>
                </>
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}
