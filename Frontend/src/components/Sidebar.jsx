import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ⬅️ import auth context
import img from './image.png';

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Offcanvas Toggle for small screens */}
      <button
        className="btn btn-outline-primary d-md-none m-5"
        type="button"
        onClick={() => setShow(true)}
      >
        ☰ Menu
      </button>

      {/* Fixed Sidebar for medium and larger screens */}
      <div
        className="sidebar d-none d-md-block bg-light border-end p-3"
        style={{
          marginTop: '30px',
          marginBottom: '30px',
          width: '340px',
          minHeight: '80vh',
          background: 'linear-gradient(180deg, #fbc2eb 0%, #a18cd1 100%)',
          boxShadow: '2px 0 12px rgba(161,140,209,0.10)',
          borderRadius: '20px',
        }}
      >
        <h5 className="mb-4 fw-bold" style={{ color: "#a18cd1", letterSpacing: "2px" }}>
          <span
            style={{
              borderRadius: "50%",
              padding: "6px 14px",
              marginRight: "10px",
              fontSize: "1.3rem",
            }}
          >
          <img  src={img} alt="Logo" style={{ height: "44px", width: "44px",borderRadius: "50%"}} />
          </span>
          Menu
        </h5>
        <SidebarLinks />
      </div>

      {/* Offcanvas for smaller screens */}
      <div
        className={`offcanvas offcanvas-start ${show ? 'show' : ''}`}
        tabIndex="-1"
        style={{ visibility: show ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
        </div>
        <div className="offcanvas-body">
          <SidebarLinks onLinkClick={() => setShow(false)} />
        </div>
      </div>
      {/* Inline CSS for hover and active effect */}
      <style>
        {`
          .sidebar .nav-link {
            color: #6c3483;
            font-weight: 500;
            font-size: 1.08rem;
            border-radius: 12px;
            margin-bottom: 8px;
            padding: 10px 18px;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          }
          .sidebar .nav-link:hover {
            background: rgba(255,255,255,0.25);
            color: #fff !important;
            box-shadow: 0 2px 8px rgba(161,140,209,0.10);
          }
          .sidebar .active-nav {
            background: #fff !important;
            color: #a18cd1 !important;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(161,140,209,0.10);
          }
        `}
      </style>
    </>
  );
}

// Separate reusable component for links
function SidebarLinks({ onLinkClick }) {
  const { loggedIn } = useAuth();
  const location = useLocation();

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <ul className="nav flex-column">
      {loggedIn ? (
        <>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/dashboard") ? "active-nav" : ""}`}
              to="/dashboard"
              onClick={onLinkClick}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/profile") ? "active-nav" : ""}`}
              to="/profile"
              onClick={onLinkClick}
            >
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/planner") ? "active-nav" : ""}`}
              to="/planner"
              onClick={onLinkClick}
            >
              Day Planner
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/emotion") ? "active-nav" : ""}`}
              to="/emotion"
              onClick={onLinkClick}
            >
              Emotion Detector
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
              to="/about"
              onClick={onLinkClick}
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
              onClick={onLinkClick}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
              to="/about"
              onClick={onLinkClick}
            >
              About
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}