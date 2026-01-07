import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("info");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const sectionContent = {
    info: [
      { icon: "👤", label: "Name", value: user?.name || "Not set" },
      { icon: "🎂", label: "Age", value: user?.age || "Not set" },
      { icon: "📧", label: "Email", value: user?.email || "Not set" },
      { icon: "📱", label: "Mobile", value: user?.mobile || "Not set" },
      { icon: "💼", label: "Profession", value: user?.profession || "Not set" },
    ],
    goals: user?.goals || [],
    emotions: user?.emotions || []
  };

  const emotionColors = {
    happy: "#10B981",
    sad: "#3B82F6",
    angry: "#EF4444",
    surprise: "#F59E0B",
    neutral: "#6B7280",
    fear: "#8B5CF6",
    disgust: "#84CC16"
  };

  return (
    <div className="d-flex" style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <motion.div 
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      <Sidebar />
      
      <motion.div
        className="container p-4 p-md-5"
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          boxShadow: "0 20px 60px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          minHeight: "80vh",
          maxWidth: "800px",
          position: "relative",
          overflow: "hidden",
        }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Decorative Top Border */}
        <motion.div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4F46E5, #0D9488, #FF6B6B, #4F46E5)",
            borderRadius: "32px 32px 0 0",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Profile Header */}
        <motion.div className="text-center mb-5" variants={itemVariants}>
          <motion.div
            style={{
              background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
              borderRadius: "50%",
              width: "160px",
              height: "160px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "25px",
              boxShadow: "0 15px 35px rgba(79, 70, 229, 0.4)",
              position: "relative",
              overflow: "hidden",
              border: "4px solid white"
            }}
            variants={floatAnimation}
            initial="initial"
            animate="float"
          >
            <motion.div
              style={{
                fontSize: "5rem",
                background: "linear-gradient(135deg, #FFD700, #FFFFFF, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
              }}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👤
            </motion.div>
            
            {/* Animated rings */}
            <motion.div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                right: "-20px",
                bottom: "-20px",
                border: "3px solid transparent",
                borderTopColor: "#4F46E5",
                borderRightColor: "#0D9488",
                borderBottomColor: "#FF6B6B",
                borderRadius: "50%",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          <motion.h2
            className="fw-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "3rem",
              textShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {user?.name || "User Profile"}
          </motion.h2>
          
          <motion.p 
            className="text-muted mb-0"
            style={{ fontSize: "1.1rem" }}
            variants={itemVariants}
          >
            {user?.profession || "DayPlanner AI User"}
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="d-flex justify-content-center mb-5" variants={itemVariants}>
          <div className="d-inline-flex p-2 rounded-3" style={{ background: "rgba(79, 70, 229, 0.1)" }}>
            {["info", "goals", "emotions"].map((tab) => (
              <motion.button
                key={tab}
                className={`btn ${activeSection === tab ? '' : 'btn-transparent'} fw-bold me-2`}
                style={{
                  background: activeSection === tab 
                    ? "linear-gradient(135deg, #4F46E5, #0D9488)"
                    : "transparent",
                  color: activeSection === tab ? "white" : "#4F46E5",
                  borderRadius: "15px",
                  padding: "10px 25px",
                  border: activeSection === tab ? "none" : "2px solid #4F46E5",
                  transition: "all 0.3s ease"
                }}
                onClick={() => setActiveSection(tab)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {tab === "info" && "📋 Personal Info"}
                {tab === "goals" && "🎯 Goals"}
                {tab === "emotions" && "😊 Emotions"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Personal Info Section */}
            {activeSection === "info" && (
              <div className="row g-4">
                {sectionContent.info.map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    className="col-md-6"
                    variants={itemVariants}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="h-100 p-4 rounded-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div 
                        className="rounded-circle mb-3 d-inline-flex align-items-center justify-content-center"
                        style={{
                          background: "linear-gradient(135deg, #4F46E5, #0D9488)",
                          width: "50px",
                          height: "50px",
                          color: "white",
                          fontSize: "1.5rem",
                          boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)"
                        }}
                      >
                        {item.icon}
                      </div>
                      <h6 className="fw-bold text-muted mb-2">{item.label}</h6>
                      <h5 className="fw-bold" style={{ color: "#374151" }}>
                        {item.value}
                      </h5>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Goals Section */}
            {activeSection === "goals" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {sectionContent.goals.length > 0 ? (
                  <div className="row g-4">
                    {sectionContent.goals.map((goal, idx) => (
                      <motion.div 
                        key={idx}
                        className="col-12"
                        variants={itemVariants}
                        custom={idx}
                      >
                        <motion.div
                          className="p-4 rounded-3"
                          style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)",
                            backdropFilter: "blur(10px)",
                            borderLeft: `5px solid ${goal.status === 'completed' ? '#10B981' : goal.status === 'in-progress' ? '#3B82F6' : '#F59E0B'}`
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                              {goal.title}
                            </h5>
                            <motion.span 
                              className="badge rounded-pill fw-bold"
                              style={{
                                background: goal.status === 'completed' 
                                  ? "linear-gradient(135deg, #10B981, #059669)"
                                  : goal.status === 'in-progress'
                                  ? "linear-gradient(135deg, #3B82F6, #2563EB)"
                                  : "linear-gradient(135deg, #F59E0B, #D97706)",
                                color: "white",
                                padding: "8px 16px"
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              {goal.status || "pending"}
                            </motion.span>
                          </div>
                          
                          {goal.description && (
                            <p className="mb-3" style={{ color: "#6B7280", lineHeight: "1.6" }}>
                              {goal.description}
                            </p>
                          )}
                          
                          <div className="d-flex justify-content-between align-items-center">
                            {goal.dueDate && (
                              <span className="text-muted">
                                📅 Due: {new Date(goal.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            <span className="text-muted">
                              {goal.createdAt && `Created: ${new Date(goal.createdAt).toLocaleDateString()}`}
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="text-center py-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(13, 148, 136, 0.1))",
                        width: "100px",
                        height: "100px",
                        fontSize: "3rem"
                      }}
                    >
                      🎯
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: "#374151" }}>
                      No Goals Added Yet
                    </h4>
                    <p className="text-muted">
                      Start planning your journey by adding your first goal!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Emotions Section */}
            {activeSection === "emotions" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {sectionContent.emotions.length > 0 ? (
                  <div className="row g-4">
                    {sectionContent.emotions.map((emotion, idx) => (
                      <motion.div 
                        key={idx}
                        className="col-md-6"
                        variants={itemVariants}
                        custom={idx}
                      >
                        <motion.div
                          className="h-100 p-4 rounded-3"
                          style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)",
                            backdropFilter: "blur(10px)",
                            borderTop: `5px solid ${emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280"}`
                          }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="d-flex align-items-center mb-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3"
                              style={{
                                background: emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280",
                                width: "60px",
                                height: "60px",
                                color: "white",
                                fontSize: "2rem",
                                boxShadow: `0 4px 15px ${emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280"}40`
                              }}
                            >
                              {emotion.emotion === 'happy' && '😊'}
                              {emotion.emotion === 'sad' && '😢'}
                              {emotion.emotion === 'angry' && '😠'}
                              {emotion.emotion === 'surprise' && '😲'}
                              {emotion.emotion === 'neutral' && '😐'}
                              {emotion.emotion === 'fear' && '😨'}
                              {emotion.emotion === 'disgust' && '🤢'}
                              {!['happy','sad','angry','surprise','neutral','fear','disgust'].includes(emotion.emotion?.toLowerCase()) && '😊'}
                            </div>
                            <div>
                              <h5 className="fw-bold mb-1" style={{ color: "#374151" }}>
                                {emotion.emotion?.charAt(0).toUpperCase() + emotion.emotion?.slice(1)}
                              </h5>
                              {emotion.confidence && (
                                <div className="d-flex align-items-center">
                                  <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                                    <motion.div 
                                      className="progress-bar rounded-pill"
                                      style={{ 
                                        background: `linear-gradient(90deg, ${emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280"}, ${emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280"}80)`
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${emotion.confidence}%` }}
                                      transition={{ duration: 1, delay: idx * 0.1 }}
                                    />
                                  </div>
                                  <span className="fw-bold" style={{ 
                                    color: emotionColors[emotion.emotion?.toLowerCase()] || "#6B7280",
                                    fontSize: "0.9rem"
                                  }}>
                                    {emotion.confidence}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {emotion.detectedAt && (
                            <div className="text-muted small">
                              <span className="me-3">🕒 {new Date(emotion.detectedAt).toLocaleTimeString()}</span>
                              <span>{new Date(emotion.detectedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="text-center py-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(79, 70, 229, 0.1))",
                        width: "100px",
                        height: "100px",
                        fontSize: "3rem"
                      }}
                    >
                      😊
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: "#374151" }}>
                      No Emotions Recorded Yet
                    </h4>
                    <p className="text-muted">
                      Start using the emotion detection feature to track your mood patterns!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stats Footer */}
        <motion.div 
          className="mt-5 pt-4 text-center"
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)"
          }}
          variants={itemVariants}
        >
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ background: "rgba(79, 70, 229, 0.05)" }}>
                <div className="fw-bold display-6" style={{ color: "#4F46E5" }}>
                  {sectionContent.goals.length}
                </div>
                <div className="text-muted">Goals</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ background: "rgba(13, 148, 136, 0.05)" }}>
                <div className="fw-bold display-6" style={{ color: "#0D9488" }}>
                  {sectionContent.emotions.length}
                </div>
                <div className="text-muted">Emotions</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ background: "rgba(255, 107, 107, 0.05)" }}>
                <div className="fw-bold display-6" style={{ color: "#FF6B6B" }}>
                  {sectionContent.info.filter(item => item.value !== "Not set").length}/5
                </div>
                <div className="text-muted">Profile Complete</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>
        {`
          .btn-transparent {
            background: transparent;
            color: inherit;
          }
          
          .btn-transparent:hover {
            background: rgba(79, 70, 229, 0.1);
          }

          /* Smooth scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(79, 70, 229, 0.05);
            border-radius: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #4F46E5, #0D9488);
            border-radius: 8px;
          }

          /* Glowing text effect */
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.3); }
            50% { text-shadow: 0 0 30px rgba(79, 70, 229, 0.6); }
          }
        `}
      </style>
    </div>
  );
}
