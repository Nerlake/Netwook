import { Comment, ThumbUp } from '@mui/icons-material'
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
                <div className='post_stats_item'><span className='post_stats_number'>2 </span> <ThumbUp className='stat_icon'/></div>
                <div className='post_stats_item'><span className='post_stats_number'>1 </span><Comment className='stat_icon'/></div>
            </div>
            <div className="post_footer">
                    <span className='post_footer_button active_item'><ThumbUp/> Like </span>
                    <span className='post_footer_button'><Comment/> Comment</span>
            </div>
        </div>
    </div>
  )
}
