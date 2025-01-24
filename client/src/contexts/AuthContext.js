////auth context

// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => setUser(response.data.user))
                .catch(() => logout());
        }
        setLoading(false);
    }, []);

    const signup = async (name, email, password) => {
        try {
            const response = await axios.post('/auth/signup', { name, email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error('Sign up error:', error.response.data.message);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
