import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data.user, data.token);
      navigate("/"); 
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 max-sm:w-[80%] sm:w-xs">
      <legend className="fieldset-legend text-[#4E148C] pt-16 text-lg justify-center w-full">
        Login
      </legend>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <label className="label">Email</label>
      <input
        type="email"
        name="email"
        className="input w-full"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="label">Password</label>
      <input
        type="password"
        name="password"
        className="input w-full"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        className="btn btn-neutral mt-4 bg-[#4E148C]"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </fieldset>
  );
}
