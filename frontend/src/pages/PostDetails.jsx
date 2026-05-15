import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function PostDetails() {
  const { id } = useParams(); 
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API}/api/posts/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`${API}/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");
      navigate("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-[#FFCE1F]"></span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const isOwner = user && user.id === post.author?._id;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 m-0">
      <div className="card bg-[#280948] text-white shadow-sm w-full max-w-2xl rounded-xl">
        <figure>
          <img
            className="w-full h-64 object-cover rounded-t-xl"
            src={post.imageUrl}
            alt={post.title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x400/280948/FFCE1F?text=No+Image";
            }}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl">{post.title}</h2>
          <hr />
          <p className="my-6">{post.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Written by</span>
           {post.author?.avatar ? (
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={post.author.avatar}
              alt={post.author.name}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#4E148C] flex items-center justify-center text-[#FFCE1F] font-bold">
              {post.author?.name?.charAt(0).toUpperCase()}
            </div>
          )}
            <span>{post.author?.name}</span>
          </div>

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <NavLink
                to={`/posts/${id}/edit`}
                className="btn bg-[#4E148C] text-white border-none shadow-none"
              >
                Edit
              </NavLink>
              <button
                onClick={handleDelete}
                className="btn bg-[#800020] text-white border-none shadow-none"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
