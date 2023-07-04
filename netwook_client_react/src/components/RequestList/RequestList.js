import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import Friend from '../friend/Friend'
import { useSelector } from 'react-redux'
import './requestlist.css'

export default function RequestList({ friendsRequestReceived, setFriendsRequestReceived, friendsRequestSent, setFriendsRequestSent, friendsList, setFriendsList }) {



    return (
        <div>


            <h5>Friends requests</h5>
            <div className="container_requests">

                <div className="received">
                    <h4>Received requests</h4>
                    <div className="friendslist_container">
                        {friendsRequestReceived?.map((user) => (
                            <Friend key={user._id} data={user} isRequest={true} setFriendsRequestReceived={setFriendsRequestReceived} friendsRequestReceived={friendsRequestReceived} setFriendsList={setFriendsList} friendsList={friendsList} />
                        ))}
                    </div>
                </div>
                <hr />
                <div className="sent">
                    <h4>Sent requests</h4>


                    <div className="friendslist_container">
                        {friendsRequestSent?.map((user) => (
                            <Friend key={user._id} data={user} isRequest={true} isSent={true} setFriendsRequestSent={setFriendsRequestSent} friendsRequestSent={friendsRequestSent} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
