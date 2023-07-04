import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import FriendsList from '../../components/friendslist/FriendsList'
import Message from '../../components/Messages/Message'
import { useSelector } from 'react-redux'
// import { io } from 'socket.io-client'
import api from '../../api/api'

export default function Messages() {

    const [selectedUser, setSelectedUser] = useState(null)

    const userDetails = useSelector((state) => state.user)
    const [friendsList, setFriendsList] = useState([])

    useEffect(() => {
        api.get('/api/users/friends/' + userDetails?._id)
            .then(res => {
                console.log(res.data)
                setFriendsList(res.data)
            })
            .catch(err => console.log(err))
    }, [userDetails])

    return (
        <div className="App">
            <Navbar />
            <div className="page_container">
                <div className='accueil'>
                    <div className="accueil_friend_list">
                        <FriendsList selectedUser={selectedUser} setSelectedUser={setSelectedUser} friendsList={friendsList} setFriendsList={setFriendsList} />
                    </div>
                    <div className="accueil_feed">
                        <Message userId={'123'} />
                    </div>
                </div>

            </div>
        </div>
    )
}
