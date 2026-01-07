import { motion } from "framer-motion";
import { useRef } from "react";
import Sidebar from '../components/Sidebar';

export default function AboutUs() {
  const containerRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scaleOnHover = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Sidebar />
      <motion.div
        ref={containerRef}
        className="container p-4"
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          marginLeft: "30px",
          marginRight: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          minHeight: "80vh",
          overflow: "hidden",
          position: "relative"
        }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Animated Background Elements */}
        <div 
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        
        <div 
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite reverse",
          }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: "rgba(79, 70, 229, 0.2)",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}

        <motion.h2
          className="mb-4 text-center fw-bold position-relative"
          style={{
            background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "2px",
            fontSize: "2.8rem",
            textShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}
          variants={fadeInUp}
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          About DayPlanner AI
        </motion.h2>

        <motion.div className="mb-5" variants={staggerContainer}>
          <motion.p 
            className="lead text-center px-lg-5 mx-lg-5"
            style={{ 
              color: "#374151",
              lineHeight: "1.8",
              fontSize: "1.2rem"
            }}
            variants={fadeInUp}
          >
            <strong style={{ 
              background: "linear-gradient(135deg, #4F46E5, #0D9488)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.3rem"
            }}>
              AI-Powered Emotion-Based Day Planner
            </strong> is a revolutionary web application that transforms how you manage your daily activities. 
            By analyzing your emotional state in real-time, our system crafts personalized day plans that adapt to how you feel, 
            ensuring optimal productivity and well-being.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-5">
            <motion.h4 
              className="fw-bold d-flex align-items-center"
              style={{ 
                color: "#4F46E5",
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(13, 148, 136, 0.1))",
                padding: "15px 20px",
                borderRadius: "15px",
                borderLeft: "5px solid #4F46E5"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="me-3">🎯</span>
              Our Mission
            </motion.h4>
            <motion.p 
              className="mt-3 ps-4"
              style={{ 
                color: "#4B5563",
                fontSize: "1.1rem",
                lineHeight: "1.7"
              }}
              variants={fadeInUp}
            >
              To empower individuals worldwide to achieve their fullest potential by aligning daily activities with emotional intelligence.
              We believe that when your plans understand how you feel, you achieve more with less stress.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-5">
            <motion.h4 
              className="fw-bold d-flex align-items-center"
              style={{ 
                color: "#0D9488",
                background: "linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(255, 107, 107, 0.1))",
                padding: "15px 20px",
                borderRadius: "15px",
                borderLeft: "5px solid #0D9488"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="me-3">✨</span>
              Key Features
            </motion.h4>
            <motion.div className="row mt-4 g-4" variants={staggerContainer}>
              {[
                { icon: "😊", title: "Real-time Emotion Detection", desc: "Advanced facial recognition analyzes your mood using webcam" },
                { icon: "📅", title: "Personalized Daily Planning", desc: "AI generates activity suggestions based on emotional state" },
                // { icon: "🔗", title: "Google Calendar Sync", desc: "Seamless integration with your existing calendar" },
                { icon: "🎯", title: "Smart Task Recommendations", desc: "AI-powered suggestions tailored to your goals" },
                { icon: "📊", title: "Analytics Dashboard", desc: "Track productivity and emotional patterns over time" },
                { icon: "🔔", title: "Smart Reminders", desc: "Context-aware notifications for optimal timing" }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  className="col-md-6"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="h-100 p-4 rounded-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div 
                      className="rounded-circle mb-3"
                      style={{
                        background: "linear-gradient(135deg, #4F46E5, #0D9488)",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.5rem",
                        boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)"
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold" style={{ color: "#374151" }}>{feature.title}</h5>
                    <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-5">
            <motion.h4 
              className="fw-bold d-flex align-items-center"
              style={{ 
                color: "#FF6B6B",
                background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(79, 70, 229, 0.1))",
                padding: "15px 20px",
                borderRadius: "15px",
                borderLeft: "5px solid #FF6B6B"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="me-3">⚙️</span>
              Technologies Used
            </motion.h4>
            <div className="row mt-4 g-3">
              {[
                { tech: "React.js", color: "#61DAFB", desc: "Frontend Framework" },
                { tech: "Node.js + Express", color: "#68A063", desc: "Backend Server" },
                { tech: "DeepFace + OpenCV", color: "#FF6B6B", desc: "Emotion Detection" },
                { tech: "MongoDB", color: "#47A248", desc: "Database" },
                // { tech: "Google Calendar API", color: "#4285F4", desc: "Calendar Integration" },
                { tech: "Framer Motion", color: "#FF4081", desc: "Animations" }
              ].map((tech, idx) => (
                <motion.div 
                  key={idx} 
                  className="col-md-4 col-lg-2"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <div
                    className="text-center p-3 rounded-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: `2px solid ${tech.color}`,
                      boxShadow: `0 4px 15px ${tech.color}40`,
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <div className="fw-bold" style={{ color: tech.color, fontSize: "0.9rem" }}>
                      {tech.tech}
                    </div>
                    <div className="small mt-1" style={{ color: "#6B7280" }}>
                      {tech.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-5">
            <motion.h4 
              className="fw-bold d-flex align-items-center"
              style={{ 
                color: "#F59E0B",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.1))",
                padding: "15px 20px",
                borderRadius: "15px",
                borderLeft: "5px solid #F59E0B"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="me-3">👨‍💻</span>
              Meet the Developer
            </motion.h4>
            <motion.div 
              className="d-flex align-items-center mt-4 p-4 rounded-3"
              style={{
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(13, 148, 136, 0.05))",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)"
              }}
              variants={floatAnimation}
              initial="initial"
              animate="float"
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
                  borderRadius: "50%",
                  padding: "25px",
                  marginRight: "20px",
                  fontSize: "2.5rem",
                  color: "#fff",
                  boxShadow: "0 8px 25px rgba(79, 70, 229, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px"
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                👨‍💻
              </motion.div>
              <div>
                <h5 className="fw-bold" style={{ color: "#374151", fontSize: "1.5rem" }}>
                  {/* Harish Gowda N */}
                  🌙
                </h5>
                <p style={{ color: "#6B7280", marginBottom: "5px" }}>
                  <span className="badge rounded-pill me-2" style={{ background: "linear-gradient(135deg, #4F46E5, #0D9488)" }}>
                    Full-Stack Developer
                  </span>
                  <span className="badge rounded-pill" style={{ background: "linear-gradient(135deg, #FF6B6B, #F59E0B)" }}>
                    AI Enthusiast
                  </span>
                </p>
                <p style={{ color: "#4B5563", maxWidth: "600px" }}>
                  A passionate computer science student from East West College of Engineering, Bangalore, 
                  with deep interest in artificial intelligence and full-stack development. 
                  This project represents the culmination of academic learning and practical innovation.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-5">
          <motion.h2 
            className="mb-4 text-center fw-bold"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2.5rem"
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
            Frequently Asked Questions
          </motion.h2>
          
          <div className="accordion" id="faqAccordion">
            {[
              {
                question: "How does the emotion detection work?",
                answer: "The application uses your webcam and DeepFace library to detect your current facial emotion and then generates a plan accordingly.",
                icon: "😊"
              },
              {
                question: "Is my webcam data stored anywhere?",
                answer: "No. Your webcam data is used only for real-time analysis and is not stored or transmitted to any server.",
                icon: "🔒"
              },
              {
                question: "Can I use the planner without detecting emotion?",
                answer: "Yes, manual planning is also supported if you prefer not to use the emotion detection feature.",
                icon: "🎯"
              },
              {
                question: "What if the system detects the wrong emotion?",
                answer: "You can retake the scan or manually override the suggestions in the planner. The AI learns from your corrections over time.",
                icon: "🤔"
              },
              {
                question: "Is this application free to use?",
                answer: "Yes, it is a student-developed project available for academic and personal use.",
                icon: "🎓"
              }
            ].map((faq, idx) => (
              <motion.div 
                className="accordion-item border-0 mb-3"
                key={idx}
                variants={scaleOnHover}
                whileHover="hover"
                initial="initial"
              >
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <motion.button
                    className="accordion-button collapsed border-0 rounded-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    style={{
                      background: "linear-gradient(135deg, #4F46E5, #0D9488)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="me-3" style={{ fontSize: "1.2rem" }}>{faq.icon}</span>
                    {faq.question}
                  </motion.button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <motion.div 
                    className="accordion-body p-4 rounded-bottom-3"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#4B5563",
                      fontSize: "1.05rem",
                      lineHeight: "1.6"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-5 pt-4"
          variants={fadeInUp}
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)"
          }}
        >
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            Made with ❤️ by . | East West College of Engineering
          </p>
        </motion.div>
      </motion.div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          .accordion-button:not(.collapsed)::after {
            filter: brightness(0) invert(1);
          }

          .accordion-button:focus {
            border-color: rgba(79, 70, 229, 0.5);
            box-shadow: 0 0 0 0.25rem rgba(79, 70, 229, 0.25);
          }

          .list-group-item {
            transition: all 0.3s ease;
          }

          .list-group-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
}
