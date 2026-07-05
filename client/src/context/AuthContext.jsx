import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create base configured axios instance
export const api = axios.create({
  baseURL: '', // Vite proxy maps to localhost:5000 automatically
  withCredentials: true, // Send secure cookies
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set Auth header when token changes
  const setAuthHeader = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  const checkUserSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthHeader(token);
        const res = await api.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          logout();
        }
      }
    } catch (err) {
      console.error('Session verification failed:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
    
    // Setup global response interceptor to catch unauthorized calls
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response && err.response.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        setAuthHeader(res.data.token);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Server logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      setAuthHeader(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, checkUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
