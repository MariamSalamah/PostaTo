import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NewPost() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); 

 const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login-or-register");
       return;
    }

    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const res = await fetch(`${API}/api/posts/${id}`);
          const data = await res.json();
          setFormData({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
          });
        } catch {
          setError("Failed to load post");
        }
      };
      fetchPost();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEditMode ? `${API}/api/posts/${id}` : `${API}/api/posts`;
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 justify-center items-center">
        <legend className="fieldset-legend text-[#4E148C] pt-16 text-lg justify-center w-full">
          {isEditMode ? "Edit Post" : "Create New Post"}
        </legend>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="label w-full">Title</label>
        <input
          type="text"
          name="title"
          className="input w-full"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
        />

        <label className="label w-full">Description</label>
        <textarea
          name="description"
          className="textarea h-32 w-full"
          placeholder="Post Description"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="label w-full">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          className="input w-full"
          placeholder="Please insert Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button
          className="btn btn-neutral mt-4 bg-[#4E148C]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Update Post" : "Create Post"}
        </button>
      </fieldset>
    </div>
  );
}
