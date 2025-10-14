import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      <Sidebar />
      <div
        className="container p-4"
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 4px 24px rgba(161,140,209,0.10)",
          minHeight: "80vh",
          maxWidth: "600px",
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
          Profile
        </h2>
        {user ? (
          <div className="d-flex flex-column align-items-center">
            {/* Dummy User Picture */}
            <div
              style={{
                background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(161,140,209,0.10)",
                fontSize: "3.5rem",
                color: "#fff",
              }}
            >
              <span role="img" aria-label="User">👤</span>
            </div>
            <ul className="list-group w-100" style={{ maxWidth: "400px" }}>
              <li className="list-group-item mb-2" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Name:</strong> {user.name}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(248,210,252,0.10)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Age:</strong> {user.age}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(248,210,252,0.10)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Mobile:</strong> {user.mobile}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(248,210,252,0.15)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Profession:</strong> {user.profession}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(161,140,209,0.10)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Goals:</strong>
                {user.goals && user.goals.length > 0 ? (
                  <ul className="mt-2">
                    {user.goals.map((goal, idx) => (
                      <li key={idx} style={{ fontSize: "0.98rem", marginBottom: "6px" }}>
                        <span style={{ fontWeight: "bold" }}>{goal.title}</span>
                        {goal.description && <> - {goal.description}</>}
                        {goal.dueDate && (
                          <span className="ms-2 badge bg-primary">
                            Due: {new Date(goal.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        <span className="ms-2 badge bg-warning text-dark">
                          {goal.status || "pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="ms-2 text-muted">No goals added</span>
                )}
              </li>
              <li className="list-group-item mb-2" style={{ background: "rgba(161,140,209,0.07)", color: "#6c3483", borderRadius: "12px" }}>
                <strong>Emotions:</strong>
                {user.emotions && user.emotions.length > 0 ? (
                  <ul className="mt-2">
                    {user.emotions.map((emo, idx) => (
                      <li key={idx} style={{ fontSize: "0.98rem", marginBottom: "6px" }}>
                        <span style={{ fontWeight: "bold" }}>{emo.emotion}</span>
                        <span className="ms-2 badge bg-info text-dark">
                          {emo.confidence ? `Confidence: ${emo.confidence}` : ""}
                        </span>
                        <span className="ms-2 badge bg-secondary">
                          {emo.detectedAt ? new Date(emo.detectedAt).toLocaleString() : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="ms-2 text-muted">No emotions detected</span>
                )}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-center text-danger fw-bold">User not logged in.</p>
        )}
      </div>
    </div>
  );
}