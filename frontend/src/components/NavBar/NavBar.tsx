import { useNavigate } from "react-router-dom";

// Contains title of webpage, User Dropdown, settings

// TODO : Add 

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav 
    className="flex gap-3"
    >
      <button onClick={() => navigate("/home")}>Pixel Stitch</button>
      <button onClick={() => navigate("/gallery")}>Gallery</button>
      <button onClick={() => navigate("/settings")}>Settings</button>
      <button onClick={() => navigate("/create-tapestry")}>Create</button>
      <button onClick={() => navigate("/project")}>My Projects</button>
    </nav>
  )
}
export default NavBar;