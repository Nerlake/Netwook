import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Profil from '../../components/profil/Profil'
import './profilpage.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ProfilPage({ userId }) {


  const [isPrivate, setIsPrivate] = useState(false)

  //import redux user
  const myProfile = useSelector((state) => state.user)
  const [isFriend, setIsFriend] = useState(false);


  return (
    <div className="App">
      <Navbar />
      <div className="page_container">
        <Profil userId={userId} setIsPrivate={setIsPrivate} isPrivate={isPrivate} isFriend={isFriend} setIsFriend={setIsFriend} />
        <div className="feed_content">
          <DisplayFeed isPrivate={isPrivate} myProfile={myProfile} isFriend={isFriend} />
        </div>
      </div>
    </div>
  )
}


// affiche de Feed si le profil n'est pas privé et 
function DisplayFeed({ isPrivate, myProfile, isFriend }) {

  // recupération de l'id de l'url
  const { id } = useParams();

  if (isPrivate && (isFriend || myProfile._id === id)) {
    console.log("private / friend or my profile");
    return (
      <div>
        <Feed />
      </div>
    )
  }

  else if (!isPrivate) {
    return (
      <div>
        <Feed />
      </div>
    )
  }

  else {
    return (
      <div>
        <h3>This account is private</h3>
      </div>
    )
  }
}
