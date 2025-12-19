import Sidebar from '../components/Sidebar';

export default function AboutUs() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      <Sidebar />
      <div
        className="container p-4"
        style={{
          marginTop: "30px",
          marginBottom:"20px",
          marginLeft: "30px",
          marginRight:"20px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 4px 24px rgba(161,140,209,0.10)",
          minHeight: "80vh",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{
            color: "#a18cd1",
            letterSpacing: "2px",
            fontSize: "2.3rem",
          }}
        >
          About Us
        </h2>

        <div className="mb-5">
          <p className="lead" style={{ color: "#6c3483" }}>
            <strong>AI-Powered Emotion-Based Day Planner</strong> is a smart web application that helps users manage their daily activities based on their emotional state.
            Using advanced facial recognition and emotion detection technology, the system analyzes your mood in real-time and generates a personalized day plan,
            including recommended tasks, breaks, and productivity tips tailored to your emotions.
          </p>

          <h4 className="mt-4 fw-bold" style={{ color: "#a18cd1" }}>Our Mission</h4>
          <p style={{ color: "#6c3483" }}>
            To empower individuals to enhance their productivity and well-being by aligning their daily plans with how they feel.
          </p>

          <h4 className="mt-4 fw-bold" style={{ color: "#a18cd1" }}>Key Features</h4>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483" }}>Real-time emotion detection using your webcam</li>
            <li className="list-group-item" style={{ background: "rgba(248,210,252,0.10)", color: "#6c3483" }}>Personalized daily planning suggestions</li>
            <li className="list-group-item" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483" }}>Google Calendar integration</li>
            <li className="list-group-item" style={{ background: "rgba(248,210,252,0.10)", color: "#6c3483" }}>Task recommendations and reminders</li>
            <li className="list-group-item" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483" }}>User-friendly dashboard with analytics</li>
          </ul>

          <h4 className="mt-4 fw-bold" style={{ color: "#a18cd1" }}>Technologies Used</h4>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item" style={{ background: "rgba(161,140,209,0.10)", color: "#6c3483" }}><strong>Frontend:</strong> React.js</li>
            <li className="list-group-item" style={{ background: "rgba(161,140,209,0.07)", color: "#6c3483" }}><strong>Backend:</strong> Node.js + Express</li>
            <li className="list-group-item" style={{ background: "rgba(161,140,209,0.10)", color: "#6c3483" }}><strong>Emotion Detection:</strong> DeepFace + OpenCV (Flask)</li>
            <li className="list-group-item" style={{ background: "rgba(161,140,209,0.07)", color: "#6c3483" }}><strong>Database:</strong> MongoDB</li>
            <li className="list-group-item" style={{ background: "rgba(161,140,209,0.10)", color: "#6c3483" }}><strong>APIs:</strong> Google Calendar API</li>
          </ul>

          <h4 className="mt-4 fw-bold" style={{ color: "#a18cd1" }}>Meet the Developer</h4>
          <div className="d-flex align-items-center mb-3">
            <span
              style={{
                background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
                borderRadius: "50%",
                padding: "10px 18px",
                marginRight: "16px",
                fontSize: "2rem",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(161,140,209,0.10)",
              }}
            >
              👨‍💻
            </span>
            <span className="fw-bold" style={{ color: "#6c3483", fontSize: "1.2rem" }}>
              {/* Harish Gowda N */}
              🌔
            </span>
          </div>
          <p style={{ color: "#6c3483" }}>
            A passionate computer science student from East West College of Engineering, Bangalore.
            Harish has a strong interest in AI and full-stack development and created this project as part of his major academic submission.
          </p>
        </div>

        <h2 className="mb-3 text-center fw-bold" style={{ color: "#a18cd1" }}>Frequently Asked Questions (FAQ)</h2>
        <div className="accordion" id="faqAccordion">
          {[
            {
              question: "1. How does the emotion detection work?",
              answer: "The application uses your webcam and DeepFace library to detect your current facial emotion and then generates a plan accordingly.",
              id: "One",
              show: true,
            },
            {
              question: "2. Is my webcam data stored anywhere?",
              answer: "No. Your webcam data is used only for real-time analysis and is not stored or transmitted.",
              id: "Two",
            },
            {
              question: "3. Can I use the planner without detecting emotion?",
              answer: "Yes, manual planning is also supported if you prefer not to use the emotion detection feature.",
              id: "Three",
            },
            {
              question: "4. What if the system detects the wrong emotion?",
              answer: "You can retake the scan or manually override the suggestions in the planner.",
              id: "Four",
            },
            {
              question: "5. Is this application free to use?",
              answer: "Yes, it is a student-developed project available for academic and personal use.",
              id: "Five",
            },
          ].map((faq, idx) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading${faq.id}`}>
                <button
                  className={`accordion-button${faq.show ? "" : " collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${faq.id}`}
                  style={{
                    background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${faq.id}`}
                className={`accordion-collapse collapse${faq.show ? " show" : ""}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ color: "#6c3483", background: "rgba(248,210,252,0.10)" }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
