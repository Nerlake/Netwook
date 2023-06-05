import { useEffect, useState } from 'react'
import Friend from '../friend/Friend'
import './friendslist.css'
import api from '../../api/api'
import { useSelector } from 'react-redux'

export default function FriendsList() {

  // recupération de user dans redux
  const userDetails = useSelector((state) => state.user)
  const [friendsList, setFriendsList] = useState()

  useEffect(() => {
    api.get('/api/users/friends/' + userDetails?._id)
      .then(res => {
        console.log(res.data)
        setFriendsList(res.data)
      })
      .catch(err => console.log(err))
  }, [userDetails])




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
