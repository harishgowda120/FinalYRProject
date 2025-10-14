export default function Footer() {
  return (
    <footer
      className="pt-4 mt-auto"
      style={{
        background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
        color: "#fff",
        boxShadow: "0 -2px 8px rgba(161,140,209,0.10)",
        borderTop: "2px solid #fff",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div className="container">
        <div className="row text-start py-3">
          {/* Brand & Description */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  padding: "6px 14px",
                  marginRight: "10px",
                  fontSize: "1.7rem",
                }}
              >
                🗓️
              </span>
              DayPlanner AI
            </h5>
            <p className="small mb-2">
              <i className="bi bi-robot me-2"></i>
              Emotion-aware daily planner that adapts to your feelings.
            </p>
            <p className="small mb-2">
              <i className="bi bi-lightning-fill me-2"></i>
              Boost productivity with smart, personalized scheduling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <i className="bi bi-house-door me-2"></i>
                <a href="/" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-info-circle me-2"></i>
                <a href="/about" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-question-circle me-2"></i>
                <a href="/faq" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-speedometer2 me-2"></i>
                <a href="/dashboard" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Contact
            </h6>
            <p className="small mb-2">
              <i className="bi bi-person-circle me-2"></i>
              Harish Gowda N
            </p>
            <p className="small mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              East West College of Engineering, Bangalore
            </p>
            <p className="small mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="mailto:harishgowda@example.com" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                harishgowda@example.com
              </a>
            </p>
            <p className="small mb-2">
              <i className="bi bi-linkedin me-2"></i>
              <a href="https://linkedin.com/in/harishgowda" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none fw-semibold" style={{ transition: "color 0.2s" }}>
                linkedin.com/in/harishgowda
              </a>
            </p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom Note */}
        <div className="text-center pb-3 small" style={{ letterSpacing: "1px" }}>
          <i className="bi bi-c-circle me-1"></i>2025 <strong>DayPlanner AI</strong> – Built with
          <i className="bi bi-heart-fill text-danger mx-1"></i>
          by Harish Gowda N. All rights reserved.
        </div>
      </div>
    </footer>
  );
}