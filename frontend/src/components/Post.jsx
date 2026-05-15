import { NavLink } from "react-router";

export default function Post({ post }) {
  return (
    <NavLink to={`/posts/${post._id}`} className="w-full max-w-2xl">
      <div className="card card-side bg-[#280948] text-white shadow-sm w-full rounded-xl cursor-pointer hover:scale-[1.02] transition-transform">
        <figure className="shrink-0" >
          <img
            className="w-80 h-80 object-cover"
            src={post.imageUrl}
            alt={post.title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/200x200/280948/FFCE1F?text=No+Image";
            }}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <hr />
          <p className="line-clamp-2">{post.description}</p>

          <div className="flex items-center gap-2 mt-2">
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
            <span className="text-sm">{post.author?.name}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
