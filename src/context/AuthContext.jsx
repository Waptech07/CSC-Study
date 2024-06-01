import React, { createContext, useState, useEffect, useCallback } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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
        });
    }
  }, [logout]);

  const login = async (email, password) => {
    try {
      const response = await ApiService.login(email, password);
      console.log("Login response:", response); // Log the response
      if (response.success) {
        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);
        setIsAuthenticated(true);
        setUser(response.data.user);
        setError(null); // Clear any previous error
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

  const register = (name, email, password, confirmPassword) => {
    return ApiService.register(name, email, password, confirmPassword)
      .then((response) => {
        if (response.success) {
          localStorage.setItem("access_token", response.data.token.access);
          localStorage.setItem("refresh_token", response.data.token.refresh);
          setIsAuthenticated(true);
          setUser(response.data.user);
          setError(null); // Clear any previous error
        } else {
          setError(response.error);
          return response;
        }
      })
      .catch((err) => {
        setError("Registration failed");
        throw err;
      });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
