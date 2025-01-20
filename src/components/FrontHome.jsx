import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Asha_logo.png"; // Update the path to your logo
import videoConsultationIcon from "../assets/images/video-consultation-icon.png"; // Update the path to your icon
import findDoctorsIcon from "../assets/images/find-doctors-icon.png"; // Update the path to your icon
import surgeriesIcon from "../assets/images/surgeries-icon.png"; // Update the path to your icon
import "./scss/FrontHome.scss"; // Import the SCSS file

function FrontHome() {
  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-container hero-content">
          {/* Left Section: Title and Subtitle */}
          <div className="hero-text-container">
            <h1 className="hero-title">One Tap</h1>
            <p className="hero-subtitle">
              Solution to Your Hospital OP Booking
            </p>
            <Link to="/register" className="btn btn-primary">
              <div className="default-btn">
                <span>Book Appointment</span>
              </div>
              <div className="hover-btn">
                <span>Register</span>
              </div>
            </Link>
          </div>

          {/* Right Section: Logo */}
          <div className="hero-logo-container">
            <img
              src={logo}
              alt="Asha Hospital Logo"
              className="hero-logo"
            />
          </div>
        </div>

        {/* Service Icons Section */}
        <div className="service-icons-container">
          <div>
          <div className="service-card">
            <img
              src={videoConsultationIcon}
              alt="Video Consultation Service"
              className="service-icon"
            />
          </div>
          </div>
          <div className="service-card">
            <img
              src={findDoctorsIcon}
              alt="Find Doctors Service"
              className="service-icon"
            />
          </div>
          <div className="service-card">
            <img
              src={surgeriesIcon}
              alt="Surgeries Service"
              className="service-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontHome;
