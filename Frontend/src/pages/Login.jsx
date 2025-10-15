import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from './image.png';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://finalyrproject-2.onrender.com/api/users/login", {
        email,
        password,
      });

      setMessage("✅ Login successful!");

      loginUser(res.data.user); // store user in global state
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row justify-content-center w-100">
        <div
          className="col-lg-8 shadow rounded-4 p-0 d-flex"
          style={{ backgroundColor: "#fff", overflow: "hidden" }}
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
                maxHeight: "80%",       // Don't exceed container height
              }}
            />
          </div>

          {/* Right Side Login Form */}
          <div className="col-md-6 col-12 p-5">
            <h3 className="mb-4 text-center">Login</h3>
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* <p
                className="text-primary mb-2"
                style={{ fontSize: "0.9rem", cursor: "pointer" }}
              >
                Login with OTP
              </p> */}

              <div className="mb-3">
                <label>Enter your password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* <p
                className="text-warning mb-4"
                style={{ fontSize: "0.9rem", cursor: "pointer" }}
              >
                🔒 Forgot Password ?
              </p> */}

              <button
                className="btn btn-primary w-100 mb-3"
                style={{ borderRadius: "20px" }}
                type="submit"
              >
                Login
              </button>

              <div className="text-center">
                Don’t have an account?email
                "harish@example.com"
                password
                "harish123"{" "}
                <Link to="/signup" className="text-primary fw-bold">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

