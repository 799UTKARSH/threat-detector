import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress, 
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Fade
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';
import authService from '../../services/authService';
import { styled } from '@mui/material/styles';

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 450,
  margin: 'auto',
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  background: theme.palette.background.paper,
}));

const AuthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
}));

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await authService.login(username, password);
            
            // Debug log to verify response
            console.log('Login response:', response);
             // Store token and user data
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Force refresh and redirect
            window.location.href = '/Scanner';

            
        } catch (err) {
            // Enhanced error handling
            const errorMsg = err.response?.data?.error || 
                           err.message || 
                           'Login failed. Please check your details.';
            setError(errorMsg);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <AuthPaper>
            <Box textAlign="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                    Welcome Back
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Sign in to continue to your account
                </Typography>
            </Box>
            
            {error && (
                <Fade in={!!error}>
                    <Typography 
                        color="error" 
                        align="center" 
                        sx={{ mb: 2, p: 1.5, bgcolor: 'error.light', borderRadius: 1 }}
                    >
                        {error}
                    </Typography>
                </Fade>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    label="Username or Email"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    sx={{ mb: 2 }}
                    InputProps={{
                        style: { borderRadius: 12 }
                    }}
                />
                
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 1 }}
                    InputProps={{
                        style: { borderRadius: 12 },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <Box textAlign="right" mb={2}>
                    <Link href="/forgot-password" variant="body2" color="text.secondary">
                        Forgot password?
                    </Link>
                </Box>
                
                <AuthButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={!loading && <LoginIcon />}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </AuthButton>
                
                <Divider sx={{ my: 3 }}>OR</Divider>
                
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Link href="/register" color="primary" fontWeight="medium">
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </AuthPaper>
    );
};

export default Login;