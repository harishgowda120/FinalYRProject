import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from './image.png';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(79, 70, 229, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 },
    loading: { 
      scale: [1, 1.02, 1],
      transition: { duration: 0.5, repeat: Infinity }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      setMessage("🎉 Login successful! Redirecting...");
      
      // Add success animation delay
      setTimeout(() => {
        loginUser(res.data.user);
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const demoLogin = () => {
    setEmail("harish@example.com");
    setPassword("harish123");
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Background Elements */}
      <div 
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
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

      <motion.div
        className="row justify-content-center w-100 mx-0"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="col-xl-8 col-lg-10 col-md-12"
          variants={itemVariants}
        >
          <div
            className="shadow-lg rounded-4 d-flex overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 20px 60px rgba(31, 38, 135, 0.37)",
              minHeight: "600px"
            }}
          >
            {/* Left Side - Brand Section */}
            <motion.div
              className="col-md-6 d-none d-md-flex align-items-center justify-content-center position-relative"
              style={{
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(13, 148, 136, 0.9) 50%, rgba(255, 107, 107, 0.8) 100%)",
                color: "#fff",
                overflow: "hidden"
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Background Pattern */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%),
                    linear-gradient(-45deg, transparent 30%, rgba(255, 215, 0, 0.05) 50%, transparent 70%)
                  `,
                  animation: "shimmer 8s infinite linear",
                  pointerEvents: "none"
                }}
              />
              
              <motion.div
                className="text-center position-relative z-1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FF6B6B, #667eea)",
                    borderRadius: "50%",
                    padding: "20px",
                    boxShadow: "0 15px 35px rgba(255, 107, 107, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px"
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={img}
                    alt="DayPlanner AI Logo"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                    }}
                  />
                </motion.div>

                <motion.h2
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "2.5rem",
                    textShadow: "0 4px 15px rgba(0,0,0,0.3)",
                    background: "linear-gradient(135deg, #FFD700, #FF6B6B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
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
                  DayPlanner AI
                </motion.h2>

                <motion.p
                  className="lead mb-4 opacity-90"
                  style={{ fontSize: "1.2rem" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Your AI-Powered Emotion-Based Daily Companion
                </motion.p>

                <motion.div
                  className="mt-4 p-3 rounded-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <p className="mb-2 fw-bold">Demo Credentials</p>
                  <p className="mb-1 small">📧 harish@example.com</p>
                  <p className="mb-0 small">🔐 harish123</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              className="col-md-6 col-12 p-4 p-md-5 d-flex align-items-center justify-content-center"
              variants={itemVariants}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <motion.div
                  className="text-center mb-4"
                  variants={itemVariants}
                >
                  <motion.h2
                    className="fw-bold mb-3"
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
                    Welcome Back
                  </motion.h2>
                  <p className="text-muted">Sign in to your AI-powered day planner</p>
                </motion.div>

                {/* Demo Login Button */}
                <motion.button
                  className="btn btn-outline-primary w-100 mb-4 border-2 fw-bold"
                  style={{
                    borderRadius: "15px",
                    padding: "12px",
                    background: "transparent",
                    borderColor: "#4F46E5",
                    color: "#4F46E5"
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={demoLogin}
                  disabled={isLoading}
                >
                  🚀 Try Demo Account
                </motion.button>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      className={`alert ${message.includes('✅') || message.includes('🎉') ? 'alert-success' : 'alert-danger'} text-center mb-4 border-0`}
                      style={{
                        borderRadius: "15px",
                        backdropFilter: "blur(10px)",
                        background: message.includes('✅') || message.includes('🎉') 
                          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))"
                          : "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))",
                        border: message.includes('✅') || message.includes('🎉') 
                          ? "1px solid rgba(16, 185, 129, 0.3)"
                          : "1px solid rgba(239, 68, 68, 0.3)"
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form onSubmit={handleSubmit} variants={containerVariants}>
                  {/* Email Field */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label className="form-label fw-semibold text-dark mb-3">
                      <span className="me-2">📧</span>
                      Email Address
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        type="email"
                        className="form-control border-0 p-3"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "15px",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.3)"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label className="form-label fw-semibold text-dark mb-0">
                        <span className="me-2">🔒</span>
                        Password
                      </label>
                      <motion.button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        <small className="text-primary fw-bold">
                          {showPassword ? '🙈 Hide' : '👁️ Show'}
                        </small>
                      </motion.button>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0 p-3"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "15px",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.3)"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      className="btn w-100 border-0 fw-bold text-white p-3"
                      style={{
                        background: "linear-gradient(135deg, #4F46E5, #0D9488, #FF6B6B)",
                        borderRadius: "15px",
                        boxShadow: "0 8px 25px rgba(79, 70, 229, 0.3)",
                        fontSize: "1.1rem"
                      }}
                      type="submit"
                      disabled={isLoading}
                      variants={buttonVariants}
                      whileHover={isLoading ? "loading" : "hover"}
                      whileTap="tap"
                      animate={isLoading ? "loading" : "initial"}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <span className="me-2">🚀</span>
                          Sign In
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>

                {/* Sign Up Link */}
                <motion.div
                  className="text-center mt-4 pt-3"
                  variants={itemVariants}
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <p className="text-muted mb-2">
                    Don't have an account?{" "}
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/signup" 
                        className="text-primary fw-bold text-decoration-none"
                        style={{
                          background: "linear-gradient(135deg, #4F46E5, #0D9488)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
                      >
                        Create Account
                      </Link>
                    </motion.span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
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

          /* Smooth transitions */
          .form-control {
            transition: all 0.3s ease;
          }

          .form-control:focus {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15) !important;
            border-color: rgba(79, 70, 229, 0.5) !important;
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

          /* Loading animation for button */
          @keyframes buttonPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }

          .btn-loading {
            animation: buttonPulse 0.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
