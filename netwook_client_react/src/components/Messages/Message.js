import React, { useEffect, useState } from 'react'
import "./message.css"
import BulleMessage from '../BulleMessage/BulleMessage'
import { Send } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import api from '../../api/api'

const messages = [
    {
        name: "Léo HOTZ",
        image: "leo.jpg",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, enim neque dolore sunt culpa nemo asperiores consequuntur laudantium nostrum eius eveniet voluptatum et quod aperiam, facilis provident. Similique omnis, non soluta esse atque enim incidunt, ab voluptate, vel modi nihil dolorum sunt maxime provident natus nesciunt quasi rem. Culpa debitis, quod molestias ducimus odit assumenda. Error, quia, nam magnam possimus esse voluptatibus nobis, vitae harum tempore nisi ipsam numquam quibusdam id dolor nostrum incidunt iure quo quaerat qui architecto ea. Commodi exercitationem, minus explicabo voluptatum, voluptatibus assumenda aliquid aspernatur in dolore, magni provident consequatur beatae amet sunt placeat animi totam.",
        side: "left"
    },
    {
        name: "Loïc GRANDPIERRE",
        image: "loic.jpg",
        content: "Hello",
        side: "right"
    },
    {
        name: "Loïc GRANDPIERRE",
        image: "loic.jpg",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, fugiat temporibus! Veniam autem expedita laborum blanditiis soluta dolorum vel ipsum, alias saepe officia tempora non quos, dignissimos maiores totam dolorem eius amet ducimus fuga rem vero unde libero! Consectetur, molestias.",
        side: "right"
    },
    {
        name: "Léo HOTZ",
        image: "leo.jpg",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, enim neque dolore sunt culpa nemo asperiores consequuntur laudantium nostrum eius eveniet voluptatum et quod aperiam, facilis provident. Similique omnis, non soluta esse atque enim incidunt, ab voluptate, vel modi nihil dolorum sunt maxime provident natus nesciunt quasi rem. Culpa debitis, quod molestias ducimus odit assumenda. Error, quia, nam magnam possimus esse voluptatibus nobis, vitae harum tempore nisi ipsam numquam quibusdam id dolor nostrum incidunt iure quo quaerat qui architecto ea. Commodi exercitationem, minus explicabo voluptatum, voluptatibus assumenda aliquid aspernatur in dolore, magni provident consequatur beatae amet sunt placeat animi totam.",
        side: "left"
    },
]




export default function Message({ userId }) {

    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    //recupération de redux
    const user = useSelector((state) => state.user);
    const recipient = useSelector((state) => state.conversation);


    function sendMessage() {
        if (message !== '') {
            api.post('/api/messages/create', {
                userId: user._id,
                content: message,
                recipientId: recipient?._id
            })
                .then((res) => {
                    setConversation([...conversation, res.data])
                    setMessage('')
                }
                )
        }
        else {
            alert('Veuillez écrire un message')
        }
    }

    function sendMessageWithEnter(e) {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }



    useEffect(() => {

        api.get('/api/messages/conversation/' + user?._id + "/" + recipient?._id)
            .then((res) => {
                setConversation(res.data)
            })
            .catch((err) => {
                console.log(err)
            }
            )

    }, [user?._id, recipient?._id])

    useEffect(() => {
        //scroll to bottom
        const conversation_container = document.querySelector('.conversation_container')
        if (conversation_container !== null) {
            conversation_container.scrollTop = conversation_container.scrollHeight;
        }
    }, [conversation])





    return (
        <div className='message_container'>
            {recipient === null ? <span className="message_top_name">Sélectionnez une conversation</span> : (
                <>
                    <div className="message_top">
                        <img src={"/assets/" + recipient?.profilePicture} alt="profilePicture" className="message_top_img" />
                        <span className="message_top_name">{recipient?.firstName}</span>
                    </div>
                    <div className="conversation_container">
                        {conversation.map((message) => (
                            <BulleMessage content={message} />
                        ))}
                    </div>
                    <div className="message_box_container">

                        <input type="text" className='message_text' value={message} onKeyUp={(e) => sendMessageWithEnter(e)} onChange={(e) => setMessage(e.target.value)} />
                        <button className="message_send_button" onClick={sendMessage}><Send /></button>
                    </div>
                </>
            )}
        </div >
    )
}
