import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Asha_logo.png";
import appointmentScheduleIcon from "../assets/images/surgeries-icon.png";
import patientRecordsIcon from "../assets/images/surgeries-icon.png";
import "./scss/DoctorDashboard.scss";

function DoctorDashboard() {
  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-container hero-content">
          {/* Left Section: Title and Subtitle */}
          <div className="hero-text-container">
            <h1 className="hero-title">Doctor Dashboard</h1>
            <p className="hero-subtitle">Manage Appointments and Patient Records</p>
          </div>

          {/* Right Section: Logo */}
          <div className="hero-logo-container">
            <img src={logo} alt="Asha Hospital Logo" className="hero-logo" />
          </div>
        </div>

        {/* Service Icons Section */}
        <div className="service-icons-container">
          <div className="service-card">
            <img
              src={appointmentScheduleIcon}
              alt="Appointment Schedule"
              className="service-icon"
            />
          </div>
          <div className="service-card">
            <img
              src={patientRecordsIcon}
              alt="Patient Records"
              className="service-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
