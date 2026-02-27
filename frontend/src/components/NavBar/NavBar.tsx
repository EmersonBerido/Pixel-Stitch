import { useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
// Contains title of webpage, User Dropdown, settings

// TODO : Add 

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav 
    className={style.navbar}
    >
      <h1 className="brand">Pixel Stitch</h1>
      <main className={style.navLinks}>
        <button className={style.navLink} onClick={() => navigate("/home")}>Home</button>
        <button className={style.navLink} onClick={() => navigate("/gallery")}>Gallery</button>
        <button className={style.navLink} onClick={() => navigate("/settings")}>Settings</button>
        <button className={style.navLink} onClick={() => navigate("/create-tapestry")}>Create</button>
        <button className={style.navLink} onClick={() => navigate("/project")}>My Projects</button>

      </main>
    </nav>
  )
}
export default NavBar;