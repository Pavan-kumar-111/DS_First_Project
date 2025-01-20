import React, { useState } from "react";
import "./scss/SearchBox.scss"; // Import updated SCSS

const SearchBox = () => {
  const [city, setCity] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [cityList] = useState([
    "Hyderabad", "Bangalore", "Chennai", "Coimbatore", "Jaipur",
    "Warangal", "Thiruvananthapuram", "Mysore", "Orissa", "New Delhi",
    "Shimla", "Srinagar", "West Bengal", "Kohima",
  ]);
  const [specialists] = useState([
    "Dental", "Orthopedic", "Gynecologist", "Dermatologist", "Neurologist",
    "Cardiologist", "Nephrologist", "Podiatrist", "Geriatrics", "Hematologist",
    "Radiologist",
  ]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSpecialist, setFilteredSpecialist] = useState([]);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleSpecialistChange = (e) => {
    const value = e.target.value;
    setSpecialist(value);

    if (value) {
      const filtered = specialists.filter((specialist) =>
        specialist.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSpecialist(filtered);
    } else {
      setFilteredSpecialist([]);
    }
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setFilteredCities([]);
  };

  const handleSpecialistSelect = (specialistName) => {
    setSpecialist(specialistName);
    setFilteredSpecialist([]);
  };

  return (
    <div className="searchbox-container">
      <h1>Search for Specialists in your Location</h1>
      <div className="searchbox-search-container">
        <div className="searchbox-city-search">
          <input
            className="searchbox-input"
            type="text"
            placeholder="Search for City..."
            value={city}
            onChange={handleCityChange}
          />
          {filteredCities.length > 0 && (
            <ul className="searchbox-dropdown">
              {filteredCities.map((cityName, index) => (
                <li key={index} onClick={() => handleCitySelect(cityName)}>
                  {cityName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="searchbox-specialist-search">
          <input
            className="searchbox-input"
            type="text"
            placeholder="Search for Specialist..."
            value={specialist}
            onChange={handleSpecialistChange}
          />
          {filteredSpecialist.length > 0 && (
            <ul className="searchbox-dropdown">
              {filteredSpecialist.map((specialistName, index) => (
                <li key={index} onClick={() => handleSpecialistSelect(specialistName)}>
                  {specialistName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="searchbox-button"
          onClick={() => console.log(city, specialist)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
