import React, { useEffect, useState } from 'react'
import './navbar.css'
import leo from '../../assets/leo.jpg'
import { Chat, Logout, Map, Message, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeConversation, removeUser } from '../../redux/userSlice'
import api from '../../api/api'

export default function Navbar() {


  const userDetails = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [searchbar, setSearchbar] = useState("")
  const [isResultVisible, setIsResultVisible] = useState(false)
  const [result, setResult] = useState([])





  useEffect(() => {
    const searchbarId = document.getElementById('searchbar');
    const resultContainerId = document.getElementById('result_container');

    searchbarId.addEventListener('focus', () => {

      setIsResultVisible(true)
    });

    searchbarId.addEventListener('blur', () => {
      //attend 1 seconde avant de cacher le result_container
      setTimeout(() => {

        setIsResultVisible(false)
      }, 2000);

    });

    if (searchbar.length <= 0) {
      setIsResultVisible(false)
    }
    else {
      api.get('/api/users/search/' + searchbar)
        .then(res => {
          setResult(res.data)
        }
        )
      setIsResultVisible(true)
    }
  }, [searchbar])





  //si input selectionné on met result_container en display flex




  return (
    <div className='navbar'>
      <div className="navbar_container">
        <Link to={"/"} className="link"><span className="navbar_logo">NetWook</span></Link>
        <div className="navbar_searchbar_container">
          <input type="text" className="navbar_searchbar" id='searchbar' placeholder="Search" value={searchbar} onChange={(e) => setSearchbar(e.target.value)} />
        </div>
        <div className="navbar_list_menu">
          <Link to={"/"} className="link"> <a className="navbar_menu_item">Feed</a></Link>
          {/* <Link to={"/"} className="link"><a className="navbar_menu_item"><Notifications/></a></Link> */}
          <Link to={"/map"} className="link"><a className="navbar_menu_item"><Map /></a></Link>
          <Link to={"/messages"} className="link"><a className="navbar_menu_item"><Message /></a></Link>
          <Link to={"/login"} className="link" onClick={() => {
            dispatch(removeUser())
            dispatch(removeConversation())
            localStorage.removeItem('session_token')
            window.location.reload()
          }}><a className="navbar_menu_item"><Logout
          /></a></Link>
          <Link to={"/" + userDetails?._id} className="link"><a className="navbar_menu_item_logo"><img src={"/assets/" + userDetails?.profilePicture} alt="profilpicture" /></a></Link>
        </div>
      </div>

      {isResultVisible ?
        (<div className="result_container" id="result_container">
          {
            result?.map((user) => (
              <Link to={"/" + user?._id} className="link" key={user?._id}>
                <div className="result">
                  <img src={"/assets/" + user.profilePicture} alt="profilpicture" className='img_result' />
                  <span className="result_name">{user.firstName} {user.name}</span>
                </div>
              </Link>
            ))
          }
        </div>)
        : null
      }
    </div>
  )
}
