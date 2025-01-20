import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Footer.scss';
import logo from '../assets/images/Asha_logo.png';

const Footer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/doctors?search=${searchTerm}`);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Practo</h4>
          <ul>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press</Link></li>
            <li><Link to="#">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For patients</h4>
          <ul>
            <li><Link to="/doctors">Search for doctors</Link></li>  {/* Updated link */}
            <li><Link to="#">Search for clinics</Link></li>
            <li><Link to="#">Search for hospitals</Link></li>
            <li><Link to="#">Practo Plus</Link></li>
            <li><Link to="#">Covid Hospital listing</Link></li>
            <li><Link to="#">Practo Care Clinics</Link></li>
            <li><Link to="#">Read health articles</Link></li>
            <li><Link to="#">Read about medicines</Link></li>
            <li><Link to="#">Practo drive</Link></li>
            <li><Link to="#">Health app</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For doctors</h4>
          <ul>
            <li><Link to="#">Practo Profile</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For clinics</h4>
          <ul>
            <li><Link to="#">Ray by Practo</Link></li>
            <li><Link to="#">Practo Reach</Link></li>
            <li><Link to="#">Ray Tab</Link></li>
            <li><Link to="#">Practo Pro</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For hospitals</h4>
          <ul>
            <li><Link to="#">Insta by Practo</Link></li>
            <li><Link to="#">Qikwell by Practo</Link></li>
            <li><Link to="#">Practo Profile</Link></li>
            <li><Link to="#">Practo Reach</Link></li>
            <li><Link to="#">Practo Drive</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Practo Logo" />
          </Link>
        </div>
        <p>Copyright © 2025, Asha. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
