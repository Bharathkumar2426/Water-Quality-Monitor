import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function Stations() {
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    managed_by: ""
  });

  useEffect(() => {
    async function loadStations() {
      try {
        const res = await fetch(`${API_URL}/stations`);
        const data = await res.json();
        setStations(data);
      } catch (err) {
        console.error("Error fetching stations", err);
      }
    }

    loadStations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to add stations");
        return;
      }

      const res = await fetch(`${API_URL}/stations`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude)
      })
    });


      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Error adding station");
        return;
      }

      alert("Station added successfully");
      setForm({
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        managed_by: ""
      });

      // reload stations after submit
      async function reloadStations() {
        const res = await fetch(`${API_URL}/stations`);
        const data = await res.json();
        setStations(data);
      }

      reloadStations();
    } catch (err) {
      console.error("Error submitting station", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Water Stations
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          name="managed_by"
          placeholder="Managed By"
          value={form.managed_by}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 md:col-span-2"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
        >
          Add Station
        </button>
      </form>

      <hr className="mb-6" />

      <ul className="space-y-3">
        {stations.map((s) => (
          <li
            key={s.id}
            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
          >
            <p className="font-medium">{s.name}</p>
            <p className="text-sm text-slate-600">
              {s.location} ({s.latitude}, {s.longitude})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
