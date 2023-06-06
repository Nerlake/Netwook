import React, { useState } from 'react'
import './newpost.css'
import { useSelector } from 'react-redux'
import api from '../../api/api'

export default function NewPost({ posts, setPosts }) {

  const userDetails = useSelector((state) => state.user)

  const [post, setPost] = useState("");



  function submitPost() {
    if (post === "") {
      alert("Please enter something")
      return
    }
    api.post("/api/posts", {
      userId: userDetails?._id,
      desc: post
    }
    )
      .then(res => {
        const newPost = {
          firstName: userDetails.firstName,
          name: userDetails.name,
          profilePicture: userDetails.profilePicture,
          ...res.data
        }

        const postsCopy = [...posts]
        postsCopy.unshift(newPost)
        setPosts(postsCopy)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setPost("")
      }
      )
  }


  return (
    <div className='newpost'>
      <div className="newpost_container">
        <div className="newpost_header">
          <img src={"/assets/" + userDetails?.profilePicture} alt="profilePicture" className="new_post_image" />
          <input type="text" placeholder="What's on your mind?" className="new_post_input" value={post} onChange={(e) => setPost(e.target.value)} />
          <button onClick={submitPost} className='button_envoyer'>Send</button>
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
