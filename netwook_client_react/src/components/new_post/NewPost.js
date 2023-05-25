import React from 'react'
import leo from '../../assets/leo.jpg'
import './newpost.css'
import { useSelector } from 'react-redux'

export default function NewPost() {

  const userDetails = useSelector((state) => state.user)

  return (
    <div className='newpost'>
      <div className="newpost_container">
        <div className="newpost_header">
          <img src={"/assets/" + userDetails?.profilePicture} alt="profile picture" className="new_post_image" />
          <input type="text" placeholder="What's on your mind?" className="new_post_input" />
        </div>
        <div className="newpost_footer">
          <div className="newpost_footer_option">
            <h3>Photo/Video</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
