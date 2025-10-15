import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./image.png";

export default function Navbar() {
  const { loggedIn, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg px-4 fixed-top"
      style={{
        padding: "0 30px",
        minHeight: "70px",
        background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
        boxShadow: "0 2px 8px rgba(161,140,209,0.15)",
        borderBottom: "2px solid #fff",
      }}
    >
      <Link
        className="navbar-brand d-flex align-items-center"
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "#fff",
          letterSpacing: "2px",
        }}
      >
        <span
          style={{
            borderRadius: "50%",
            padding: "6px 14px",
            marginRight: "10px",
            fontSize: "1.7rem",
          }}
        >
          <img
            src={img}
            alt="Logo"
            style={{ height: "54px", width: "54px", borderRadius: "50%" }}
          />
        </span>
        DayPlanner AI
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ border: "none" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {loggedIn ? (
            <>
              {/* User name visible in both views */}
              <li className="nav-item">
                <span
                  className="nav-link text-light"
                  style={{
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginRight: "10px",
                  }}
                >
                  👋 {user.name}
                </span>
              </li>

              {/* MOBILE-ONLY ROUTES */}
              {isMobile && (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/dashboard") ? "active-nav" : ""}`}
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/profile") ? "active-nav" : ""}`}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/planner") ? "active-nav" : ""}`}
                      to="/planner"
                    >
                      Day Planner
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/emotion") ? "active-nav" : ""}`}
                      to="/emotion"
                    >
                      Emotion Detector
                    </Link>
                  </li>
                </>
              )}

              {/* About - visible on both views */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>

              {/* Logout for both */}
              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm ms-2"
                  style={{
                    borderRadius: "20px",
                    fontWeight: "bold",
                    color: "#a18cd1",
                    boxShadow: "0 2px 6px rgba(161,140,209,0.10)",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Not logged in - show login/signup on both */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/login") ? "active-nav" : ""}`}
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/signup") ? "active-nav" : ""}`}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>

              {/* About - visible always */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Inline CSS for hover and active effect */}
      <style>
        {`
          .nav-link {
            color: #fff;
            font-weight: 500;
            font-size: 1.1rem;
            margin-right: 10px;
            border-radius: 12px;
            transition: background 0.2s, color 0.2s;
          }

          .nav-link:hover {
            background: rgba(255,255,255,0.15);
            color: #a18cd1 !important;
          }

          .active-nav {
            background: #fff !important;
            color: #a18cd1 !important;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(161,140,209,0.10);
          }

          @media (max-width: 991.98px) {
            .navbar {
              background: linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%);
            }
          }
        `}
      </style>
    </nav>
  );
}
