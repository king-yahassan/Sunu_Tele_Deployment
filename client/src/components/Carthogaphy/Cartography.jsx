import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import mapData from "../../Services/FriendsHouses.json";
import "leaflet/dist/leaflet.css";
import NavBar from '../../Layouts/BaseLayouts/NavBar';

import mapData2 from '../../Services/Auth/TestCarto';


function Cartography() {
  const center = [14.759361735373773, -17.368916673086215];
  const center2 = [14.740504779610625, -17.46891569146001]
  const [inputValue, setInputValue] = useState('');
  const [newData, setNewData] = useState(mapData2)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHouse = inputValue;
    setInputValue('');

    const updatedData = [...newData, newHouse];
    setNewData(updatedData);
  };

  return (
    <div>
      <NavBar
        connection="Logout"
        home="Home"
        subscriber="Abonnées"
        comptablity="Comptablité"
        role="Role"
        historical="Historique"
        cartography="Cartographie"
      />
      <div>
        <h1 style={{ textAlign: "center" }}> Friends' Houses</h1>
        <div style={{ display: "flex" }}>
          <p>
            <a href='https://geojson.io/#map=15.72/14.760699/-17.368601' style={{ color: "#000", margin: "30px", background: "#fff", padding: "15px", borderRadius: "5px" , textDecoration : "none"}}>Marquer une nouvelle maison</a>
          </p>
          <input
            style={{ color: "#000", background: "#fff", borderRadius: "5px", height: "50px" }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <h4
            style={{ color: "#000", margin: "0 30px", background: "#fff", padding: "15px", borderRadius: "5px" }}
            onClick={handleSubmit}> Ajouter </h4>
        </div>

      </div>
      <div>
        <MapContainer
          style={{ width: "100vw", height: "87vh", position: "relative", top: "20px" }}
          center={center}
          zoom={16}
        >
          {/* Ajoutez la couche de tuiles satellite en plus de la couche de tuiles par défaut */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />

          {/* {mergedObject.features.map((house, index) => { */}
          {mapData2.map((cordonne) => cordonne.features.map((house, index) => {
            const coordinates = house.geometry.coordinates[0].map((item) => [item[1], item[0]]);
            const position = coordinates[0];

            const polygon = (
              <Polygon
                key={index}
                pathOptions={{
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: 'white',
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      dashArray: "",
                      fillColor: "#BD0026",
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      color: "white",
                    });
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 2,
                      dashArray: "3",
                      color: 'white',
                      fillColor: '#FD8D3C',
                    });
                  },
                }}
              />
            );

            const marker = (
              <Marker key={index} position={position}>
                <Popup>
                  Abonné
                </Popup>
              </Marker>
            );

            return (
              <React.Fragment key={index}>
                {polygon}
                {marker}
              </React.Fragment>
            );
          }))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Cartography;
