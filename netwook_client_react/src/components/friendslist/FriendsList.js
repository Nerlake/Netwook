import Friend from '../friend/Friend'
import './friendslist.css'

export default function FriendsList() {
  return (
    <div className='friendslist'>
        <div className="friendslist_container">
            <h5>Connected friends</h5>
            <div className="friendslist_list">
                <Friend/>
                <Friend/>
                <Friend/>
            </div>
        </div>
    </div>
  )
}
