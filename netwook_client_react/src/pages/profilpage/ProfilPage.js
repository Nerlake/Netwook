import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Profil from '../../components/profil/Profil'
import './profilpage.css'
import { useSelector } from 'react-redux'

export default function ProfilPage({ userId }) {

  const [id, setId] = useState()
  const [type, setType] = useState("")

  // import de redux
  const userDetails = useSelector((state) => state.user)



  console.log(userId)
  return (
    <div className="App">
      <Navbar />
      <div className="page_container">
        <Profil userId={userId} />
        <div className="feed_content">
          <Feed />
        </div>
      </div>
    </div>
  )
}
