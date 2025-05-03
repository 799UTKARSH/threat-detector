import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  Link
} from '@mui/material';
import authService from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authService.register(
        formData.username,
        formData.email,
        formData.password
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 4, 
      maxWidth: 400, 
      mx: 'auto', 
      mt: 8,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h5" gutterBottom align="center">
        Register
      </Typography>
      
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
        
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Register;