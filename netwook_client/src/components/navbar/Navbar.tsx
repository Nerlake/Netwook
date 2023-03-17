import React from 'react'
import './navbar.css'
import leo from '../../assets/leo.jpg'

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar_container">
            <span className="navbar_logo">NetWook</span>
            <div className="navbar_searchbar_container">
                <input type="text" className="navbar_searchbar" placeholder="Search"/>
            </div>
            <div className="navbar_list_menu">
                <a className="navbar_menu_item">Feed</a>
                <a className="navbar_menu_item">Notifications</a>
                <a className="navbar_menu_item">Messages</a>
                <a className="navbar_menu_item_logo"><img src={leo} alt="profil picture"/></a>
            </div>
        </div>
    </div>
  )
}
