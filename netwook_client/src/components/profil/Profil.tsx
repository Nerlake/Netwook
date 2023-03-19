import React from 'react'
import leo from '../../assets/leo.jpg'
import './profil.css'
import background from '../../assets/background.jpg'

export default function Profil() {
  return (
    <div className='profil'>
        <div className="profil_header">
            <img src={background} alt="" className="profil_header_background" />
            <img src={leo} alt="profil picture" className="profil_header_photo" />
            <div className="profil_infos">
                <div className="profil_header_name">Léo HOTZ <button className='profil_header_button'>Ajouter</button>                <div className="profil_header_stats">265 amis</div></div>
                <div className="profil_header_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</div>

            </div>
        </div>
    </div>
  )
}
