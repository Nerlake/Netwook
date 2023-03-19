import React from 'react'
import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Profil from '../../components/profil/Profil'
import './profilpage.css'

export default function ProfilPage() {
  return (
    <div className="App">
      <Navbar/>
      <div className="page_container">
        <Profil/>
        <Feed/>
      </div>
    </div>
  )
}
