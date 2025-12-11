// Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./image.png";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [sidebarHeight, setSidebarHeight] = useState("80vh");
  const sidebarRef = useRef(null);

  // Update sidebar height based on content and viewport
  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      const navbarHeight = 70; // Approximate navbar height
      const availableHeight = viewportHeight - navbarHeight - 60; // 60px for margins
      setSidebarHeight(`${Math.max(availableHeight, 400)}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      {/* Fixed Sidebar visible only on md and larger screens */}
      <aside
        ref={sidebarRef}
        className="sidebar d-none d-md-block border-end p-4"
        aria-label="Primary"
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          width: "25vw", // Always 25% of viewport width
          minWidth: "280px", // Minimum width
          maxWidth: "350px", // Maximum width
          minHeight: "400px",
          height: sidebarHeight,
          background: `
            linear-gradient(135deg, 
              rgba(79, 70, 229, 0.95) 0%, 
              rgba(13, 148, 136, 0.95) 50%,
              rgba(255, 107, 107, 0.8) 100%
            )
          `,
          backdropFilter: "blur(20px)",
          boxShadow: `
            0 8px 32px rgba(31, 38, 135, 0.37),
            inset 1px 1px 0 rgba(255, 255, 255, 0.2),
            inset -1px -1px 0 rgba(0, 0, 0, 0.1)
          `,
          borderRadius: "25px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          transition: `
            all 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            height 0.3s ease
          `,
          transform: isHovered ? "translateX(10px) scale(1.02)" : "translateX(0) scale(1)",
          position: "relative",
          overflow: "hidden",
          zIndex: 1000
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        <div 
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            animation: "shimmer 8s infinite linear",
            pointerEvents: "none"
          }}
        />
        
        {/* Floating animated elements */}
        <div 
          style={{
            position: "absolute",
            top: "20%",
            right: "-30px",
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
            pointerEvents: "none"
          }}
        />

        <div 
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-20px",
            width: "60px",
            height: "60px",
            background: "radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 4s ease-in-out infinite reverse",
            pointerEvents: "none"
          }}
        />

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
              pointerEvents: "none"
            }}
          />
        ))}

        {/* Header Section */}
        <div className="sidebar-header">
          <h5 
            className="mb-4 fw-bold sidebar-title d-flex align-items-center"
            style={{ 
              color: "#fff",
              letterSpacing: "1.5px",
              fontSize: "1.4rem",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              padding: "15px 0",
              borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
              position: "relative"
            }}
          >
            <span
              style={{
                background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                borderRadius: "50%",
                padding: "12px",
                marginRight: "15px",
                boxShadow: "0 4px 20px rgba(255, 107, 107, 0.4)",
                animation: "pulseGlow 2s ease-in-out infinite",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "rotate(10deg) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <img 
                src={img} 
                alt="Logo" 
                style={{ 
                  height: "30px", 
                  width: "30px", 
                  borderRadius: "50%",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  transition: "transform 0.3s ease"
                }}
              />
            </span>
            <span style={{ 
              background: "linear-gradient(45deg, #FFD700, #FF6B6B, #667eea)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              animation: "textShimmer 3s ease-in-out infinite"
            }}>
              Navigation
            </span>
          </h5>
        </div>

        {/* Navigation Links */}
        <div className="sidebar-content" style={{ position: "relative", zIndex: 2 }}>
          <SidebarLinks activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>

        {/* Animated footer */}
        <div 
          className="sidebar-footer text-center mt-4"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "0",
            right: "0",
            padding: "0 20px"
          }}
        >
          <div 
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              padding: "10px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            {/* <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              <span style={{ animation: "pulse 2s infinite" }}>✨</span> 
              Your AI Companion
            </small> */}
          </div>
        </div>
      </aside>

      {/* Enhanced CSS Styles */}
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { 
              box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 6px 30px rgba(255, 107, 107, 0.6);
              transform: scale(1.05);
            }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(360deg); }
          }

          @keyframes textShimmer {
            0%, 100% { 
              filter: hue-rotate(0deg);
            }
            50% { 
              filter: hue-rotate(45deg);
            }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            33% { 
              transform: translateY(-15px) rotate(120deg) scale(1.1);
            }
            66% { 
              transform: translateY(10px) rotate(240deg) scale(0.9);
            }
          }

          @keyframes floatParticle {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.6;
            }
            33% { 
              transform: translateY(-20px) translateX(10px) scale(1.2);
              opacity: 1;
            }
            66% { 
              transform: translateY(10px) translateX(-10px) scale(0.8);
              opacity: 0.4;
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3) rotate(-10deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.05) rotate(5deg);
            }
            70% {
              transform: scale(0.9) rotate(-2deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes iconPulse {
            0%, 100% { 
              transform: scale(1);
            }
            50% { 
              transform: scale(1.2);
            }
          }

          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }

          .sidebar .nav-link {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500;
            font-size: 1.08rem;
            border-radius: 15px;
            margin-bottom: 8px;
            padding: 15px 20px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            backdrop-filter: blur(10px);
            border: 1px solid transparent;
            display: flex;
            align-items: center;
            text-decoration: none;
            overflow: hidden;
          }

          .sidebar .nav-link::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
          }

          .sidebar .nav-link:hover::before {
            width: 120%;
            height: 120%;
          }

          .sidebar .nav-link:hover {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(255, 255, 255, 0.05) 100%) !important;
            color: #fff !important;
            transform: translateX(8px) translateY(-2px);
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.15),
              0 4px 15px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .sidebar .nav-link:hover .shine-effect {
            left: 100%;
          }

          .sidebar .nav-link:hover .icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            background: linear-gradient(45deg, 
              rgba(255, 215, 0, 0.3), 
              rgba(255, 107, 107, 0.3)
            ) !important;
            animation: iconPulse 1s ease-in-out;
          }

          .sidebar .active-nav {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.25) 0%, 
              rgba(255, 255, 255, 0.15) 100%) !important;
            color: #fff !important;
            font-weight: 600;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.2),
              inset 2px 2px 0 rgba(255, 255, 255, 0.3),
              inset -2px -2px 0 rgba(0, 0, 0, 0.1),
              0 0 20px rgba(255, 215, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.4);
            transform: translateX(5px);
          }

          .sidebar .active-nav .icon-wrapper {
            background: linear-gradient(45deg, #FFD700, #FF6B6B) !important;
            box-shadow: 
              0 4px 15px rgba(255, 107, 107, 0.4),
              0 0 10px rgba(255, 215, 0, 0.5);
            animation: iconPulse 2s infinite;
          }

          .sidebar .active-nav .label {
            background: linear-gradient(45deg, #FFD700, #FF6B6B, #667eea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .sidebar .active-nav::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 15px;
            padding: 2px;
            background: linear-gradient(45deg, #FFD700, #FF6B6B, #667eea);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            animation: borderGlow 2s ease-in-out infinite;
          }

          @keyframes borderGlow {
            0%, 100% { 
              opacity: 0.7;
            }
            50% { 
              opacity: 1;
            }
          }

          /* Hide sidebar completely on small screens */
          @media (max-width: 767.98px) {
            .sidebar {
              display: none !important;
            }
          }

          /* Responsive adjustments */
          @media (max-width: 1200px) {
            .sidebar {
              width: 300px !important;
              min-width: 280px !important;
              max-width: 300px !important;
            }
          }

          @media (min-width: 1400px) {
            .sidebar {
              width: 25vw !important;
              max-width: 350px !important;
            }
          }
        `}
      </style>
    </>
  );
}

