import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Link } from '@mui/material';
import authService from '../../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await authService.login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom align="center">
                Login
            </Typography>
            
            {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                
                <Typography sx={{ mt: 2, textAlign: 'center' }}>
                    Don't have an account? <Link href="/register">Register</Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;