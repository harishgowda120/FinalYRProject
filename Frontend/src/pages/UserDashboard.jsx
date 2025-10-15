import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://finalyrproject-2.onrender.com/api/users/emotions";

  // Emotion emoji mapping
  const emotionEmojis = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    neutral: "😐",
    surprised: "😲",
    fearful: "😨",
    disgusted: "🤢",
    excited: "🤩",
    calm: "😌",
    anxious: "😰",
    tired: "😴",
    energetic: "💪"
  };

  // Hard-coded user statistics
  const userStats = {
    totalSessions: 47,
    streakDays: 12,
    avgMood: 7.2,
    productivityScore: 85,
    goalsCompleted: 23,
    meditationMinutes: 320
  };

  // Hard-coded recent activities
  const recentActivities = [
    { activity: "Morning Meditation", time: "7:30 AM", duration: "15 mins", emotion: "calm" },
    { activity: "Project Work Session", time: "9:00 AM", duration: "2 hours", emotion: "focused" },
    { activity: "Team Meeting", time: "11:30 AM", duration: "45 mins", emotion: "engaged" },
    { activity: "Lunch Break", time: "1:00 PM", duration: "1 hour", emotion: "relaxed" },
    { activity: "Study Session", time: "2:30 PM", duration: "1.5 hours", emotion: "concentrated" }
  ];

  // Hard-coded weekly mood data
  const weeklyMood = [
    { day: "Mon", mood: 8, emotion: "happy" },
    { day: "Tue", mood: 6, emotion: "neutral" },
    { day: "Wed", mood: 9, emotion: "excited" },
    { day: "Thu", mood: 7, emotion: "calm" },
    { day: "Fri", mood: 8, emotion: "happy" },
    { day: "Sat", mood: 9, emotion: "energetic" },
    { day: "Sun", mood: 7, emotion: "relaxed" }
  ];

  // Fetch emotions from backend
  const fetchEmotions = useCallback(async () => {
    if (!user || !user._id) return;

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/${user._id}`);
      const data = await response.json();

      if (response.ok) {
        const userEmotions = data.emotions || [];
        setEmotions(userEmotions);

        // ✅ Save the most recent emotion to localStorage
        if (userEmotions.length > 0) {
          const recent = userEmotions[userEmotions.length - 1];
          localStorage.setItem("recentEmotion", JSON.stringify(recent));
        }
      } else {
        console.error("Error fetching emotions:", data.message);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchEmotions();
  }, [fetchEmotions]);

  // Get emoji for emotion
  const getEmotionEmoji = (emotion) => {
    return emotionEmojis[emotion.toLowerCase()] || "❓";
  };

  // Get mood color based on score
  const getMoodColor = (score) => {
    if (score >= 8) return "#10b981"; // Green
    if (score >= 6) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div 
      className="d-flex" 
      style={{ 
        marginTop: "20px",
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f9f9f9ff 0%, #f5f2f8ff 100%)",
        position: "relative"
      }}
    >
      {/* Background decorative elements */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "400px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          borderRadius: "50%",
          transform: "translate(200px, -200px)"
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          borderRadius: "50%",
          transform: "translate(-100px, 100px)"
        }}
      />
      
      <Sidebar />
      <div className="container py-4" style={{ position: "relative", zIndex: 1 }}>
        {/* Welcome Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="card shadow-lg border-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <div className="card-body py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h1 
                      className="fw-bold mb-2"
                      style={{ 
                        color: "#4c51bf",
                        fontSize: "2.5rem",
                        background: "linear-gradient(135deg, #4c51bf, #667eea)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      Welcome back, {user?.name || "User"}! 👋
                    </h1>
                    <p className="text-muted fs-5 mb-0">
                      Here's your emotional wellness overview for today
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div 
                      className="d-inline-block p-3 rounded-3"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #34d399)",
                        color: "white"
                      }}
                    >
                      <div className="fs-6">Current Streak</div>
                      <div className="fs-2 fw-bold">{userStats.streakDays} days 🔥</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Statistics Cards */}
          <div className="col-12 mb-4">
            <div className="row">
              {[
                { title: "Total Sessions", value: userStats.totalSessions, icon: "📊", color: "#3b82f6" },
                { title: "Avg Mood Score", value: userStats.avgMood, icon: "⭐", color: "#f59e0b" },
                { title: "Productivity", value: `${userStats.productivityScore}%`, icon: "🚀", color: "#10b981" },
                { title: "Goals Completed", value: userStats.goalsCompleted, icon: "🎯", color: "#8b5cf6" },
                { title: "Meditation", value: `${userStats.meditationMinutes}m`, icon: "🧘", color: "#06b6d4" },
              ].map((stat, index) => (
                <div key={index} className="col-md-2 col-6 mb-3">
                  <div 
                    className="card shadow-sm border-0 h-100 text-center"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                      borderRadius: "15px",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div className="card-body py-3">
                      <div 
                        className="fs-2 mb-2"
                        style={{ color: stat.color }}
                      >
                        {stat.icon}
                      </div>
                      <h4 
                        className="fw-bold mb-1"
                        style={{ color: "#1f2937" }}
                      >
                        {stat.value}
                      </h4>
                      <small 
                        className="text-muted fw-medium"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {stat.title}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Emotions */}
          <div className="col-lg-6 mb-4">
            <div 
              className="card shadow-lg border-0 h-100"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <div className="card-header border-0 bg-transparent py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fw-bold" style={{ color: "#4c51bf" }}>
                    🎭 Recent Emotions
                  </h5>
                  <button
                    className="btn btn-sm fw-bold"
                    onClick={fetchEmotions}
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px"
                    }}
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary"></div>
                    <p className="text-muted mt-2">Loading emotions...</p>
                  </div>
                ) : emotions.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {emotions
                      .slice()
                      .reverse()
                      .slice(0, 6)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="list-group-item border-0 px-0 py-3 d-flex justify-content-between align-items-center"
                          style={{
                            background: "transparent",
                            borderBottom: "1px solid rgba(0,0,0,0.1) !important"
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <span 
                              className="fs-5 me-3"
                              style={{ fontSize: "1.5rem" }}
                            >
                              {getEmotionEmoji(item.emotion)}
                            </span>
                            <div>
                              <div className="fw-bold" style={{ color: "#374151" }}>
                                {item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1)}
                              </div>
                              <small className="text-muted">
                                {new Date(item.detectedAt).toLocaleDateString()} • 
                                {new Date(item.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </small>
                            </div>
                          </div>
                          {item.confidence && (
                            <span 
                              className="badge fw-bold"
                              style={{
                                background: `linear-gradient(135deg, ${getMoodColor(item.confidence * 10)}, #${Math.floor(item.confidence * 16777215).toString(16)})`,
                                color: "white",
                                borderRadius: "10px",
                                padding: "6px 12px"
                              }}
                            >
                              {(item.confidence * 100).toFixed(1)}%
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="fs-1 mb-3">😴</div>
                    <p className="text-muted">No emotions recorded yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Weekly Mood Chart */}
          <div className="col-lg-6 mb-4">
            <div 
              className="card shadow-lg border-0 h-100"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <div className="card-header border-0 bg-transparent py-3">
                <h5 className="card-title mb-0 fw-bold" style={{ color: "#4c51bf" }}>
                  📈 Weekly Mood Trend
                </h5>
              </div>
              <div className="card-body">
                <div className="row align-items-end h-100">
                  {weeklyMood.map((day, index) => (
                    <div key={index} className="col text-center">
                      <div 
                        className="mx-auto mb-2 rounded-top"
                        style={{
                          height: `${day.mood * 10}px`,
                          background: `linear-gradient(135deg, ${getMoodColor(day.mood)}, ${getMoodColor(day.mood)}80)`,
                          width: "30px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      ></div>
                      <div className="fw-bold text-muted">{day.day}</div>
                      <div className="fs-5">{getEmotionEmoji(day.emotion)}</div>
                      <div 
                        className="fw-bold"
                        style={{ color: getMoodColor(day.mood) }}
                      >
                        {day.mood}/10
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="col-lg-8 mb-4">
            <div 
              className="card shadow-lg border-0 h-100"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <div className="card-header border-0 bg-transparent py-3">
                <h5 className="card-title mb-0 fw-bold" style={{ color: "#4c51bf" }}>
                  ⚡ Recent Activities
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="list-group-item border-0 px-0 py-3 d-flex justify-content-between align-items-center"
                      style={{
                        background: "transparent",
                        borderBottom: "1px solid rgba(0,0,0,0.1) !important"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="fs-4 me-3">
                          {getEmotionEmoji(activity.emotion)}
                        </span>
                        <div>
                          <div className="fw-bold" style={{ color: "#374151" }}>
                            {activity.activity}
                          </div>
                          <small className="text-muted">
                            {activity.duration} • {activity.emotion.charAt(0).toUpperCase() + activity.emotion.slice(1)}
                          </small>
                        </div>
                      </div>
                      <span 
                        className="badge fw-bold"
                        style={{
                          background: "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                          borderRadius: "10px",
                          padding: "6px 12px"
                        }}
                      >
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Wellness Tips */}
          <div className="col-lg-4 mb-4">
            <div 
              className="card shadow-lg border-0 h-100"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <div className="card-header border-0 bg-transparent py-3">
                <h5 className="card-title mb-0 fw-bold" style={{ color: "#4c51bf" }}>
                  💡 Wellness Tips
                </h5>
              </div>
              <div className="card-body">
                {[
                  "Take a 5-minute breathing break every hour",
                  "Stay hydrated - drink water regularly",
                  "Practice gratitude journaling daily",
                  "Take short walks to refresh your mind",
                  "Listen to calming music during breaks",
                  "Set small, achievable goals for the day"
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-start mb-3 p-3 rounded"
                    style={{
                      background: "rgba(102, 126, 234, 0.1)",
                      borderLeft: "4px solid #667eea"
                    }}
                  >
                    <span className="me-2">🌟</span>
                    <small style={{ color: "#4b5563" }}>{tip}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
