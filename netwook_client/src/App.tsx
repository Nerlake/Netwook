import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Skeleton from './components/Skeleton/Skeleton'
import Accueil from './pages/Accueil/Accueil'

function App() {
  const [count, setCount] = useState(0)

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
