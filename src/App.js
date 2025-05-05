import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ScanProvider } from './context/ScanContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScanProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              {/* <Route path="/scanner" element={<Scanner />} /> */}
              <Route path="/scanner" element={<PrivateRoute><Scanner /></PrivateRoute>} />
            </Routes>
          </Layout>
        </ScanProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;