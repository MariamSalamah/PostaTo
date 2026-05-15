import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-around items-center py-8">
      <NavLink to="/">
        <img className="w-20 h-20" src={logo} alt="logo" />
      </NavLink>

      
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-[#FFCE1F] font-semibold">Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md xl:btn-lg bg-[#FFCE1F] border-none shadow-none"
          >
            Logout
          </button>
        </div>
      ) : (
        <NavLink
          to="/login-or-register"
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md xl:btn-lg bg-[#FFCE1F] border-none shadow-none"
        >
          Login/Register
        </NavLink>
      )}
    </div>
  );
}
