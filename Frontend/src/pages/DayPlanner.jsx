import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function DayPlanner() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState("neutral");
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  // ✅ Use environment variable (defined in .env)
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

  // 🎨 Function to parse Gemini response and render styled plan
  const parsePlan = (text) => {
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    let currentSection = "";

    return lines.map((line, index) => {
      // Section headers
      if (
        line.includes("**") ||
        line.includes("Theme:") ||
        line.includes("Key Principles") ||
        (line.toUpperCase() === line &&
          line.length < 50 &&
          !line.match(/\d{1,2}[:.]\d{2}/))
      ) {
        currentSection = line.replace(/\*\*/g, "").trim();
        return (
          <div
            key={index}
            className="card shadow-lg mb-4 mt-4"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "20px",
              color: "white",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
            }}
          >
            <h3
              className="fw-bold mb-0"
              style={{
                fontSize: "1.5rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {line.replace(/\*\*/g, "").trim()}
            </h3>
          </div>
        );
      }

      // Hour slots
      const hourMatch = line.match(/(\d{1,2}[:.]\d{2}\s?[AP]M)/i);
      if (hourMatch) {
        const activity = line.replace(hourMatch[0], "").trim();
        return (
          <div
            key={index}
            className="card mb-4 animate__animated animate__fadeInUp"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              borderLeft: "8px solid #6c63ff",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(108, 99, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background:
                  "linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(108, 99, 255, 0.05) 100%)",
                borderBottomLeft: "80px solid transparent",
              }}
            />
            <div className="d-flex align-items-start">
              <div
                className="me-4"
                style={{
                  minWidth: "120px",
                  background: "linear-gradient(135deg, #6c63ff, #8a84ff)",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(108, 99, 255, 0.3)",
                }}
              >
                <h5 className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>
                  ⏰ {hourMatch[0]}
                </h5>
              </div>
              <div style={{ flex: 1 }}>
                <p
                  className="mb-0"
                  style={{
                    fontSize: "1.1rem",
                    color: "#2d3748",
                    lineHeight: "1.6",
                    fontWeight: "500",
                  }}
                >
                  {activity}
                </p>
              </div>
            </div>
          </div>
        );
      }

      // Keyword highlighting
      let formattedLine = line
        .replace(
          /\b(eat|drink|breakfast|lunch|dinner|nourish|fuel|hydrate)\b/gi,
          (match) =>
            `<span class="badge me-2" style="background: linear-gradient(135deg, #48bb78, #38a169); color: white; padding: 8px 12px; border-radius: 12px;">🍏 ${match.toUpperCase()}</span>`
        )
        .replace(
          /\b(work|study|project|focus|deep work|priority|task)\b/gi,
          (match) =>
            `<span class="badge me-2" style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white; padding: 8px 12px; border-radius: 12px;">💼 ${match.toUpperCase()}</span>`
        )
        .replace(
          /\b(relax|meditate|sleep|nap|break|recharge|wind down)\b/gi,
          (match) =>
            `<span class="badge me-2" style="background: linear-gradient(135deg, #ed8936, #dd6b20); color: white; padding: 8px 12px; border-radius: 12px;">🛌 ${match.toUpperCase()}</span>`
        )
        .replace(
          /\b(meeting|call|discussion|communicate)\b/gi,
          (match) =>
            `<span class="badge me-2" style="background: linear-gradient(135deg, #9f7aea, #805ad5); color: white; padding: 8px 12px; border-radius: 12px;">📞 ${match.toUpperCase()}</span>`
        )
        .replace(
          /\b(exercise|move|walk|yoga|stretch|activity)\b/gi,
          (match) =>
            `<span class="badge me-2" style="background: linear-gradient(135deg, #f56565, #e53e3e); color: white; padding: 8px 12px; border-radius: 12px;">🏃 ${match.toUpperCase()}</span>`
        );

      return (
        <div
          key={index}
          className="card mb-3 animate__animated animate__fadeIn"
          style={{
            background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
            border: "none",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            borderLeft: "4px solid #cbd5e0",
          }}
        >
          <p
            className="mb-0"
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.7",
              color: "#4a5568",
              fontWeight: "400",
            }}
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        </div>
      );
    });
  };

  // 🚀 Fetch plan from Gemini API
  const fetchPlan = async () => {
    setLoading(true);
    const storedEmotion = localStorage.getItem("recentEmotion");
    let latestEmotion = "neutral";
    if (storedEmotion) {
      try {
        latestEmotion = JSON.parse(storedEmotion)?.emotion || "neutral";
      } catch {
        latestEmotion = "neutral";
      }
    }
    setEmotion(latestEmotion);

    const prompt = `
      The user's current emotion is "${latestEmotion}".
      Create a personalized schedule for the remaining hours of today (Indian Standard Time).
      Include activities, meals, short breaks, and Kannada songs that match their mood.
      Format clearly with hour-by-hour slots.
    `;

    try {
      const res = await axios.post(
        GEMINI_API_URL,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const text =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from Gemini";

      localStorage.setItem("dayPlan", text);
      localStorage.setItem("dayPlanEmotion", latestEmotion);
      setPlan(text);
    } catch (err) {
      console.error(err);
      setPlan("❌ Error fetching plan from Gemini API");
    }
    setLoading(false);
  };

  // Load saved plan
  useEffect(() => {
    const savedPlan = localStorage.getItem("dayPlan");
    const savedEmotion = localStorage.getItem("dayPlanEmotion");
    if (savedPlan) setPlan(savedPlan);
    if (savedEmotion) setEmotion(savedEmotion);
  }, []);

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f7f9fc 0%, #e2e8f0 50%, #f7f9fc 100%)",
        position: "relative",
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background:
            "linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(108, 99, 255, 0.05) 100%)",
          borderRadius: "50%",
          transform: "translate(100px, -100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background:
            "linear-gradient(135deg, rgba(108, 99, 255, 0.08) 0%, rgba(108, 99, 255, 0.03) 100%)",
          borderRadius: "50%",
          transform: "translate(-50px, 50px)",
        }}
      />

      <Sidebar />
      <div className="p-4 flex-grow-1" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="card shadow-lg p-4 animate__animated animate__fadeIn"
          style={{
            borderRadius: "24px",
            background: "linear-gradient(135deg, #ffffff 0%, #fafbff 100%)",
            border: "none",
            minHeight: "80vh",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#6c63ff",
                  background: "linear-gradient(135deg, #6c63ff, #8a84ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2.2rem",
                }}
              >
                🗓️ Your Personalized Day Plan
              </h2>
              <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                Crafted specifically for your current emotional state
              </p>
            </div>
            <button
              className="btn btn-lg fw-bold"
              onClick={fetchPlan}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #6c63ff, #8a84ff)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                padding: "12px 24px",
                boxShadow: "0 6px 20px rgba(108, 99, 255, 0.3)",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Generating...
                </>
              ) : (
                "🔄 Refresh Plan"
              )}
            </button>
          </div>

          {/* Emotion badge */}
          <div className="mb-4">
            <div
              className="card shadow-sm"
              style={{
                background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
                border: "none",
                borderRadius: "16px",
                padding: "16px 20px",
                display: "inline-block",
              }}
            >
              <span
                className="fw-bold d-flex align-items-center"
                style={{ color: "#3730a3", fontSize: "1.1rem" }}
              >
                <span
                  className="me-2"
                  style={{
                    background: "#6c63ff",
                    color: "white",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  😊
                </span>
                Current Emotion:
                <strong className="ms-2" style={{ color: "#6c63ff" }}>
                  {emotion}
                </strong>
              </span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border mb-3"
                style={{
                  width: "3rem",
                  height: "3rem",
                  color: "#6c63ff",
                }}
              />
              <p className="text-muted fw-bold" style={{ fontSize: "1.2rem" }}>
                ⏳ Crafting your perfect day plan...
              </p>
            </div>
          ) : plan ? (
            <div className="p-3">{parsePlan(plan)}</div>
          ) : (
            <div
              className="text-center py-5"
              style={{
                background: "linear-gradient(135deg, #f8f9ff, #f0f4ff)",
                borderRadius: "20px",
                border: "2px dashed #c7d2fe",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.7 }}>
                📅
              </div>
              <h4 className="fw-bold mb-3" style={{ color: "#6c63ff" }}>
                No Plan Generated Yet
              </h4>
              <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                Click the refresh button to create your personalized day plan!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
