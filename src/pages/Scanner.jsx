import React from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import URLScanner from '../components/ThreatScanner/URLScanner';
import IPScanner from '../components/ThreatScanner/IPScanner';
import PDFScanner from '../components/ThreatScanner/PDFScanner';
import { useAuth } from '../context/AuthContext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

const Scanner = () => {
    const [value, setValue] = React.useState(0);
    const { user } = useAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Threat Scanner
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="scanner tabs">
                    <Tab label="URL Scanner" />
                    <Tab label="IP Scanner" />
                    <Tab label="PDF Scanner" />
                </Tabs>
            </Box>
            
            <TabPanel value={value} index={0}>
                <URLScanner userId={user?.id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <IPScanner userId={user?.id} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PDFScanner userId={user?.id} />
            </TabPanel>
        </Container>
    );
};

export default Scanner;