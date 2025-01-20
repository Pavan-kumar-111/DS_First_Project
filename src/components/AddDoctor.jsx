import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import "./scss/AddDoctor.scss"; // Ensure this is the correct path

const AddDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contactNo: "",
    gender: "",
    specialty: "",
    experience: 0,
    location: "",
    hospitalAffiliation: "",
    consultationFee: 0,
    availability: "",
    image: "" // Add a field for the image
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object to include the image and other form data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        data.append(key, formData[key]);
      }
    });
    if (formData.image) {
      data.append("image", formData.image); // Append image if present
    }

    try {
      await AuthService.addDoctor(data); // Call the addDoctor API method with FormData
      setSuccess("Doctor added successfully!");
      setErrors({});
      setTimeout(() => {
        alert("Doctor added successfully!"); // Alert message
        navigate("/admin"); // Redirect to the admin dashboard
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "Failed to add doctor. Please try again." });
      }
      setSuccess("");
    }
  };

  return (
    <div className="add-doctor-page">
      <div className="add-doctor-container">
        <div className="add-doctor-form-container">
          <h2 className="add-doctor-heading">Add Doctor</h2>
          {success && <div className="alert alert-success">{success}</div>}
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <form onSubmit={handleSubmit} className="add-doctor-form">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Username</label>
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

            <div className="form-group">
              <label className="form-label">Email</label>
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

            <div className="form-group">
              <label className="form-label">Contact No</label>
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

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Specialty</label>
              <input
                type="text"
                className="form-control"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              />
              {errors.specialty && <p className="error">{errors.specialty}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
              {errors.experience && <p className="error">{errors.experience}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Hospital Affiliation</label>
              <input
                type="text"
                className="form-control"
                name="hospitalAffiliation"
                value={formData.hospitalAffiliation}
                onChange={handleChange}
                required
              />
              {errors.hospitalAffiliation && <p className="error">{errors.hospitalAffiliation}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Consultation Fee</label>
              <input
                type="number"
                className="form-control"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                required
              />
              {errors.consultationFee && <p className="error">{errors.consultationFee}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Availability</label>
              <input
                type="text"
                className="form-control"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              />
              {errors.availability && <p className="error">{errors.availability}</p>}
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              {errors.image && <p className="error">{errors.image}</p>}
            </div>

            <button type="submit" className="add-doctor-button" disabled={loading}>
              {loading ? "Adding Doctor..." : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
