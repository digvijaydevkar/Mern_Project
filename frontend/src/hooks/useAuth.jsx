import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../api/services';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      // Response structure after interceptor:
      // Backend: {status: "success", data: {token: "..."}}
      // Interceptor extracts: response.data = {token: "..."}
      // authService.login returns: response.data = {token: "..."}
      // So response here is {token: "..."}
      const token = response?.token;
      
      if (!token || typeof token !== 'string') {
        console.error('Invalid token response:', response);
        return { success: false, error: 'No token received from server' };
      }
      
      // Store token and user data
      localStorage.setItem('token', token);
      const userData = { email, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      // Ensure we always return a string error message
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        // Handle different error object structures
        if (error.response?.data) {
          const errorData = error.response.data;
          if (errorData.status === 'error' && errorData.data) {
            errorMessage = typeof errorData.data === 'string' ? errorData.data : String(errorData.data);
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.data) {
          errorMessage = typeof error.data === 'string' ? error.data : String(error.data);
        } else {
          errorMessage = String(error);
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

