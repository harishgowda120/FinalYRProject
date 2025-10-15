// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./image.png";

export default function Sidebar() {
  return (
    <>
      {/* Fixed Sidebar visible only on md and larger screens */}
      <aside
        className="sidebar d-none d-md-block bg-light border-end p-3"
        aria-label="Primary"
      >
        <h5 className="mb-4 fw-bold sidebar-title">
          <span className="sidebar-logo">
            <img src={img} alt="Logo" className="sidebar-logo-img" />
          </span>
          Menu
        </h5>

        <SidebarLinks />
      </aside>

      {/* Inline CSS */}
      <style>{`
        /* ---------- Sidebar (desktop only) ---------- */
        .sidebar {
          margin-top: 30px;
          margin-bottom: 30px;
          width: 340px;
          min-height: 80vh;
          background: linear-gradient(180deg, #fbc2eb 0%, #a18cd1 100%);
          box-shadow: 2px 0 12px rgba(161,140,209,0.10);
          border-radius: 20px;
        }

        .sidebar-title {
          color: #a18cd1;
          letter-spacing: 2px;
        }

        .sidebar-logo {
          display: inline-block;
          border-radius: 50%;
          padding: 6px 14px;
          margin-right: 10px;
          font-size: 1.3rem;
          vertical-align: middle;
        }

        .sidebar-logo-img {
          height: 44px;
          width: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Sidebar link styles */
        .sidebar .nav-link {
          color: #6c3483;
          font-weight: 500;
          font-size: 1.08rem;
          border-radius: 12px;
          margin-bottom: 8px;
          padding: 10px 18px;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.12s;
        }

        .sidebar .nav-link:hover {
          background: rgba(255,255,255,0.25);
          color: #fff !important;
          box-shadow: 0 2px 8px rgba(161,140,209,0.10);
          transform: translateY(-1px);
        }

        .sidebar .active-nav {
          background: #fff !important;
          color: #a18cd1 !important;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(161,140,209,0.10);
        }

        /* Hide sidebar completely on small screens */
        @media (max-width: 767.98px) {
          .sidebar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ---------- SidebarLinks component ---------- */
function SidebarLinks() {
  const { loggedIn } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <ul className="nav flex-column">
      {loggedIn ? (
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

          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
              to="/about"
            >
              About
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active-nav" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>

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
  );
}
