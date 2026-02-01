import { useState } from "react";

export default function ReportForm() {
  const [location, setLocation] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const submitReport = () => {
    fetch("http://127.0.0.1:8000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        location: location,
        water_source: waterSource,
        description: description,
        photo_url: "demo.jpg",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit report");
        }
        return res.json();
      })
      .then(() => {
        alert("Report submitted successfully");
        setLocation("");
        setWaterSource("");
        setDescription("");
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting report");
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-semibold text-slate-700 mb-6">
        Submit Report
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="Water Source"
          value={waterSource}
          onChange={(e) => setWaterSource(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={submitReport}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
