import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts({ setDashboardView }) {
  const [alerts, setAlerts] = useState([]);

  

  // ✅ Load alerts when page opens
  useEffect(() => {
  const loadAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/alerts");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  loadAlerts();
}, []);


  // ✅ When clicking create report
  const handleCreateReport = (alertId) => {
    localStorage.setItem("selectedAlertId", alertId);
    setDashboardView("submit");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Water Alerts</h1>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts available</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-100 border border-red-400 p-4 rounded-lg mb-4"
          >
            <h2 className="text-lg font-semibold text-red-700">
              {alert.alert_type}
            </h2>

            <p className="mt-2">{alert.message}</p>

            <p className="text-sm text-gray-600 mt-1">
              Location: {alert.location}
            </p>

            <p className="text-sm text-gray-600">
              Station ID: {alert.station_id}
            </p>

            {alert.report_id ? (
              <p className="text-green-600 font-semibold mt-2">
                Report Submitted
              </p>
            ) : (
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleCreateReport(alert.id)}
              >
                Create Report
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
