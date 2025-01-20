import React, { useState, useEffect } from "react";
import AuthService from "../Service/AuthService";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./scss/Register.scss";
import Registerlogo from '../assets/images/Registerlogo.jpg';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    contactNo: "",
    gender: "Select",
    role: "USER",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (role && ["admin", "doctor", "user"].includes(role.toLowerCase())) {
      setFormData((prevFormData) => ({ ...prevFormData, role: role.toUpperCase() }));
    }
  }, [role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(formData);
      setSuccess("Registration successful. Redirecting to login page...");
      setErrors({});
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
      setSuccess("");
    }
  };

  const getHeadingText = () => {
    switch (formData.role) {
      case "ADMIN":
        return "Register as Admin";
      case "DOCTOR":
        return "Register as Doctor";
      default:
        return "Create New Account";
    }
  };

  const renderRoleOptions = () => {
    const options = {
      ADMIN: ["ADMIN"],
      DOCTOR: ["DOCTOR"],
      USER: ["USER"]
    };

    const selectedRole = role ? role.toUpperCase() : "USER";
    const availableOptions = options[selectedRole];

    return availableOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-options">
          <Link to="/register/admin" className="register-option">
            <div className="option-box">
              <i className="fas fa-user-shield"></i>
              <span>Register as Admin</span>
            </div>
          </Link>
          <Link to="/register/doctor" className="register-option">
            <div className="option-box">
              <i className="fas fa-user-md"></i>
              <span>Register as Doctor</span>
            </div>
          </Link>
          <Link to="/register/user" className="register-option">
            <div className="option-box">
              <i className="fas fa-user"></i>
              <span>Register as User</span>
            </div>
          </Link>
        </div>
        <div className="register-form-container">
          <h2 className="register-heading">{getHeadingText()}</h2>
          <div className="login-links">
            <Link to="/login" className="text-primary">
              <i className="fas fa-user-plus"></i> Already have an account? Login
            </Link>
          </div>
          {success && <div className="alert alert-success">{success}</div>}
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="mb-3">
              <label className="form-label">USER NAME</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">PASSWORD</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">EMAIL</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">PHONE NUMBER</label>
              <input
                type="text"
                className="form-control"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
              {errors.contactNo && <p className="error">{errors.contactNo}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">GENDER</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Select" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">ROLE</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
                disabled
              >
                {renderRoleOptions()}
              </select>
              {errors.gender && <p className="error">{errors.role}</p>}
            </div>

            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
        <div className="register-image-container">
          <img src={Registerlogo} alt="Healthcare" />
        </div>
      </div>
    </div>
  );
};

export default Register;
