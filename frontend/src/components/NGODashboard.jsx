import { useEffect, useState } from "react"
import axios from "axios"

export default function NGODashboard() {

  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    ngo_name: "",
    project_name: "",
    contact_email: ""
  })

  const fetchProjects = () => {

    const token = localStorage.getItem("token")

    axios.get("http://localhost:8000/collaborations", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const token = localStorage.getItem("token")

    try {

      await axios.post(
        "http://localhost:8000/collaborations",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Collaboration created successfully!")

      setForm({
        ngo_name: "",
        project_name: "",
        contact_email: ""
      })

      fetchProjects()

    } catch (error) {
      console.error(error)
      alert("Error creating collaboration")
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold text-slate-700 mb-4">
        NGO Dashboard
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-3"
      >

        <input
          className="border rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="NGO Name"
          value={form.ngo_name}
          onChange={e => setForm({ ...form, ngo_name: e.target.value })}
        />

        <input
          className="border rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Project Name"
          value={form.project_name}
          onChange={e => setForm({ ...form, project_name: e.target.value })}
        />

        <input
          className="border rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Contact Email"
          value={form.contact_email}
          onChange={e => setForm({ ...form, contact_email: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Collaboration
        </button>

      </form>

      <h3 className="text-lg font-semibold text-slate-700 mb-3">
        Existing Projects
      </h3>

      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No collaborations yet</p>
      ) : (
        projects.map(project => (
          <div
            key={project.id}
            className="bg-white border rounded-xl shadow-sm p-4 mb-3 hover:shadow-md transition"
          >
            <strong className="text-blue-600">{project.project_name}</strong>
            <p className="text-gray-600">NGO: {project.ngo_name}</p>
            <p className="text-gray-600">Email: {project.contact_email}</p>
          </div>
        ))
      )}

    </div>
  )
}