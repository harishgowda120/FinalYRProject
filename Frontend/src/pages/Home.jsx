import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      <Sidebar />
      <div
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
        style={{
          padding: "30px 0",
          background: "#fff",
          borderRadius: "32px",
          margin: "30px",
          boxShadow: "0 8px 32px rgba(161,140,209,0.15)",
        }}
      >
        <div
          className="text-center mb-5"
          style={{
            background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            boxShadow: "0 2px 8px rgba(161,140,209,0.10)",
            fontSize: "3.5rem",
            color: "#fff",
          }}
        >
          🗓️
        </div>
        <h2
          className="fw-bold mb-3"
          style={{
            color: "#a18cd1",
            fontSize: "2.7rem",
            letterSpacing: "2px",
          }}
        >
          Welcome to AI-Powered Day Planner
        </h2>
        <p className="lead mb-4" style={{ color: "#6c3483", fontSize: "1.25rem" }}>
          Your personalized assistant that adapts your daily plan based on your emotions.<br />
          Boost your productivity and well-being with smart, emotion-aware scheduling.
        </p>
        <div className="row w-100 justify-content-center mb-5">
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  🎭 Emotion Detection
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Uses your webcam and AI to detect your mood in real-time, helping you plan your day according to how you feel.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  📅 Smart Planner
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Get personalized task recommendations, reminders, and productivity tips. Integrate with Google Calendar for seamless scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 justify-content-center mb-5">
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  📊 Dashboard & Analytics
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Track your emotional trends and productivity over time with a user-friendly dashboard and insightful analytics.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  🔒 Privacy First
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Your webcam data is never stored or shared. All emotion detection is processed locally for your privacy and security.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 justify-content-center mb-5">
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  🚀 Productivity Boost
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Receive actionable tips and reminders tailored to your emotional state to maximize your daily output.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  🏆 Goal Tracking
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Set, track, and achieve your goals. Get reminders and progress analytics to help you stay on track.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 justify-content-center mb-5">
          <div className="col-md-10 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "18px", background: "rgba(161,140,209,0.07)" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#a18cd1" }}>
                  🤝 Collaboration & Team Features
                </h5>
                <p style={{ color: "#6c3483" }}>
                  Collaborate with friends or colleagues, share your planner, and motivate each other to reach your goals together.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="alert alert-info w-75 text-center shadow-sm" style={{ fontSize: "1.1rem", borderRadius: "16px" }}>
          <strong>Tip:</strong> Start your day with a quick emotion scan and let DayPlanner AI guide you to a more productive and happier day!
        </div>
        <div className="mt-5 text-center" style={{ color: "#6c3483", fontSize: "1.15rem" }}>
          <strong>Made by Harish Gowda N</strong> | East West College of Engineering, Bangalore
        </div>
      </div>
    </div>
  );
}