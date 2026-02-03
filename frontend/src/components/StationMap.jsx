import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function StationMap() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stations")
      .then((res) => res.json())
      .then((data) => {
        console.log("Stations:", data); // debug
        setStations(data);
      })
      .catch((err) => console.error("Station fetch error:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow">
      <h3 className="text-2xl font-semibold text-slate-700 mb-4">
        Water Stations Map
      </h3>

      <div className="w-full h-[400px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{station.name}</p>
                  <p className="text-slate-600">{station.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
