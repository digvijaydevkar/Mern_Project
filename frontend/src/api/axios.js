import axios from 'axios';

// Get base URL from environment variable or use default
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Backend expects 'token' header, not 'Authorization: Bearer'
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle global errors
api.interceptors.response.use(
  (response) => {
    // Backend returns {status: "success", data: ...} or {status: "error", data: "error message"}
    const { status, data } = response.data;
    
    if (status === 'error') {
      return Promise.reject(new Error(data || 'An error occurred'));
    }
    
    // Return the data directly for easier consumption
    return { ...response, data: data || response.data };
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login will be handled by ProtectedRoute component
      window.location.href = '/login';
    }
    
    // Extract error message - ensure it's always a string
    let errorMessage = 'An error occurred';
    
    if (error.response?.data) {
      const responseData = error.response.data;
      // Backend returns {status: "error", data: "error message"}
      if (responseData.status === 'error' && responseData.data) {
        errorMessage = typeof responseData.data === 'string' 
          ? responseData.data 
          : responseData.data.message || String(responseData.data);
      } else if (responseData.data) {
        errorMessage = typeof responseData.data === 'string' 
          ? responseData.data 
          : String(responseData.data);
      } else if (responseData.message) {
        errorMessage = responseData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;

