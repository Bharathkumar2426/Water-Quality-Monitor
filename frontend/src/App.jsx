import { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("citizen");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const login = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      loadUser();
    } catch {
      alert("Backend not reachable");
    }
    setLoading(false);
  };

  const register = async () => {
    if (!name || !email || !password || !location) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          location,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registration successful. Please login.");
      setActiveTab("login");
    } catch {
      alert("Backend not reachable");
    }
    setLoading(false);
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);


  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-96 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-center mb-4">
            Dashboard
          </h2>
          <div className="text-sm space-y-2">
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
          </div>
          <button
            onClick={logout}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-2 text-center font-medium ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 py-2 text-center font-medium ${
              activeTab === "register"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <div className="space-y-4">
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border rounded-lg p-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </div>
        )}

        {/* REGISTER FORM */}
        {activeTab === "register" && (
          <div className="space-y-3">
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border rounded-lg p-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <select
              className="w-full border rounded-lg p-2"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="citizen">Citizen</option>
              <option value="ngo">NGO</option>
              <option value="authority">Authority</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={register}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
