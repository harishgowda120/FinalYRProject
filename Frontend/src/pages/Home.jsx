import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: !isMobile ? {
      scale: 1.03,
      y: -8,
      boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    } : {}
  };

  const featureCards = [
    {
      icon: "🎭",
      title: "Emotion Detection",
      description: "Uses your webcam and AI to detect your mood in real-time, helping you plan your day according to how you feel.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: "📅",
      title: "Smart Planner",
      description: "Get personalized task recommendations, reminders, and productivity tips. Integrate with Google Calendar for seamless scheduling.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: "📊",
      title: "Dashboard & Analytics",
      description: "Track your emotional trends and productivity over time with a user-friendly dashboard and insightful analytics.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your webcam data is never stored or shared. All emotion detection is processed locally for your privacy and security.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      icon: "🚀",
      title: "Productivity Boost",
      description: "Receive actionable tips and reminders tailored to your emotional state to maximize your daily output.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      icon: "🏆",
      title: "Goal Tracking",
      description: "Set, track, and achieve your goals. Get reminders and progress analytics to help you stay on track.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  const collaborationCard = {
    icon: "🤝",
    title: "Collaboration & Team Features",
    description: "Collaborate with friends or colleagues, share your planner, and motivate each other to reach your goals together.",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  };

  return (
    <div 
      className="d-flex" 
      style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Background Elements - Responsive */}
      {!isMobile && (
        <>
          <div 
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: isMobile ? "150px" : "300px",
              height: isMobile ? "150px" : "300px",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          />
          <div 
            style={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              width: isMobile ? "100px" : "200px",
              height: isMobile ? "100px" : "200px",
              background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite reverse",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
            }}
          />
        </>
      )}
      
      {/* Floating Particles - Reduced on mobile */}
      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${Math.random() * (isMobile ? 3 : 6) + 2}px`,
            height: `${Math.random() * (isMobile ? 3 : 6) + 2}px`,
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, isMobile ? -15 : -30, 0],
            x: [0, Math.random() * (isMobile ? 10 : 20) - (isMobile ? 5 : 10), 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * (isMobile ? 3 : 5) + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      <Sidebar />
      
      {/* Main Content Container - Responsive */}
      <motion.div
        ref={mainRef}
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
        style={{
          padding: isMobile ? "20px 0" : "40px 0",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: isMobile ? "20px" : "40px",
          margin: isMobile ? "15px" : "30px",
          boxShadow: "0 20px 60px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          position: "relative",
          overflow: "hidden",
          width: "100%"
        }}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Animated Background Pattern */}
        {!isMobile && (
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                linear-gradient(45deg, transparent 30%, rgba(79, 70, 229, 0.03) 50%, transparent 70%),
                linear-gradient(-45deg, transparent 30%, rgba(255, 107, 107, 0.03) 50%, transparent 70%)
              `,
              animation: "shimmer 8s infinite linear",
              pointerEvents: "none"
            }}
          />
        )}

        {/* Main Header Section - Responsive */}
        <motion.div
          className="text-center mb-4 mb-md-5 px-3"
          variants={itemVariants}
          style={{ width: "100%" }}
        >
          <motion.div
            className="mb-3 mb-md-4"
            style={{
              background: "linear-gradient(135deg, #FFD700, #FF6B6B, #667eea)",
              borderRadius: "50%",
              width: isMobile ? "100px" : "140px",
              height: isMobile ? "100px" : "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px auto",
              boxShadow: "0 15px 35px rgba(255, 107, 107, 0.4)",
              fontSize: isMobile ? "2.5rem" : "4rem",
              color: "#fff",
              position: "relative"
            }}
            animate={!isMobile ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🗓️
            {/* Pulsing Ring Effect - Only on desktop */}
            {!isMobile && (
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "2px solid rgba(255, 215, 0, 0.5)",
                  borderRadius: "50%",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </motion.div>

          <motion.h2
            className="fw-bold mb-3 mb-md-4 px-2"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: isMobile ? "1.8rem" : "3.5rem",
              letterSpacing: "1px",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              lineHeight: isMobile ? "1.2" : "1.3"
            }}
            animate={!isMobile ? {
              backgroundPosition: ["0%", "100%", "0%"],
            } : {}}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Welcome to AI-Powered Day Planner
          </motion.h2>

          <motion.p
            className="lead mb-3 mb-md-4 px-3"
            style={{ 
              color: "#4B5563", 
              fontSize: isMobile ? "1rem" : "1.3rem",
              maxWidth: "800px",
              lineHeight: "1.6",
              margin: "0 auto"
            }}
            variants={itemVariants}
          >
            Your personalized assistant that adapts your daily plan based on your emotions.
            <br className="d-none d-md-block" />
            Boost your productivity and well-being with smart, emotion-aware scheduling.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid - Responsive */}
        <motion.div 
          className="row w-100 justify-content-center mb-4 mb-md-5 px-2 px-md-4"
          variants={containerVariants}
          style={{ margin: 0 }}
        >
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              className="col-12 col-sm-6 col-lg-4 mb-3"
              variants={cardVariants}
              whileHover="hover"
              style={{
                padding: isMobile ? "8px" : "12px"
              }}
            >
              <motion.div
                className="card h-100 border-0 position-relative"
                style={{
                  borderRadius: isMobile ? "16px" : "25px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  cursor: "pointer",
                  minHeight: isMobile ? "220px" : "280px"
                }}
                whileHover={!isMobile ? {
                  boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)"
                } : {}}
              >
                {/* Animated Background */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: feature.gradient,
                  }}
                />
                
                <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-center">
                  <motion.div
                    className="text-center mb-2 mb-md-3"
                    style={{
                      fontSize: isMobile ? "2rem" : "3rem",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                    animate={!isMobile ? {
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h5 
                    className="card-title fw-bold text-center mb-2 mb-md-3"
                    style={{
                      background: feature.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: isMobile ? "1.1rem" : "1.4rem",
                      lineHeight: "1.3"
                    }}
                  >
                    {feature.title}
                  </h5>
                  
                  <p 
                    className="text-center"
                    style={{ 
                      color: "#6B7280",
                      lineHeight: "1.5",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      margin: 0
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Overlay - Only on desktop */}
                {!isMobile && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: feature.gradient,
                      opacity: 0,
                      borderRadius: "25px",
                      zIndex: -1
                    }}
                    whileHover={{
                      opacity: 0.05,
                      transition: { duration: 0.3 }
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Collaboration Card - Responsive */}
        <motion.div 
          className="row w-100 justify-content-center mb-4 mb-md-5 px-2 px-md-4"
          variants={itemVariants}
          style={{ margin: 0 }}
        >
          <div className="col-12 col-lg-10 col-xl-8">
            <motion.div
              className="card border-0 position-relative"
              style={{
                borderRadius: isMobile ? "16px" : "25px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                overflow: "hidden"
              }}
              whileHover={!isMobile ? {
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(255, 107, 107, 0.2)"
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: collaborationCard.gradient,
                }}
              />
              
              <div className="card-body p-3 p-md-5 text-center">
                <motion.div
                  style={{
                    fontSize: isMobile ? "2.5rem" : "4rem",
                    marginBottom: isMobile ? "15px" : "20px",
                    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.1))"
                  }}
                  animate={!isMobile ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {collaborationCard.icon}
                </motion.div>
                
                <h3 
                  className="fw-bold mb-2 mb-md-3"
                  style={{
                    background: collaborationCard.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: isMobile ? "1.4rem" : "2rem",
                    lineHeight: "1.3"
                  }}
                >
                  {collaborationCard.title}
                </h3>
                
                <p 
                  className="mb-0"
                  style={{ 
                    color: "#6B7280",
                    lineHeight: "1.6",
                    fontSize: isMobile ? "0.9rem" : "1.1rem",
                    margin: "0 auto",
                    maxWidth: "600px"
                  }}
                >
                  {collaborationCard.description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tip Alert - Responsive */}
        <motion.div
          className="alert text-center position-relative mx-2 mx-md-3"
          style={{
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "16px",
            fontSize: isMobile ? "0.9rem" : "1.1rem",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)",
            width: isMobile ? "90%" : "75%",
            padding: isMobile ? "12px 16px" : "16px 24px",
            margin: "0 auto"
          }}
          variants={itemVariants}
          whileHover={!isMobile ? {
            scale: 1.02,
            borderColor: "rgba(79, 70, 229, 0.4)"
          } : {}}
        >
          <strong style={{ color: "#4F46E5" }}>💡 Tip:</strong> 
          <span style={{ color: "#4B5563" }}>
            {" "}Start your day with a quick emotion scan and let DayPlanner AI guide you to a more productive day!
          </span>
        </motion.div>

        {/* Footer - Responsive */}
        <motion.div
          className="mt-4 mt-md-5 text-center px-3"
          style={{ 
            color: "#6B7280", 
            fontSize: isMobile ? "0.9rem" : "1.1rem" 
          }}
          variants={itemVariants}
        >
          <span style={{ opacity: 0.8 }}>East West College of Engineering, Bangalore</span>
        </motion.div>
      </motion.div>

      {/* Global Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(360deg); }
          }

          @keyframes pulseRing {
            0% { 
              transform: scale(1);
              opacity: 1;
            }
            100% { 
              transform: scale(1.5);
              opacity: 0;
            }
          }

          /* Responsive typography */
          @media (max-width: 576px) {
            .display-4 {
              font-size: 2rem !important;
            }
            .lead {
              font-size: 1rem !important;
            }
          }

          @media (max-width: 768px) {
            .display-4 {
              font-size: 2.5rem !important;
            }
          }

          /* Touch-friendly interactions */
          @media (max-width: 768px) {
            .card {
              transition: transform 0.2s ease !important;
            }
            
            .card:active {
              transform: scale(0.98) !important;
            }
          }

          /* Prevent horizontal scroll */
          body {
            overflow-x: hidden !important;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #4F46E5, #0D9488);
            border-radius: 8px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FF6B6B, #FFD700);
          }

          /* Performance optimizations for mobile */
          @media (max-width: 768px) {
            * {
              -webkit-tap-highlight-color: transparent;
            }
          }
        `}
      </style>
    </div>
  );
}
