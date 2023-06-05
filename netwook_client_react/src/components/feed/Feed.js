import React, { useEffect, useState } from 'react'
import NewPost from '../new_post/NewPost'
import Post from '../posts/Post'
import './feed.css'
import { useSelector } from 'react-redux'
import api from '../../api/api'
import { useLocation, useParams } from 'react-router-dom'

export default function Feed() {

  // import de redux
  const userDetails = useSelector((state) => state.user)

  const { id } = useParams();
  const location = useLocation()

  const [posts, setPosts] = useState([])


  useEffect(() => {
    if (location.pathname === "/") {
      api.get('api/posts/timeline/' + userDetails?._id)
        .then(res => {
          setPosts(res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      api.get('api/posts/profile/' + id)
        .then(res => {
          setPosts(res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [id, location.pathname, userDetails?._id])


  return (
    <div className='feed'>
      <div className="feed_container">
        {location.pathname === "/" && <NewPost posts={posts} setPosts={setPosts} />}
        {posts.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
      </div>
    </div>
  )
}
