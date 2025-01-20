import React from "react";

const Contact = () => (
  <div>
    <h2>Contact Us</h2>
    <p>Email: support@asha.com</p>
    <p>Phone: +1-234-567-890</p>
    <form>
      <div>
        <label>Name:</label>
        <input type="text" placeholder="Enter your name" required />
      </div>
      <div>
        <label>Message:</label>
        <textarea placeholder="Enter your message" required></textarea>
      </div>
      <button type="submit" className="button">Submit</button>
    </form>
  </div>
);

export default Contact;
