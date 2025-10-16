// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import GetStarted from './components/GetStarted';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ReviewReport from './components/ReviewReport';
import ReviewHistory from './components/ReviewHistory';
import GuestReview from './components/GuestReview';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/get-started" />;
};

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return !token ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - No Navbar */}
          <Route path="/" element={<Landing />} />
          <Route path="/get-started" element={
            <PublicRoute>
              <GetStarted />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Guest Review Route - No Auth Required */}
          <Route path="/guest-review" element={
            <div className="min-h-screen bg-slate-50">
              <Navbar />
              <GuestReview />
            </div>
          } />

          {/* Private Routes - With Navbar */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <div className="min-h-screen bg-slate-50">
                <Navbar />
                <Dashboard />
              </div>
            </PrivateRoute>
          } />
          <Route path="/review/:id" element={
            <PrivateRoute>
              <div className="min-h-screen bg-slate-50">
                <Navbar />
                <ReviewReport />
              </div>
            </PrivateRoute>
          } />
          <Route path="/history" element={
            <PrivateRoute>
              <div className="min-h-screen bg-slate-50">
                <Navbar />
                <ReviewHistory />
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;