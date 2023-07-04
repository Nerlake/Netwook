import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Accueil from './pages/Accueil/Accueil'
import ProfilPage from './pages/profilpage/ProfilPage'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className="page_container">
        <Accueil/>
      </div>
    </div>
  )
}

export default App
