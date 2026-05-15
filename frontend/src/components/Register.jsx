import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
           avatar: formData.avatar,
        }),
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
        Register
      </legend>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <label className="label">Name</label>
      <input
        type="text"
        name="name"
        className="input w-full"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

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

      <label className="label">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        className="input w-full"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <label className="label w-full">Profile Picture URL (Optional)</label>
        <input
          type="text"
          name="avatar"
          className="input w-full"
          placeholder="https://..."
          value={formData.avatar}
          onChange={handleChange}
        />

      <button
        className="btn btn-neutral mt-4 bg-[#4E148C]"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </fieldset>
  );
}
