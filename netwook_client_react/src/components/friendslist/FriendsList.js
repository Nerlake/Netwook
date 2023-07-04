import { useEffect, useState } from 'react'
import Friend from '../friend/Friend'
import './friendslist.css'
import api from '../../api/api'
import { useSelector } from 'react-redux'

export default function FriendsList({ friendsList, setFriendsList }) {

  // recupération de user dans redux
  const userDetails = useSelector((state) => state.user)


  return (
    <div className='friendslist'>
      <div className="friendslist_container">
        <h5>Connected friends</h5>
        <div className="friendslist_list">
          {
            friendsList?.map((friend) => (
              <Friend key={friend?._id} data={friend} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
