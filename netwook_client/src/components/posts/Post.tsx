import React from 'react'
import leo from '../../assets/leo.jpg'
import './post.css'

export default function Post() {
  return (
    <div className='post'>
        <div className="post_container">
            <div className="post_header">
                <img src={leo} alt="profil picture" className="post_image" />
                <div className="post_header_info">
                    <span className='post_username'>Leo Messi</span>
                    <span className='post_time'>1 hour ago</span>
                </div>
            </div>
            <div className="post_body">
                <p>Hey guys, I'm looking for a new job. If you know someone who is hiring, please let me know.</p>
            </div>
            <div className="post_stats">
                <span className='post_stats_like'>2 people like it</span>
                <span className='post_stats_comment'>1 comment</span>
            </div>
            <div className="post_footer">
                    <span className='post_footer_button'>Like</span>
                    <span className='post_footer_button'>Comment</span>
            </div>
        </div>
    </div>
  )
}
