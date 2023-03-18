import React from 'react'
import leo from '../../assets/leo.jpg'
import './newpost.css'

export default function NewPost() {
  return (
    <div className='newpost'>
        <div className="newpost_container">
            <div className="newpost_header">
                <img src={leo} alt="profile picture" className="new_post_image" />
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
