import React, { useState } from "react";
import AuthService from "../Service/AuthService";
import { useNavigate, Link } from "react-router-dom";
import './scss/ForgotPassword.scss'


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.forgotPassword({ email });
      setSuccess("A password reset link has been sent to your email.");
      setError(null);
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password-button">Submit</button>
        </form>
        <div className="login-links">
          <Link to="/login" className="text-primary">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <br />
          <Link to="/register" className="text-secondary">
            <i className="fas fa-user-plus"></i> Register as a new user
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
