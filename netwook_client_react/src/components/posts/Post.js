import { Comment, ThumbUp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './post.css'
import api from '../../api/api'
import { useSelector } from 'react-redux'

export default function Post({ post }) {



    const [likeNumber, setLikeNumber] = useState(post?.likes?.length);
    const [isLiked, setIsLiked] = useState(false);

    const [commentNumber, setCommentNumber] = useState(post?.comments?.length || 0);

    const userDetails = useSelector((state) => state.user)


    function addOrRemoveLike() {
        api.put("/api/posts/" + post?._id + "/like", { userId: userDetails?._id })
            .then(res => {
                if (res.data === "SUCCESLIKED")
                    setLikeNumber(likeNumber + 1);
                else if (res.data === "SUCCESDISLIKED")
                    setLikeNumber(likeNumber - 1);
                setIsLiked(!isLiked);
            })
    }

    function checkLike() {
        if (post?.likes?.includes(userDetails?._id)) {
            setIsLiked(true);
        }
    }

    useEffect(() => {
        checkLike();
    }, [post?.likes, userDetails?._id])


    return (
        <div className='post'>
            <div className="post_container">
                <div className="post_header">
                    <img src={"/assets/" + post.profilePicture} alt="profilpicture" className="post_image" />

                    <div className="post_header_info">
                        <Link to={"/" + post?.userId} className="link"><span className='post_username'>{`${post.firstName} ${post.name}`}</span>                </Link>
                        <span className='post_time'>{post.createdAt}</span>
                    </div>

                </div>
                <div className="post_body">
                    <p>{post.desc}</p>
                </div>
                <div className="post_stats">
                    <div className='post_stats_item'><span className='post_stats_number'>{likeNumber}</span> <ThumbUp className='stat_icon' /></div>
                    <div className='post_stats_item'><span className='post_stats_number'>{commentNumber} </span><Comment className='stat_icon' /></div>
                </div>
                <div className="post_footer">
                    <span className={`post_footer_button ${isLiked && "active_item"}`} onClick={addOrRemoveLike}><ThumbUp /> Like </span>
                    <span className='post_footer_button'><Comment /> Comment</span>
                </div>
            </div>
        </div>
    )
}
