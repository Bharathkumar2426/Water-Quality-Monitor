import { useEffect, useState } from "react";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem("token");



  useEffect(() => {
    fetch("http://127.0.0.1:8000/reports", {
      headers: {

        Authorization: `Bearer ${token}`,

      },
    })
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Reports error:", err));
  }, []);

    useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch("http://127.0.0.1:8000/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setUserRole(data.user.role);
    }
  };

  fetchUser();
}, []);


  const handleAction = async (reportId, action) => {
  try {

    const res = await fetch(
      `http://127.0.0.1:8000/reports/${reportId}/action`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ action }),
      }
    );


    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Action failed");
      return;
    }

    // Update status locally

    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: action } : r
      )
    );


  } catch (error) {
    console.error("Action error:", error);
    alert("Server error");
  }
};


  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-semibold text-slate-700 mb-6">
        Reports
      </h3>

      {reports.length === 0 && (
        <p className="text-slate-500">No reports found</p>
      )}

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
          >
            <p className="mb-1">
              <span className="font-medium">Location:</span>{" "}
              {report.location}
            </p>

            <p className="mb-1">
              <span className="font-medium">Water Source:</span>{" "}
              {report.water_source}
            </p>

            <p className="mb-2">
              <span className="font-medium">Description:</span>{" "}
              {report.description}
            </p>

            <p className="mb-3">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  report.status === "pending"
                    ? "text-orange-500"
                    : report.status === "verified"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {report.status}
              </span>
            </p>


            {userRole === "authority" && report.status === "pending" && (

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleAction(report.id, "verified")
                  }
                  className="px-4 py-1.5 rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Verify
                </button>

                <button
                  onClick={() =>
                    handleAction(report.id, "rejected")
                  }
                  className="px-4 py-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
