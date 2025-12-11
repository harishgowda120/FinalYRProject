import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./image.png";

export default function Navbar() {
  const { loggedIn, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleNavItemClick = () => {
    if (isMobile) setIsCollapsed(true);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        padding: "0 15px",
        minHeight: "60px",
        background: isScrolled 
          ? "linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(13, 148, 136, 0.95) 100%)"
          : "linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled 
          ? "0 8px 32px rgba(31, 38, 135, 0.37)"
          : "0 2px 20px rgba(79, 70, 229, 0.15)",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.18)" : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1030,
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={handleNavItemClick}
          style={{
            fontWeight: "800",
            fontSize: "1.5rem",
            color: "#fff",
            letterSpacing: "1px",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.textShadow = "0 4px 8px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.textShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <span
            style={{
              background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
              borderRadius: "50%",
              padding: "6px",
              marginRight: "8px",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
              animation: "pulse 2s infinite",
            }}
          >
            <img
              src={img}
              alt="Logo"
              style={{ 
                height: "32px", 
                width: "32px", 
                borderRadius: "50%",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
              }}
            />
          </span>
          Day<span style={{color:"black"}}>PlannerAI</span>
        </Link>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          style={{ 
            border: "none",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "6px",
            padding: "6px 10px",
            backdropFilter: "blur(10px)",
            width: "40px",
            height: "40px",
          }}
          onClick={toggleNavbar}
        >
          <span 
            className="navbar-toggler-icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              transition: "transform 0.3s ease",
              transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
              width: "20px",
              height: "20px",
            }}
          ></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNav"
          style={{
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <ul className="navbar-nav ms-auto align-items-center">
            {loggedIn ? (
              <>
                {/* User welcome with animation */}
                <li className="nav-item">
                  <span
                    className="nav-link text-light d-flex align-items-center"
                    style={{
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      marginRight: "10px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "18px",
                      padding: "6px 12px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      animation: "bounceIn 0.6s ease",
                    }}
                  >
                    <span 
                      style={{
                        background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                        borderRadius: "50%",
                        padding: "3px 6px",
                        marginRight: "6px",
                        fontSize: "0.8rem",
                      }}
                    >
                      👋
                    </span>
                    {user.name}
                  </span>
                </li>

                {/* MOBILE-ONLY ROUTES */}
                {isMobile && (
                  <>
                    {["/dashboard", "/profile", "/planner", "/emotion"].map((path) => (
                      <li key={path} className="nav-item">
                        <Link
                          className={`nav-link ${isActive(path) ? "active-nav" : ""}`}
                          to={path}
                          onClick={handleNavItemClick}
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            fontSize: "0.9rem",
                            padding: "8px 12px !important",
                          }}
                        >
                          {path === "/dashboard" && "📊 Dashboard"}
                          {path === "/profile" && "👤 Profile"}
                          {path === "/planner" && "📅 Day Planner"}
                          {path === "/emotion" && "😊 Emotion Detector"}
                        </Link>
                      </li>
                    ))}
                  </>
                )}

                {/* About - visible on both views */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
                    to="/about"
                    onClick={handleNavItemClick}
                    style={{
                      fontSize: "0.9rem",
                      padding: "8px 12px !important",
                    }}
                  >
                    ℹ️ About
                  </Link>
                </li>

                {/* Logout button with enhanced styling */}
                <li className="nav-item">
                  <button
                    className="btn ms-2"
                    style={{
                      borderRadius: "20px",
                      fontWeight: "600",
                      background: "linear-gradient(45deg, #FF6B6B, #FFD700)",
                      color: "#fff",
                      border: "none",
                      padding: "6px 16px",
                      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                      transition: "all 0.3s ease",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(255, 107, 107, 0.3)";
                    }}
                    onClick={() => {
                      handleLogout();
                      handleNavItemClick();
                    }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Not logged in - enhanced login/signup */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/login") ? "active-nav" : ""}`}
                    to="/login"
                    onClick={handleNavItemClick}
                    style={{
                      fontSize: "0.9rem",
                      padding: "8px 12px !important",
                    }}
                  >
                    🔑 Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/signup") ? "active-nav" : ""}`}
                    to="/signup"
                    onClick={handleNavItemClick}
                    style={{
                      background: "linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                      marginRight: "8px",
                      fontSize: "0.9rem",
                      padding: "8px 12px !important",
                    }}
                  >
                    ✨ Signup
                  </Link>
                </li>

                {/* About - visible always */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/about") ? "active-nav" : ""}`}
                    to="/about"
                    onClick={handleNavItemClick}
                    style={{
                      fontSize: "0.9rem",
                      padding: "8px 12px !important",
                    }}
                  >
                    ℹ️ About
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Enhanced CSS Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes bounceIn {
            0% { 
              transform: scale(0.3);
              opacity: 0;
            }
            50% { 
              transform: scale(1.05);
            }
            70% { 
              transform: scale(0.9);
            }
            100% { 
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes slideInDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .nav-link {
            color: #fff !important;
            font-weight: 500;
            font-size: 0.9rem;
            margin: 0 6px;
            border-radius: 10px;
            padding: 8px 12px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid transparent;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .nav-link:hover::before {
            left: 100%;
          }

          .nav-link:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: #fff !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .active-nav {
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15)) !important;
            color: #fff !important;
            font-weight: 600;
            box-shadow: 
              0 4px 20px rgba(255, 255, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            animation: pulse 2s infinite;
          }

          .navbar-collapse {
            background: transparent !important;
          }

          @media (max-width: 991.98px) {
            .navbar {
              background: linear-gradient(135deg, #4F46E5 0%, #0D9488 100%) !important;
              backdrop-filter: blur(20px) !important;
              min-height: 60px !important;
              padding: 0 10px !important;
            }
            
            .navbar-collapse {
              background: rgba(79, 70, 229, 0.95) !important;
              backdrop-filter: blur(20px);
              border-radius: 0 0 15px 15px;
              margin-top: 8px;
              padding: 15px;
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.1);
              position: absolute;
              top: 100%;
              right: 0;
              left: auto;
              width: 250px;
              text-align: right;
            }
            
            .nav-link {
              margin: 4px 0;
              text-align: right;
              border-radius: 8px;
              justify-content: flex-end;
              font-size: 0.85rem;
              padding: 6px 10px !important;
            }
            
            .nav-item {
              margin: 6px 0;
              display: flex;
              justify-content: flex-end;
            }

            .navbar-nav {
              width: 100%;
              align-items: flex-end !important;
            }

            .navbar-toggler {
              order: 2;
              margin-left: auto;
            }

            .navbar-brand {
              order: 1;
              font-size: 1.3rem !important;
            }

            .navbar-brand img {
              height: 28px !important;
              width: 28px !important;
            }

            .navbar-brand span {
              padding: 4px !important;
            }
          }

          /* Glass morphism effect for mobile */
          @media (max-width: 991.98px) {
            .navbar-collapse.show {
              animation: slideInDown 0.5s ease-out;
            }
          }
        `}
      </style>
    </nav>
  );
}
