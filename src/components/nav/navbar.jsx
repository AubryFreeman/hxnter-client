import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <button className="nav-btn" onClick={toggleMenu}>
          <div className="nav-btn-line"></div>
          <div className="nav-btn-line"></div>
          <div className="nav-btn-line"></div>
        </button>
        <div className="navbar__toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
        <div className={`navbar__menu ${isMenuOpen ? "show" : ""}`}>
          <div className="navbar__close-btn" onClick={toggleMenu}>
            <i className="fas fa-times"></i>
          </div>
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink to={"/home"} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to={"/hunt"} onClick={toggleMenu}>
                Hunt
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to={"/create"} onClick={toggleMenu}>
                Create a Hunt
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to={"/profile"} onClick={toggleMenu}>
                Profile
              </NavLink>
            </li>
            {localStorage.getItem("user_token") !== null ? (
              <li className="navbar__item">
                <button
                  className="underline text-blue-600 hover:text-purple-700"
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="navbar__item">
                  <NavLink to={"/login"} onClick={toggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink to={"/register"} onClick={toggleMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
