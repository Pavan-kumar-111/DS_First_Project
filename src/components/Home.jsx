import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Asha_logo.png";
import doctorImage from "../assets/images/doctorImage.png";
import doctorImage2 from "../assets/images/doctorImage2.png";
import doctorImage3 from "../assets/images/buddy.jpg";
import videoConsultationIcon from "../assets/images/video-consultation-icon.png";
import findDoctorsIcon from "../assets/images/find-doctors-icon.png";
import manageProfileIcon from "../assets/images/surgeries-icon.png";
import viewAppointmentsIcon from "../assets/images/surgeries-icon.png";
import accountSettingsIcon from "../assets/images/surgeries-icon.png";
import Categories from "./Categories";
import "./scss/Home.scss";


const doctors = [
  {
    name: "Dr. Minal Chandra",
    specialty: "Sr. Pain Consultant",
    hospital: "Epione Pain Management Hospital",
    rating: "★★★★★",
    image: doctorImage,
  },
  {
    name: "Dr. Sudheer Dara",
    specialty: "Chief of Pain Medicine",
    hospital: "Founder & Director of Epione",
    rating: "★★★★☆",
    image: doctorImage2,
  },
  {
    name: "Dr. Gupta",
    specialty: "Neurologist",
    hospital: "Apollo Hospital, Secunderabad",
    rating: "★★★★★",
    image: doctorImage3,
  },
];

function UserHome() {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex((prevIndex) =>
        prevIndex === doctors.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentDoctor = doctors[currentDoctorIndex];

  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-content">
          {/* User Dashboard Heading */}
          <div className="hero-text-container">
            <h1 className="hero-title">
              <span className="highlight">MEET</span> OUR
            </h1>
            <h1 className="hero-title">
              <span className="highlight">SPECIALIST</span>
            </h1>
          </div>
          {/* Specialist Info */}
          <div className="specialist-info-container">
            <div className="doctor-info-wrapper">
              <div className="doctor-image-container">
                <img
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  className="doctor-image"
                />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{currentDoctor.name}</h3>
                <p className="doctor-specialty">{currentDoctor.specialty}</p>
                <p className="doctor-hospital">{currentDoctor.hospital}</p>
                <p className="doctor-rating">{currentDoctor.rating}</p>
                <button className="btn-primary">
                  <span className="default-btn">
                    <span>BOOK NOW</span>
                  </span>
                  <span className="hover-btn">
                    <span>BOOK NOW</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Icons Section */}
        <div className="service-icons-container">
          <div className="service-card">
            <img
              src={videoConsultationIcon}
              alt="Instant Video Consultation"
              className="service-icon"
            />
          </div>
          <div className="service-card">
            <img
              src={findDoctorsIcon}
              alt="Find Doctors Near You"
              className="service-icon"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <Categories />
    </div>
  );
}

export default UserHome;
