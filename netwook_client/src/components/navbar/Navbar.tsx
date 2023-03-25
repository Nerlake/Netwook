import React from 'react'
import './navbar.css'
import leo from '../../assets/leo.jpg'
import { Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar_container">
            <Link to={"/"} className="link"><span className="navbar_logo">NetWook</span></Link>
            <div className="navbar_searchbar_container">
                <input type="text" className="navbar_searchbar" placeholder="Search"/>
            </div>
            <div className="navbar_list_menu">
                <Link to={"/"} className="link"> <a className="navbar_menu_item">Feed</a></Link>
                <Link to={"/"} className="link"><a className="navbar_menu_item"><Notifications/></a></Link>
                <Link to={"/login"} className="link"><a className="navbar_menu_item"><Chat/></a></Link>
                <Link to={"/profil"} className="link"><a className="navbar_menu_item_logo"><img src={leo} alt="profil picture"/></a></Link>
            </div>
        </div>
    </div>
  )
}
