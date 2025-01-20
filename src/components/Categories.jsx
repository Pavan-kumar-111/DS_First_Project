import React, { useRef } from 'react';
import dietitianImage from '../assets/images/dietitian.jpg';
import physiotherapistImage from '../assets/images/physiotherapist.jpg';
import generalSurgeonImage from '../assets/images/generalsurgeon.jpg';
import orthopedistImage from '../assets/images/orthopedist.jpg';
import cardiologistImage from '../assets/images/cardiologist.jpg';
import neurologistImage from '../assets/images/Neurologist.jpg';
import gynecologistImage from '../assets/images/gynecologist.jpg';

import "./scss/Categories.scss";

const categories = [
  {
    title: "Dietitian/Nutrition",
    description: "Get guidance on eating right, weight management and sports nutrition",
    image: dietitianImage,
  },
  {
    title: "Physiotherapist",
    description: "Pulled a muscle? Get it treated by a trained physiotherapist",
    image: physiotherapistImage,
  },
  {
    title: "General Surgeon",
    description: "Need to get operated? Find the right surgeon",
    image: generalSurgeonImage,
  },
  {
    title: "Orthopedist",
    description: "For Bone and Joints issues, spinal injuries and more",
    image: orthopedistImage,
  },
  {
    title: "Cardiologist",
    description: "Heart specialist for your cardiovascular health",
    image: cardiologistImage,
  },
  {
    title: "Neurologist",
    description: "Brain and nervous system specialist",
    image: neurologistImage,
  },
  {
    title: "Gynaecologist",
    description: "Women's health and reproductive specialist",
    image: gynecologistImage,
  },
];

const Categories = () => {
  const categoriesRef = useRef(null);

  const scroll = (direction) => {
    const { current } = categoriesRef;
    if (direction === 'left') {
      current.scrollBy({
        top: 0,
        left: -current.offsetWidth / 2,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      current.scrollBy({
        top: 0,
        left: current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="categories-container">
      <h2>Book an appointment for an in-clinic consultation</h2>
      <p>Find experienced doctors across all specialties</p>
      <div className="categories-wrapper">
        <button className="scroll-button scroll-button-left" onClick={() => scroll('left')}>
          ‹
        </button>
        <div className="categories" ref={categoriesRef}>
          {categories.map((category, index) => (
            <div className="category" key={index}>
              <img src={category.image} alt={category.title} />
              <h3 className="category-title">{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
        <button className="scroll-button scroll-button-right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Categories;
