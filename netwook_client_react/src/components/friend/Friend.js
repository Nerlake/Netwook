import { Message } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import leo from '../../assets/leo.jpg'
import './friend.css'
import { changeConversation } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

export default function Friend({ data }) {


  const dispatch = useDispatch()


  return (
    <div className='friend'>
      <div className="friend_container">
        <Link to={"/" + data?._id} className="link">
          <div className="friend_info">
            <img src={data?.profilePicture} alt="profilepicture" className='friend_picture' />
            <span className='friend_name'>{`${data?.firstName} ${data?.name}`}</span>
          </div>
        </Link>
        <div className="friend_actions">
          <Link to={"/messages"}><button className='friend_button' onClick={() => dispatch(changeConversation(data))}><Message /></button></Link>
        </div>
      </div>
    </div>
  )
}
