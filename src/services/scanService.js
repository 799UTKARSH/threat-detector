import axios from 'axios';

const API_URL = 'http://localhost:5000/api/scans';

const scanURL = async (url, userId = null) => {
    const response = await axios.post(`${API_URL}/url`, {
        url,
        user_id: userId
    });
    return response.data;
};

const scanIP = async (ip, userId = null) => {
    const response = await axios.post(`${API_URL}/ip`, {
        ip,
        user_id: userId
    });
    return response.data;
};

const scanPDF = async (file, userId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (userId) formData.append('user_id', userId);
    
    const response = await axios.post(`${API_URL}/pdf`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const getHistory = async (userId) => {
    const response = await axios.get(`${API_URL}/history`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  };

export default {
    scanURL,
    scanIP,
    scanPDF,
    getHistory
};