import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get admin info
      axios
        .get(`${API}/admin/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          setAdmin(response.data);
        })
        .catch(() => {
          // Token invalid
          localStorage.removeItem('adminToken');
          setToken(null);
          setAdmin(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${API}/admin/login`, { email, password });
    const { access_token, admin: adminData } = response.data;
    localStorage.setItem('adminToken', access_token);
    setToken(access_token);
    setAdmin(adminData);
    return adminData;
  };

  const signup = async (email, password, name) => {
    const response = await axios.post(`${API}/admin/signup`, { email, password, name });
    const { access_token, admin: adminData } = response.data;
    localStorage.setItem('adminToken', access_token);
    setToken(access_token);
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;