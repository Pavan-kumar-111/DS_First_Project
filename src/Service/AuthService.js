import axios from "axios";

const API_URL = "http://localhost:9106";

const AuthService = {
  // User Registration
  register: async (data) => {
    const endpoint =
      data.role === "ADMIN"
        ? "/admin/register"
        : data.role === "DOCTOR"
        ? "/doctor/register"
        : "/register";

    const response = await axios.post(`${API_URL}${endpoint}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  // User Login
  login: async (credentials) => {
    let loginUrl = `${API_URL}/login`; // Default login URL for users

    // Role-based login URL determination
    if (credentials.username.startsWith("admin")) {
      loginUrl = `${API_URL}/admin/login`;
    } else if (credentials.username.startsWith("doctor")) {
      loginUrl = `${API_URL}/doctor/login`;
    }

    const response = await axios.post(loginUrl, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    const { token, role } = response.data;

    // Store authentication data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);

    return response.data;
  },

  // User Logout
  logout: () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  },

  // Retrieve stored token
  getToken: () => localStorage.getItem("token"),

  // Check if the user is authenticated
  isAuthenticated: () => !!localStorage.getItem("token"),

  // Retrieve stored role
  getRole: () => localStorage.getItem("userRole"),

  // Decode JWT token
  decodeToken: (token) => {
    try {
      if (!token || typeof token !== "string") {
        throw new Error("Invalid token");
      }

      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Token does not have three parts");
      }

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  },

  // Retrieve user information from the decoded token
  getUserInfo: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return AuthService.decodeToken(token);
  },

  // Redirect based on role
  redirectToDashboard: (navigate) => {
    const role = AuthService.getRole();

    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/home");
    }
  },

  addDoctor: async (doctorData) => {
    const response = await axios.post(`${API_URL}/api/doctors`, doctorData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get All Doctors Method
  getDoctors: async (searchTerm = "") => {
    const response = await axios.get(`${API_URL}/api/doctors?search=${searchTerm}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Ensure this handles image data correctly
  },
};

export default AuthService;
