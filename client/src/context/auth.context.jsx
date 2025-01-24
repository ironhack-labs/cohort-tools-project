// src/context/auth.context.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      response && storeToken(response.data.token);
      response && setUser(response.data.user);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setAuthError(error.response?.data?.message || "Sign up failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      storeToken(response.data.token);
      setUser(response.data.user);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setAuthError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        signup,
        login,
        logout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
