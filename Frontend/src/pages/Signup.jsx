import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img from './image.png';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    password: "",
    profession: "",
    confirmPassword: "",
    emotions: [],
    goals: [],
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // For goal input fields
  const [goalInput, setGoalInput] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

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

  // Handle input change for main form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change for goal fields
  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoalInput({ ...goalInput, [name]: value });
  };

  // Add goal to goals array
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalInput.title) return;
    setFormData({
      ...formData,
      goals: [
        ...formData.goals,
        {
          title: goalInput.title,
          description: goalInput.description,
          dueDate: goalInput.dueDate,
        },
      ],
    });
    setGoalInput({ title: "", description: "", dueDate: "" });
  };

  // Remove goal from goals array
  const handleRemoveGoal = (idx) => {
    setFormData({
      ...formData,
      goals: formData.goals.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", formData);
      console.log("✅ Signup Success:", res.data);
      setMessage("🎉 Signup successful! Redirecting to login...");

      // Reset form
      setFormData({
        name: "",
        age: "",
        email: "",
        mobile: "",
        password: "",
        profession: "",
        confirmPassword: "",
        emotions: [],
        goals: [],
      });

      setGoalInput({ title: "", description: "", dueDate: "" });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "❌ Signup failed");
      setIsLoading(false);
    }
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
          marginTop: "20px",
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
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="col-xl-8 col-lg-10 col-md-12"
          variants={itemVariants}
        >
          <div
            className="shadow-lg rounded-4 d-flex overflow-hidden"
            style={{
              marginTop: "40px",
              marginBottom: "40px",
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
                  Start Your Journey with AI-Powered Planning
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
                  <p className="mb-2 fw-bold">Create Your Account</p>
                  <p className="mb-0 small">✨ Start planning your perfect days with AI</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              className="col-md-6 col-12 p-4 p-md-5 d-flex align-items-center"
              variants={itemVariants}
            >
              <div className="w-100" style={{ maxWidth: "500px" }}>
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
                    Create Account
                  </motion.h2>
                  <p className="text-muted">Join our AI-powered day planning community</p>
                </motion.div>

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
                  <div className="row">
                    {/* Name Field */}
                    <motion.div className="col-md-6 mb-4" variants={itemVariants}>
                      <label className="form-label fw-semibold text-dark mb-3">
                        <span className="me-2">👤</span>
                        Full Name
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <input
                          type="text"
                          name="name"
                          className="form-control border-0 p-3"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
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

                    {/* Age Field */}
                    <motion.div className="col-md-6 mb-4" variants={itemVariants}>
                      <label className="form-label fw-semibold text-dark mb-3">
                        <span className="me-2">🎂</span>
                        Age
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <input
                          type="number"
                          name="age"
                          className="form-control border-0 p-3"
                          placeholder="25"
                          value={formData.age}
                          onChange={handleChange}
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
                  </div>

                  {/* Email Field */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label className="form-label fw-semibold text-dark mb-3">
                      <span className="me-2">📧</span>
                      Email Address
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-0 p-3"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
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

                  {/* Mobile Field */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label className="form-label fw-semibold text-dark mb-3">
                      <span className="me-2">📱</span>
                      Mobile Number
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control border-0 p-3"
                        placeholder="+1 (555) 123-4567"
                        value={formData.mobile}
                        onChange={handleChange}
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

                  {/* Profession Field */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label className="form-label fw-semibold text-dark mb-3">
                      <span className="me-2">💼</span>
                      Profession
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        type="text"
                        name="profession"
                        className="form-control border-0 p-3"
                        placeholder="Software Developer"
                        value={formData.profession}
                        onChange={handleChange}
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

                  {/* Password Fields */}
                  <div className="row">
                    <motion.div className="col-md-6 mb-4" variants={itemVariants}>
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
                          name="password"
                          className="form-control border-0 p-3"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleChange}
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

                    <motion.div className="col-md-6 mb-4" variants={itemVariants}>
                      <label className="form-label fw-semibold text-dark mb-3">
                        <span className="me-2">✅</span>
                        Confirm Password
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          className="form-control border-0 p-3"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
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
                  </div>

                  {/* Goals Input Section */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label className="form-label fw-semibold text-dark mb-3">
                      <span className="me-2">🎯</span>
                      Add Your Goals (Optional)
                    </label>
                    <div className="row g-2 align-items-end">
                      <div className="col-12 col-md-4">
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <input
                            type="text"
                            name="title"
                            className="form-control border-0 p-2"
                            placeholder="Goal Title"
                            value={goalInput.title}
                            onChange={handleGoalChange}
                            style={{
                              background: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "12px",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                        </motion.div>
                      </div>
                      <div className="col-12 col-md-5">
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <input
                            type="text"
                            name="description"
                            className="form-control border-0 p-2"
                            placeholder="Description"
                            value={goalInput.description}
                            onChange={handleGoalChange}
                            style={{
                              background: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "12px",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                        </motion.div>
                      </div>
                      <div className="col-12 col-md-3">
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <input
                            type="date"
                            name="dueDate"
                            className="form-control border-0 p-2"
                            value={goalInput.dueDate}
                            onChange={handleGoalChange}
                            style={{
                              background: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "12px",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                    <motion.button
                      className="btn btn-outline-primary mt-2"
                      style={{
                        borderRadius: "12px",
                        padding: "8px 20px",
                        border: "2px solid #4F46E5"
                      }}
                      onClick={handleAddGoal}
                      type="button"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      ✨ Add Goal
                    </motion.button>

                    {/* List of added goals */}
                    <AnimatePresence>
                      {formData.goals.length > 0 && (
                        <motion.ul 
                          className="list-group mt-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {formData.goals.map((goal, idx) => (
                            <motion.li
                              key={idx}
                              className="list-group-item d-flex justify-content-between align-items-center mb-2"
                              style={{
                                background: "rgba(79, 70, 229, 0.1)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#4F46E5",
                              }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <span>
                                <strong>{goal.title}</strong>
                                {goal.description && <> - {goal.description}</>}
                                {goal.dueDate && (
                                  <span className="ms-2 badge rounded-pill" style={{ background: "linear-gradient(135deg, #FF6B6B, #FFD700)" }}>
                                    📅 {goal.dueDate}
                                  </span>
                                )}
                              </span>
                              <motion.button
                                type="button"
                                className="btn btn-sm rounded-circle"
                                style={{ 
                                  background: "linear-gradient(135deg, #FF6B6B, #EF4444)",
                                  color: "white",
                                  width: "30px",
                                  height: "30px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                                onClick={() => handleRemoveGoal(idx)}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                ×
                              </motion.button>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Signup Button */}
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span className="me-2">🚀</span>
                          Create Account
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>

                {/* Login Link */}
                <motion.div
                  className="text-center mt-4 pt-3"
                  variants={itemVariants}
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <p className="text-muted mb-2">
                    Already have an account?{" "}
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/login" 
                        className="fw-bold text-decoration-none"
                        style={{
                          background: "linear-gradient(135deg, #4F46E5, #0D9488)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
                      >
                        Login Here
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
        `}
      </style>
    </div>
  );
}
