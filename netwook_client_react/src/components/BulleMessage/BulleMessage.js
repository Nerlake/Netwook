import React from 'react'
import "./bullemessage.css"
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

export default function BulleMessage({ content }) {

    // recuperation de redux

    const user = useSelector((state) => state.user)
    const recipient = useSelector((state) => state.conversation)

    if (content.userId === user._id) {
        content.side = "right"
    }
    else {
        content.side = "left"
    }


    return (
        <>
            {content.side === "left" ?
                (
                    <div className="conversation">
                        <div className="conversation_header">
                            <div className="conversation_header_left_part">
                                <img src={"/assets/" + recipient?.profilePicture} alt="profilePicture" className="message_top_img" />
                            </div>
                            <div className="conversation_header_right_part">
                                <span className="conversation_name">{recipient?.firstName} {recipient?.name}</span>
                                <span className="conversation_hour">{format(content?.createdAt)}</span>
                            </div>
                        </div>
                        <div className="conversation_message_container">
                            <span className="conversation_last_message">{content?.content}</span>
                        </div>
                    </div>
                ) : (
                    <div className="conversation_right">
                        <div className="conversation_header_right">
                            <div className="conversation_header_right_left_part">
                                <img src={"/assets/" + user?.profilePicture} alt="profilePicture" className="message_top_img" />
                            </div>
                            <div className="conversation_header_right_right_part">
                                <span className="conversation_name">{user?.firstName} {user?.name}</span>
                                <span className="conversation_hour">{format(content?.createdAt)}</span>
                            </div>

                        </div>
                        <div className="conversation_message_container_right">
                            <span className="conversation_last_message_right">{content?.content}</span>

                        </div>
                    </div>)
            }
        </>
    )
}
