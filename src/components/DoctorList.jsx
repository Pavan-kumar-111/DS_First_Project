import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./scss/DoctorList.scss";
import doctorImage from "../assets/images/doctorImage.png"; // Fallback image
import AuthService from "../Service/AuthService";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("search") || "";
        const response = await AuthService.getDoctors(searchTerm); // Fetch doctors based on search term
        setDoctors(response);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main">
      {doctors.map((doctor) => (
        <div className="container-doc" key={doctor.id}>
          <div className="image">
            <a href="">
              <img
                src={doctor.image ? `data:image/jpeg;base64,${doctor.image}` : doctorImage} // Use the base64 encoded image data or fallback image
                alt="doctor profile"
                className="doc_image"
              />
            </a>
            <p>view profile</p>
          </div>
          <div className="details">
            <h3 className="doc_name">
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="doc_details">{doctor.specialty}</p>
            <p className="doc_details">{doctor.experience} years experience overall</p>
            <strong>
              <i className="fas fa-map-marker-alt"></i> {doctor.location}
            </strong>
            <p className="doc_details">{doctor.hospitalAffiliation}</p>
            <p className="doc_details">
              Consultant fee &nbsp;
              <i className="fas fa-rupee-sign"></i>
              {doctor.consultationFee}
            </p>
          </div>
          <div className="booking">
            <strong>
              <i className="fas fa-calendar"></i> {doctor.availability || "Not Available"}
            </strong>
            <button>Book clinic visit <br /> No booking fee</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
