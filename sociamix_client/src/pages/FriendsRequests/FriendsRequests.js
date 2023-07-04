import React, { useEffect, useState } from 'react'
import FriendsList from '../../components/friendslist/FriendsList'
import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import RequestList from '../../components/RequestList/RequestList'
import api from '../../api/api'
import { useSelector } from 'react-redux'

export default function FriendsRequests() {

    const userDetails = useSelector((state) => state.user)
    const [friendsList, setFriendsList] = useState()
    const [friendsRequestReceived, setFriendsRequestReceived] = useState([])
    const [friendsRequestSent, setFriendsRequestSent] = useState([])

    function getProfil() {
        api.get('/api/users/friendsRequests/' + userDetails?._id)
            .then(res => {
                if (res.status === 200) {
                    setFriendsRequestReceived(res.data.friendsRequestReceived)
                    setFriendsRequestSent(res.data.friendsRequestSent)
                }
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        api.get('/api/users/friends/' + userDetails?._id)
            .then(res => {
                console.log(res.data)
                setFriendsList(res.data)
            })
            .catch(err => console.log(err))
    }, [userDetails])


    useEffect(() => {
        getProfil()
    }, [])

    return (
        <div className="App">
            <Navbar />
            <div className="page_container">
                <div className='accueil'>
                    <div className="accueil_friend_list">
                        <FriendsList friendsList={friendsList} setFriendsList={setFriendsList} />
                    </div>
                    <div className="accueil_feed">
                        <RequestList setFriendsList={setFriendsList} friendsList={friendsList} setFriendsRequestReceived={setFriendsRequestReceived} friendsRequestReceived={friendsRequestReceived} setFriendsRequestSent={setFriendsRequestSent} friendsRequestSent={friendsRequestSent} />
                    </div>
                </div>

            </div>
        </div>
    )
}
