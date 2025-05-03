import React, { createContext, useState, useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (user && token) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setCurrentUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const { user, token } = await authService.register(username, email, password);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setCurrentUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

