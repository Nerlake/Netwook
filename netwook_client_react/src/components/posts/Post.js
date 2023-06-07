import { Comment, ThumbUp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './post.css'
import api from '../../api/api'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

export default function Post({ post }) {



    const [likeNumber, setLikeNumber] = useState(post?.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentActivate, setIsCommentActivate] = useState(false);

    const [commentNumber, setCommentNumber] = useState(post?.comments?.length || 0);
    const [myComment, setMyComment] = useState('');
    const [comments, setComments] = useState(post?.comments || []);

    const userDetails = useSelector((state) => state.user)


    function addOrRemoveLike() {
        api.put("/api/posts/" + post?._id + "/like")
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

    function addComment() {
        if (myComment !== '') {
            api.put("/api/posts/" + post?._id + "/comment", { content: myComment, firstName: userDetails?.firstName, name: userDetails?.name, profilePicture: userDetails?.profilePicture })
                .then(res => {
                    setCommentNumber(commentNumber + 1);
                    setMyComment('');
                    const newComments = comments;
                    newComments.push({ userId: userDetails?._id, content: myComment, firstName: userDetails?.firstName, name: userDetails?.name, profilePicture: userDetails?.profilePicture });
                    setComments(newComments);
                })
        }
        else {
            alert('Veuillez écrire un commentaire')
        }
    }

    function checkAndSendComment(e) {
        if (e.key === 'Enter') {
            addComment();
        }
    }

    // function getComments() {
    //     api.get("/api/posts/" + post?._id + "/comments")
    //         .then(res => {
    //             setComments(res.data);
    //         })
    // }



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
                        <span className='post_time'>{format(post.createdAt)}</span>
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
                    <span className='post_footer_button' onClick={() => setIsCommentActivate(true)}><Comment /> Comment</span>
                </div>

            </div>
            {isCommentActivate ?
                <div className="comments">
                    <div className="comments_header">
                        <img src={"/assets/" + userDetails?.profilePicture} alt="profilePicture" className="comments_img" />
                        <input type="text" placeholder="Ecrivez un commentaire" className="comments_header_input" onKeyUp={(e) => checkAndSendComment(e)} onChange={(e) => setMyComment(e.target.value)} value={myComment} />
                    </div>
                    {comments?.map((comment) => (
                        <div className="comments_body">
                            <img src={"/assets/" + comment?.profilePicture} alt="profilePicture" className="comments_img" />
                            <div className="comments_body_info">
                                <span className="comments_body_username">{`${comment?.firstName} ${comment?.name}`}</span>
                                <span className="comments_body_text">{comment?.content}</span>
                            </div>
                        </div>
                    ))}
                </div>
                : null}
        </div>
    )
}
