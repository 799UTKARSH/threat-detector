import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import scanService from '../../services/scanService';

const URLScanner = ({ userId }) => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleScan = async () => {
        if (!url) return;
        
        setLoading(true);
        try {
            const scanResult = await scanService.scanURL(url, userId);
            setResult(scanResult);
        } catch (error) {
            console.error('Scan failed:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const getThreatColor = () => {
        if (!result) return 'inherit';
        switch (result.threat_level) {
            case 'safe': return 'success.main';
            case 'suspicious': return 'warning.main';
            case 'malicious': return 'error.main';
            default: return 'inherit';
        }
    };
    
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                URL Scanner
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="Enter URL to scan"
                    variant="outlined"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleScan}
                    disabled={loading || !url}
                >
                    {loading ? <CircularProgress size={24} /> : 'Scan'}
                </Button>
            </Box>
            
            {result && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">
                        Result: <span style={{ color: getThreatColor() }}>
                            {result.threat_level.toUpperCase()}
                        </span>
                    </Typography>
                    <Typography variant="body2">
                        Action taken: {result.action}
                    </Typography>
                    <Typography variant="caption" component="div" sx={{ mt: 1 }}>
                        <pre>{JSON.stringify(result.features, null, 2)}</pre>
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default URLScanner;