import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  CircularProgress,
  Alert,
  Button,
  Modal,
  Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trial-tabpanel-${index}`}
      aria-labelledby={`trial-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TrialScanner = () => {
  const [value, setValue] = useState(0);
  const [scansRemaining, setScansRemaining] = useState(3);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedScans = localStorage.getItem('trialScansRemaining');
    if (savedScans) {
      setScansRemaining(parseInt(savedScans));
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const performScan = () => {
    if (scansRemaining <= 0) {
      setOpenModal(true);
      return;
    }

    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      const threatsDetected = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
      setScanResults({
        threats: threatsDetected,
        isSafe: threatsDetected === 0,
        timestamp: new Date().toLocaleTimeString()
      });

      const newCount = scansRemaining - 1;
      setScansRemaining(newCount);
      localStorage.setItem('trialScansRemaining', newCount.toString());
      setIsScanning(false);

      if (newCount <= 0) {
        setTimeout(() => setOpenModal(true), 1000);
      }
    }, 2000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Threat Scanner (Trial Version)
      </Typography>
      
      <Typography variant="subtitle1" color="primary" gutterBottom>
        Scans remaining: {scansRemaining}/3
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="trial scanner tabs">
          <Tab label="URL Scanner" id="trial-tab-0" aria-controls="trial-tabpanel-0" />
          <Tab label="IP Scanner" id="trial-tab-1" aria-controls="trial-tabpanel-1" />
          <Tab label="PDF Scanner" id="trial-tab-2" aria-controls="trial-tabpanel-2" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Box 
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          onClick={performScan}
        >
          {isScanning ? (
            <>
              <CircularProgress />
              <Typography variant="h6" sx={{ mt: 2 }}>Scanning URL...</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">🔗</Typography>
              <Typography variant="h6">URL Scanner</Typography>
              <Typography>Enter URL to scan for malicious content</Typography>
            </>
          )}
        </Box>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Box 
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          onClick={performScan}
        >
          {isScanning ? (
            <>
              <CircularProgress />
              <Typography variant="h6" sx={{ mt: 2 }}>Scanning IP...</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">🌐</Typography>
              <Typography variant="h6">IP Scanner</Typography>
              <Typography>Enter IP address to check for threats</Typography>
            </>
          )}
        </Box>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Box 
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          onClick={performScan}
        >
          {isScanning ? (
            <>
              <CircularProgress />
              <Typography variant="h6" sx={{ mt: 2 }}>Scanning PDF...</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">📄</Typography>
              <Typography variant="h6">PDF Scanner</Typography>
              <Typography>Upload PDF to detect malicious content</Typography>
            </>
          )}
        </Box>
      </TabPanel>
      
      {scanResults && (
        <Box sx={{ mt: 3 }}>
          <Alert 
            severity={scanResults.isSafe ? 'success' : 'warning'} 
            sx={{ mb: 2 }}
          >
            Scan completed at {scanResults.timestamp}
          </Alert>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Scan Results
            </Typography>
            <Typography>
              {scanResults.isSafe 
                ? 'No threats detected in your content.'
                : `Detected ${scanResults.threats} potential threat(s).`}
            </Typography>
            {!scanResults.isSafe && (
              <Typography sx={{ mt: 1 }}>
                For detailed analysis and removal, please upgrade to full version.
              </Typography>
            )}
          </Paper>
        </Box>
      )}
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="trial-limit-modal"
        aria-describedby="trial-limit-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography id="trial-limit-modal" variant="h6" component="h2" gutterBottom>
            Trial Limit Reached
          </Typography>
          <Typography id="trial-limit-modal-description" sx={{ mb: 3 }}>
            You've used all your trial scans. Register for unlimited scanning.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default TrialScanner;