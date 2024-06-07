import React, { createContext, useState, useEffect, useCallback } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    ApiService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoading(true); // Set loading to true when fetching user details
      ApiService.getUserDetails()
        .then((response) => {
          if (response.success) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            setError(response.error);
            logout();
          }
        })
        .catch((err) => {
          setError("Failed to fetch user details");
          logout();
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after fetching user details
        });
    } else {
      setIsLoading(false); // If no token, set loading to false immediately
    }
  }, [logout]);

  const login = async (email, password) => {
    try {
      const response = await ApiService.login(email, password);
      if (response.success) {
        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);
        setIsAuthenticated(true);
        setUser(response.data.user); // Ensure user object has isInstructor
        setError(null);
        return response;
      } else {
        setError(response.error);
        return response;
      }
    } catch (err) {
      setError("Login failed");
      throw err;
    }
  };

  const register = async (
    name,
    email,
    password,
    confirmPassword,
    isInstructor
  ) => {
    try {
      const response = await ApiService.register(
        name,
        email,
        password,
        confirmPassword,
        isInstructor
      );
      if (response.success) {
        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);
        setIsAuthenticated(true);
        setUser(response.data.user); // Ensure user object has isInstructor
        setError(null);
        return response;
      } else {
        setError(response.error);
        return response;
      }
    } catch (err) {
      setError("Registration failed");
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await ApiService.forgotPassword(email);
      return response;
    } catch (err) {
      setError("Failed to send password reset email");
      throw err;
    }
  };

  const resetPassword = async (uid, token, newPassword) => {
    try {
      const response = await ApiService.resetPassword(uid, token, newPassword);
      if (response.success) {
        return response;
      } else {
        setError(response.error);
        return response;
      }
    } catch (err) {
      setError("Failed to reset password");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
