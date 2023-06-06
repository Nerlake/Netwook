import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import FriendsList from '../../components/friendslist/FriendsList'
import Message from '../../components/Messages/Message'

export default function Messages() {

    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <div className="App">
            <Navbar />
            <div className="page_container">
                <div className='accueil'>
                    <div className="accueil_friend_list">
                        <FriendsList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    </div>
                    <div className="accueil_feed">
                        <Message userId={'123'} />
                    </div>
                </div>

            </div>
        </div>
    )
}
