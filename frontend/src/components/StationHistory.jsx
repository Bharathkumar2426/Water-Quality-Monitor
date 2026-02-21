import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

export default function StationHistory() {
  const [readings, setReadings] = useState([]);
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState(null);


  useEffect(() => {
  const fetchStations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/stations");

const stationsWithReadings = [];

for (let station of response.data) {
  try {
    const readingsResponse = await axios.get(
      `http://localhost:8000/stations/${station.id}/readings`
    );

    if (readingsResponse.data.length > 0) {
      stationsWithReadings.push(station);
    }
  } catch (error) {
    console.error("Error checking station readings",error);
  }
}

setStations(stationsWithReadings);

if (stationsWithReadings.length > 0) {
  setStationId(stationsWithReadings[0].id);
}

    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  fetchStations();
}, []);
  useEffect(() => {
  if (!stationId) return;

  const fetchReadings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/stations/${stationId}/readings`
      );

      setReadings(response.data);   // ✅ THIS LINE MUST EXIST

    } catch (error) {
      console.error("Error fetching readings:", error);
    }
  };

  fetchReadings();
}, [stationId]);




  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Station 1 Historical Data
      </h1>
      <select
      value={stationId || ""}
      onChange={(e) => setStationId(e.target.value)}
      className="border p-2 mb-4"
    >
      {stations.map((station) => (
        <option key={station.id} value={station.id}>
          {station.name}
        </option>
      ))}
    </select>

      {readings.length === 0 ? (
        <p>No readings available</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={readings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recorded_at" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              name="Parameter Value"
            />
            <ReferenceLine
            y={8.5}
            stroke="red"
            label="Threshold"
            />

          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
