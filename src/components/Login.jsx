import React, { useState } from "react";
import AuthService from "../Service/AuthService";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./scss/login.scss";
import loginGraphic from "../assets/images/loginlogo.png";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Safely determine role based on the current URL, fallback to "USER" if not valid
  const pathSegments = location.pathname.split("/");
  const role = pathSegments[2] && pathSegments[2].toUpperCase() || "USER";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Include role in the login request
      const response = await AuthService.login({ ...credentials, role });
      const { token, role: userRole } = response;

      // Set login state
      login();

      // Redirect based on role after successful login
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "An unexpected error occurred. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null);
  };

  return (
    <div className="login-container">
      <div className="register-options">
        <Link to="/login/admin" className="register-option">
          <div className="option-box">
            <i className="fas fa-user-shield"></i>
            <span>Login as Admin</span>
          </div>
        </Link>
        <Link to="/login/doctor" className="register-option">
          <div className="option-box">
            <i className="fas fa-user-md"></i>
            <span>Login as Doctor</span>
          </div>
        </Link>
        <Link to="/login/user" className="register-option">
          <div className="option-box">
            <i className="fas fa-user"></i>
            <span>Login as User</span>
          </div>
        </Link>
      </div>
      <div className="login-wrapper">
        <div className="login-form-container">
          <h2 className="login-heading">Login</h2>
          <p className="login-subheading">Sign in to continue</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user"></i> Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="******"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary login-button"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="login-links">
            <Link to="/register" className="text-primary">
              <i className="fas fa-user-plus"></i> Signup
            </Link>
            <br />
            <Link to="/ForgotPassword" className="text-secondary">
              <i className="fas fa-key"></i> Forgot Password?
            </Link>
          </div>
        </div>
        <div className="login-image-container">
          <img src={loginGraphic} alt="Login Graphic" />
        </div>
      </div>
    </div>
  );
};

export default Login;