/* ---------- Enhanced SidebarLinks component ---------- */
function SidebarLinks({ activeItem, setActiveItem }) {
  const { loggedIn } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = loggedIn ? [
    { path: "/dashboard", label: "Dashboard", icon: "📊", emoji: "📈", description: "Your emotional overview" },
    { path: "/profile", label: "Profile", icon: "👤", emoji: "🌟", description: "Manage your account" },
    { path: "/planner", label: "Day Planner", icon: "📅", emoji: "✨", description: "Plan your perfect day" },
    { path: "/emotion", label: "Emotion Detector", icon: "😊", emoji: "🎭", description: "Check your mood" },
    { path: "/about", label: "About", icon: "ℹ️", emoji: "🚀", description: "Learn more" }
  ] : [
    { path: "/", label: "Home", icon: "🏠", emoji: "⭐", description: "Welcome page" },
    { path: "/about", label: "About", icon: "ℹ️", emoji: "🌟", description: "Learn more" }
  ];

  return (
    <ul className="nav flex-column">
      {menuItems.map((item, index) => (
        <li key={item.path} className="nav-item mb-2">
          <Link
            className={`nav-link ${isActive(item.path) ? "active-nav" : ""}`}
            to={item.path}
            style={{
              animation: `slideInFromLeft 0.6s ease-out ${index * 0.1}s both`,
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={() => setActiveItem(item.path)}
            onMouseLeave={() => setActiveItem("")}
          >
            {/* Animated background shine */}
            <div 
              style={{
                position: "absolute",
                top: 0,
                left: activeItem === item.path ? "100%" : "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                transition: "left 0.6s ease",
                borderRadius: "15px"
              }}
              className="shine-effect"
            />
            
            {/* Ripple effect on click */}
            <div className="ripple-container" style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "15px",
              overflow: "hidden",
              pointerEvents: "none"
            }} />
            
            {/* Icon with enhanced animation */}
            <span 
              className="icon-wrapper me-3 position-relative"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "45px",
                height: "45px",
                background: isActive(item.path) 
                  ? "linear-gradient(45deg, #FFD700, #FF6B6B)" 
                  : "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "1.3rem",
                animation: isActive(item.path) ? "bounceIn 0.6s ease" : "none",
                boxShadow: isActive(item.path) ? "0 4px 15px rgba(255, 107, 107, 0.4)" : "none"
              }}
            >
              {isActive(item.path) ? item.emoji : item.icon}
              
              {/* Icon glow effect */}
              {isActive(item.path) && (
                <div 
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "ripple 2s infinite"
                  }}
                />
              )}
            </span>
            
            {/* Text content */}
            <div className="d-flex flex-column">
              <span 
                className="label fw-semibold"
                style={{
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  marginBottom: "2px"
                }}
              >
                {item.label}
              </span>
              <small 
                className="opacity-75"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  transition: "all 0.3s ease"
                }}
              >
                {item.description}
              </small>
            </div>

            {/* Active indicator with enhanced animation */}
            {isActive(item.path) && (
              <div 
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "12px",
                  height: "12px",
                  background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                  borderRadius: "50%",
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
                  animation: "pulseGlow 1.5s ease-in-out infinite"
                }}
              />
            )}

            {/* Hover arrow indicator */}
            <div 
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                opacity: activeItem === item.path && !isActive(item.path) ? 1 : 0,
                transition: "all 0.3s ease",
                fontSize: "1.2rem"
              }}
            >
              →
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
