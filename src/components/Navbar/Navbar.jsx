import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import "./Navbar.css";
import logo from "../../assets/Narendra_logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll effect for shrinking navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "affix" : ""}`}>
      <div className="navbar-container">
        <HashLink smooth to="/#home" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </HashLink>

        <div
          className={`navTrigger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`nav-list ${menuOpen ? "show_list" : ""}`}>
          <li>
            <HashLink smooth to="/#home" className="nav-link">
              Home
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#about" className="nav-link">
              About
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#skills" className="nav-link">
              Skills
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#projects" className="nav-link">
              Projects
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#resume" className="nav-link">
              Resume
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#contact" className="nav-link">
              Contact
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink to="/blogs" className="nav-link">
              Blogs
            </HashLink>
          </li>
          <li className="separator">
            <span className="nav-link no-underline">|</span>
          </li>
          <li>
            <a href="tel:+918686768685" className="nav-link no-underline">
              <i className="bi bi-telephone-fill"></i>
              <span style={{ color: "#ffd700" }}> &nbsp; +91 8686768685</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
