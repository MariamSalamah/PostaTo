import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegister() {
  return (
    <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
        <Login />
      <h1 className="text-[#FFCE1F] font-bold">OR</h1>
      <Register />
    </div>
    
    // I need to try nested routes for login and register and use the same fieldset component for both with different legends

  )
}
