import { Comment, ThumbUp } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import leo from '../../assets/leo.jpg'
import './post.css'

export default function Post() {

    var id = "lea"

    const [likeList, setlikeList] = useState(["leo", "alex", "thibault"])
    const [likeNumber, setLikeNumber] = useState(likeList.length);
    const [isLiked, setIsLiked] = useState(false);


    function addLike() {
        if(likeList.includes(id)) {
            setLikeNumber(likeNumber - 1)
            //enleve Leo de la liste
            setlikeList(likeList.filter((item) => item !== id))
            setIsLiked(false)
        } else {
            setLikeNumber(likeNumber + 1)
            //ajoute Leo à la liste
            setlikeList([...likeList, id])
            setIsLiked(true)
        }
    }

  return (
    <div className='post'>
        <div className="post_container">
            <div className="post_header">
                <img src={leo} alt="profil picture" className="post_image" />

                <div className="post_header_info">
                                    <Link to={"/profil"} className="link"><span className='post_username'>Léo HOTZ</span>                </Link>
                    <span className='post_time'>1 hour ago</span>
                </div>

            </div>
            <div className="post_body">
                <p>Hey guys, I'm looking for a new job. If you know someone who is hiring, please let me know.</p>
            </div>
            <div className="post_stats">
                <div className='post_stats_item'><span className='post_stats_number'>{likeNumber}</span> <ThumbUp className='stat_icon'/></div>
                <div className='post_stats_item'><span className='post_stats_number'>1 </span><Comment className='stat_icon'/></div>
            </div>
            <div className="post_footer">
                    <span className={`post_footer_button ${isLiked && "active_item"}`} onClick={addLike}><ThumbUp/> Like </span>
                    <span className='post_footer_button'><Comment/> Comment</span>
            </div>
        </div>
    </div>
  )
}
