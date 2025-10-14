import React, { useState } from "react";
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
  // For goal input fields
  const [goalInput, setGoalInput] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

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

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", formData);
      console.log("✅ Signup Success:", res.data);
      setMessage("✅ Signup successful! Redirecting to login...");

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
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row justify-content-center mt-5 mb-5 w-100">
        <div
          className="col-12 col-lg-10 shadow rounded-4 p-0 d-flex"
          style={{
            backgroundColor: "#fff",
            overflow: "hidden",
            minHeight: "600px",
          }}
        >
          {/* Left Side Image/Gradient */}
          <div
                      className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
                      style={{
                        background: "linear-gradient(to bottom, #fbd3fc, #a18cd1)",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      <img
                        src={img}
                        alt="Logo"
                        style={{
                          width: "90%",           // Take 70% of container width
                          height: "auto",         // Maintain aspect ratio
                          borderRadius: "12px",   // Rounded corners
                          objectFit: "contain",   // Make sure it scales properly
                          maxHeight: "90%",       // Don't exceed container height
                        }}
                      />
                    </div>

          {/* Right Side Signup Form */}
          <div className="col-md-6 col-12 p-5">
            <h3 className="mb-4 text-center">Signup</h3>
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  className="form-control"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Goals Input Section */}
              <div className="mb-4">
                <label className="fw-bold">Add Your Goals</label>
                <div className="row g-2 align-items-end">
                  <div className="col-12 col-md-4">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Goal Title"
                      value={goalInput.title}
                      onChange={handleGoalChange}
                    />
                  </div>
                  <div className="col-12 col-md-5">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      value={goalInput.description}
                      onChange={handleGoalChange}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="date"
                      name="dueDate"
                      className="form-control"
                      value={goalInput.dueDate}
                      onChange={handleGoalChange}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-outline-primary mt-2"
                  style={{ borderRadius: "20px" }}
                  onClick={handleAddGoal}
                  type="button"
                >
                  Add Goal
                </button>
                {/* List of added goals */}
                {formData.goals.length > 0 && (
                  <ul className="list-group mt-3">
                    {formData.goals.map((goal, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ background: "rgba(248,210,252,0.10)", color: "#6c3483" }}
                      >
                        <span>
                          <strong>{goal.title}</strong>
                          {goal.description && <> - {goal.description}</>}
                          {goal.dueDate && (
                            <span className="ms-2 badge bg-primary">
                              Due: {goal.dueDate}
                            </span>
                          )}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          style={{ borderRadius: "12px" }}
                          onClick={() => handleRemoveGoal(idx)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                style={{ borderRadius: "20px" }}
              >
                Signup
              </button>
              <div className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}