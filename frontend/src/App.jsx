import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import NewPost from "./pages/NewPost";
import AddButton from "./components/AddButton";
import PostDetails from "./pages/PostDetails";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-or-register" element={<LoginRegister />} />
        <Route path="/create-post" element={<NewPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<NewPost />} />
      </Routes>
      {user && <AddButton />}
    </>
  );
}

export default App;
