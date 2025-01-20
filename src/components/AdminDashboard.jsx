import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Asha_logo.png";
import manageUsersIcon from "../assets/images/surgeries-icon.png";
import viewReportsIcon from "../assets/images/surgeries-icon.png";
import addDoctorIcon from "../assets/images/surgeries-icon.png";  // Add a new icon for Add Doctor
import "./scss/AdminDashboard.scss";

function AdminDashboard() {
  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-container hero-content">
          {/* Left Section: Title and Subtitle */}
          <div className="hero-text-container">
            <h1 className="hero-title">Admin Dashboard</h1>
            <p className="hero-subtitle">Manage Users, View Reports, and Add Doctors</p>
          </div>

          {/* Right Section: Logo */}
          <div className="hero-logo-container">
            <img src={logo} alt="Asha Hospital Logo" className="hero-logo" />
          </div>
        </div>

        {/* Service Icons Section */}
        <div className="service-icons-container">
          <Link to="/admin/manage-users" className="service-card">
            <img
              src={manageUsersIcon}
              alt="Manage Users"
              className="service-icon"
            />
          </Link>

          <Link to="/admin/view-reports" className="service-card">
            <img
              src={viewReportsIcon}
              alt="View Reports"
              className="service-icon"
            />
          </Link>

          {/* New Service Card for Adding Doctors */}
          <Link to="/admin/add-doctor" className="service-card">
            <img
              src={addDoctorIcon}
              alt="Add Doctor"
              className="service-icon"
            />
          </Link>
          
        </div>
      </div>
      
    </div>
  );
}

export default AdminDashboard;
