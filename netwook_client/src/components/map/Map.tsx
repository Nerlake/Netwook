import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import L from 'leaflet';

export default function Map() {
      const [map, setMap] = useState(null);

  useEffect(() => {
    // Créez la carte Leaflet ici
    const leafletMap = L.map('map').setView([51.505, -0.09], 13);

    // Ajoutez une couche de tuiles à la carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(leafletMap);

    // Stockez la carte dans l'état local
    setMap(leafletMap);

    // Nettoyez la carte lorsque le composant est démonté
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);
  return (
        <div className="App">
      <Navbar/>
      <div className="page_container">
        <div id="map"></div>
      </div>
    </div>
  )
}
