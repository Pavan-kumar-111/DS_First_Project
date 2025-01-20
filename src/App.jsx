import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider

import FrontHome from "./components/FrontHome";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import AdminDashboard from "./components/AdminDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AddDoctor from "./components/AddDoctor";  // Import AddDoctor page
import DoctorList from "./components/DoctorList"; // Import DoctorList page
import SearchBox from "./components/SearchBox"; // Import SearchBox component
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<FrontHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />
          <Route path="/login/doctor" element={<Login />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          {/* User Routes */}
          <Route 
            path="/home" 
            element={<ProtectedRoute allowedRoles={["USER"]}><Home /></ProtectedRoute>} 
          />
          <Route 
            path="/about" 
            element={<ProtectedRoute allowedRoles={["USER"]}><About /></ProtectedRoute>} 
          />
          <Route 
            path="/services" 
            element={<ProtectedRoute allowedRoles={["USER"]}><Services /></ProtectedRoute>} 
          />
          <Route 
            path="/contact" 
            element={<ProtectedRoute allowedRoles={["USER"]}><Contact /></ProtectedRoute>} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/add-doctor" 
            element={<ProtectedRoute allowedRoles={["ADMIN"]}><AddDoctor /></ProtectedRoute>} 
          />

          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={<ProtectedRoute allowedRoles={["DOCTOR"]}><DoctorDashboard /></ProtectedRoute>} 
          />

          {/* Public or General Routes */}
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/search" element={<SearchBox />} />

          {/* Fallback for Undefined Routes */}
          <Route path="*" element={<FrontHome />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
