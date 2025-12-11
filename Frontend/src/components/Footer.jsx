import React, { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="pt-4 mt-auto"
      style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)",
        color: "#fff",
        boxShadow: "0 -8px 32px rgba(31, 38, 135, 0.37)",
        borderTop: "1px solid rgba(255, 255, 255, 0.18)",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        backdropFilter: "blur(10px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container">
        <div className="row text-start py-4">
          {/* Brand & Description */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h5 
                className="text-uppercase fw-bold mb-3 d-flex align-items-center"
                style={{ 
                  letterSpacing: "1.5px",
                  fontSize: "1.3rem",
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                    borderRadius: "50%",
                    padding: "10px 14px",
                    marginRight: "12px",
                    fontSize: "1.2rem",
                    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                    animation: "pulse 3s infinite",
                  }}
                >
                  🗓️
                </span>
                DayPlanner AI
              </h5>
              <p className="small mb-3 opacity-75" style={{ lineHeight: "1.6" }}>
                <span style={{ color: "#FFD700", marginRight: "8px" }}>🤖</span>
                <strong>Emotion-aware daily planner</strong> that adapts to your feelings in real-time.
              </p>
              <p className="small mb-0 opacity-75" style={{ lineHeight: "1.6" }}>
                <span style={{ color: "#FF6B6B", marginRight: "8px" }}>⚡</span>
                <strong>Boost productivity</strong> with AI-powered personalized scheduling.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 
              className="text-uppercase fw-bold mb-3" 
              style={{ 
                letterSpacing: "1.2px",
                background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Quick Links
            </h6>
            <ul className="list-unstyled small">
              {[
                { icon: "🏠", text: "Home", href: "/" },
                { icon: "📊", text: "Dashboard", href: "/dashboard" },
                { icon: "📅", text: "Day Planner", href: "/planner" },
                { icon: "😊", text: "Emotion Detector", href: "/emotion" },
                { icon: "👤", text: "Profile", href: "/profile" },
                { icon: "ℹ️", text: "About Us", href: "/about" }
              ].map((link, index) => (
                <li 
                  key={link.text} 
                  className="mb-2"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <span className="me-2" style={{ width: "24px", display: "inline-block" }}>
                    {link.icon}
                  </span>
                  <a 
                    href={link.href} 
                    className="text-light text-decoration-none fw-semibold d-inline-block"
                    style={{ 
                      transition: "all 0.3s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateX(8px)";
                      e.target.style.color = "#FFD700";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateX(0)";
                      e.target.style.color = "#fff";
                    }}
                  >
                    {link.text}
                    <span 
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "0",
                        width: "0",
                        height: "2px",
                        background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                        transition: "width 0.3s ease",
                      }}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Legal Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 
              className="text-uppercase fw-bold mb-3" 
              style={{ 
                letterSpacing: "1.2px",
                background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Connect & Legal
            </h6>
            
            {/* Social Media Icons */}
            <div className="mb-4">
              <p className="small fw-semibold mb-3 opacity-75">Follow Us</p>
              <div className="d-flex gap-3">
                {[
                  { 
                    icon: "📘", 
                    name: "Facebook", 
                    href: "https://facebook.com/dayplannerai",
                    color: "#1877F2"
                  },
                  { 
                    icon: "🐦", 
                    name: "Twitter", 
                    href: "https://twitter.com/dayplannerai",
                    color: "#1DA1F2"
                  },
                  { 
                    icon: "📷", 
                    name: "Instagram", 
                    href: "https://instagram.com/dayplannerai",
                    color: "#E4405F"
                  },
                  { 
                    icon: "💼", 
                    name: "LinkedIn", 
                    href: "https://linkedin.com/company/dayplannerai",
                    color: "#0A66C2"
                  },
                  { 
                    icon: "📺", 
                    name: "YouTube", 
                    href: "https://youtube.com/c/dayplannerai",
                    color: "#FF0000"
                  },
                  { 
                    icon: "💬", 
                    name: "Discord", 
                    href: "https://discord.gg/dayplannerai",
                    color: "#5865F2"
                  }
                ].map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      fontSize: "1.2rem",
                      animation: `bounceIn 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = social.color;
                      e.currentTarget.style.transform = "translateY(-5px) scale(1.1)";
                      e.currentTarget.style.boxShadow = `0 8px 25px ${social.color}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <p className="small fw-semibold mb-3 opacity-75">Legal</p>
              <div className="d-flex flex-wrap gap-3">
                {[
                  { icon: "📄", text: "Privacy Policy", href: "/privacy" },
                  { icon: "📝", text: "Terms of Service", href: "/terms" },
                  { icon: "🔒", text: "Data Security", href: "/security" },
                  { icon: "❓", text: "FAQ", href: "/faq" }
                ].map((legal, index) => (
                  <a
                    key={legal.text}
                    href={legal.href}
                    className="text-light text-decoration-none small fw-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`,
                      whiteSpace: "nowrap"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.2)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.color = "#FFD700";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.color = "#fff";
                    }}
                  >
                    <span className="me-2">{legal.icon}</span>
                    {legal.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Separator */}
        <div 
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            margin: "1rem 0",
          }}
        ></div>

        {/* Bottom Note with Enhanced Styling */}
        <div 
          className="text-center pb-3 small"
          style={{ 
            letterSpacing: "0.5px",
            opacity: 0.8,
          }}
        >
          <span className="d-inline-flex align-items-center justify-content-center w-100">
            <span 
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "8px 24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="me-1">©</span>
              {currentYear} <strong>DayPlanner AI</strong> – Built with
              <span 
                className="mx-1"
                style={{
                  animation: "heartbeat 1.5s ease-in-out infinite",
                  display: "inline-block",
                }}
              >
                ❤️
              </span>
              by 🌔. All rights reserved.
            </span>
          </span>
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

          @keyframes heartbeat {
            0% { transform: scale(1); }
            5% { transform: scale(1.1); }
            10% { transform: scale(1); }
            15% { transform: scale(1.1); }
            20% { transform: scale(1); }
            100% { transform: scale(1); }
          }

          @keyframes slideInLeft {
            from {
              transform: translateX(-20px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(20px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
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

          footer a:hover span {
            width: 100% !important;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .container > .row > div {
              text-align: center !important;
            }
            
            footer {
              text-align: center;
            }
            
            .col-lg-4 .d-flex.gap-3 {
              justify-content: center !important;
              flex-wrap: wrap;
            }
            
            .col-lg-4 .d-flex.flex-wrap.gap-3 {
              justify-content: center !important;
            }
            
            .col-lg-4 .d-flex.flex-wrap.gap-3 a {
              margin: 4px;
            }
          }

          @media (max-width: 576px) {
            .col-lg-4 .d-flex.gap-3 {
              gap: 12px !important;
            }
            
            .col-lg-4 .d-flex.gap-3 a {
              width: 40px !important;
              height: 40px !important;
              font-size: 1.1rem !important;
            }
          }
        `}
      </style>
    </footer>
  );
}
