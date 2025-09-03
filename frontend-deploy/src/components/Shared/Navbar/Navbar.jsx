//src/components/Navbar/Navbar.jsx


import { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/" className="navbar__home">Home</Link>
        </div>

        <div className="navbar__right">
          <button
            type="button"
            className="navbar__hamburger"
            onClick={toggleMenu}
          >
            ☰
          </button>

          <ul className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
            <li><Link className="navbar__link" to="/news">News</Link></li>
            <li><Link className="navbar__link" to="/event-reports">Reports</Link></li>
            <li><Link className="navbar__link" to="/calendar">Calendar</Link></li>
          </ul>

          {/* ✅ Dark Mode Toggle here */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
