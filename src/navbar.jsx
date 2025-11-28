import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.css";

export default function Navbar({ scrollHandlers }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goAndScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollHandlers[section](), 150);
    } else {
      scrollHandlers[section]();
    }
  };

  return (
    <nav className="nav">
      <div className="logo">
        <img src="/images/Logo.png" /><span>&nbsp;&nbsp;MEDITRUST</span>
      </div>

      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-btn">☰</label>

      <ul className="nav-links">
        <div className="nav-cont1">
          <li onClick={() => goAndScroll("home")}>Home</li>
          <li onClick={() => goAndScroll("services")}>Services</li>
          <li onClick={() => goAndScroll("about")}>About</li>
          <li onClick={() => goAndScroll("contact")}>Contact</li>
        </div>
        <div className="nav-cont2">
          <li><Link to="/dashboard" className="nav-btn">Book Appointment</Link></li>
        </div>
      </ul>
    </nav>
  );
}
