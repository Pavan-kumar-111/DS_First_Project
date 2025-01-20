import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure this path is correct
import './scss/Header.scss';
import logo from '../assets/images/Asha_logo.png';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { isLoggedIn, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflow = menuActive ? "auto" : "hidden";
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setMenuActive(false); 
      navigate("/login");
    }
  };

  const homeLink = isLoggedIn
    ? userRole === "ADMIN"
      ? "/admin"
      : userRole === "DOCTOR"
      ? "/doctor/dashboard"
      : "/home"
    : "/";

  useEffect(() => {
    if (isLoggedIn && userRole) {
      const expectedPath =
        userRole === "ADMIN"
          ? "/admin"
          : userRole === "DOCTOR"
          ? "/doctor/dashboard"
          : "/home";

      const publicPaths = ["/search", "/doctors"];
      if (
        location.pathname !== expectedPath &&
        !publicPaths.includes(location.pathname)
      ) {
        navigate(expectedPath);
      }
    }
  }, [isLoggedIn, userRole, location.pathname, navigate]);

  return (
    <header className="header">
      <div
        className="header__menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </div>

      <div className="header__logo">
        <Link to={homeLink}>
          <img src={logo} alt="Asha Logo" className="header__logo-img" />
        </Link>
      </div>

      <nav className={`header__nav ${menuActive ? "active" : ""}`}>
        <div className="header__links">
          <Link to={homeLink} className="header__link">
            Home
          </Link>
        </div>
        <Link to="/search" className="header__link">
          Find Doctors
        </Link>
        <a href="#video-consult" className="header__link">
          Video Consult
        </a>
        <a href="#surgeries" className="header__link">
          Surgeries
        </a>
        <a href="#contact-us" className="header__link">
          Contact Us
        </a>
        <a href="#help-center" className="header__link">
          Help Center
        </a>
      </nav>

      <div className="header__buttons">
        {isLoggedIn ? (
          <button className="header__buttons-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/register">
              <button className="header__buttons-btn">Signup</button>
            </Link>
            <Link to="/login">
              <button className="header__buttons-btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
