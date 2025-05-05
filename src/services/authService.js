import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password
  });
  return response.data;
};

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });
    
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    }
    throw new Error('login failed');
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};