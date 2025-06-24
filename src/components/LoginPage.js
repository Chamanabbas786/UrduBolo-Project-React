import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for success/error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if yythe user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setMessage("You are already logged in.");
      navigate("/"); // Redirect to home if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Basic validation for email and password
    if (!email || !password) {
      setMessage("Email and password cannot be empty.");
      return;
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const apiUrl = "https://codecarehub.space/video_adminpenal/api_login.php";

      // Prepare JSON data
      const requestData = {
        email: email,
        password: password,
      };

      // POST request to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
        body: JSON.stringify(requestData), // Send data as JSON
      });

      // Handle the API response
      const data = await response.json();
      // console.log("API Response Data:", data); // Debugging log

      if (data.success) {
        setMessage("Login successful!");
        localStorage.setItem("isLoggedIn", "true"); // Set login status
        localStorage.setItem("userEmail", email); // Optionally store user info
        navigate("/"); // Navigate to home
      } else if (data.message) {
        setMessage(data.message); // Display the message from the API
      } else {
        setMessage("An unknown error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="options">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <span> | </span>
          <Link to="/register" className="signup-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
