import React from 'react'
import NewPost from '../new_post/NewPost'
import Post from '../posts/Post'
import './feed.css'

export default function Feed() {
  return (
    <div className='feed'>
        <div className="feed_container">
            <NewPost/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    </div>
  )
}
