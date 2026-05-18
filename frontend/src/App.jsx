import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages & layout
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/layout/DashboardLayout';

// Dashboard tab views
import MainDashboard from './components/dashboard/overview/MainDashboard';
import Profile from './components/dashboard/Profile';
import Plans from './components/dashboard/Plans';
import TrainersPage from './components/dashboard/Trainers';
import WorkoutPlans from './components/dashboard/WorkoutPlans';
import DietPlan from './components/dashboard/DietPlan';

// Auth
import AuthModal from './components/AuthModal';

// Weekly days used by MainDashboard (static for now)
const WEEK_DAYS = [
  { day: 'Mon', status: 'present' },
  { day: 'Tue', status: 'present' },
  { day: 'Wed', status: 'present' },
  { day: 'Thu', status: 'absent' },
  { day: 'Fri', status: 'present' },
  { day: 'Sat', status: 'present' },
  { day: 'Sun', status: 'pending' },
];

// Protected wrapper — redirects to "/" if not logged in
const ProtectedRoute = ({ isLoggedIn, onLogout, children }) => {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    navigate('/user/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Routes>
        {/* ── Public landing page ── */}
        <Route
          path="/"
          element={
            <LandingPage onOpenAuth={() => setIsAuthOpen(true)} />
          }
        />

        {/* ── Protected user dashboard ── */}
        <Route
          path="/user"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} onLogout={handleLogout}>
              <DashboardLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          {/* Default /user → /user/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MainDashboard weekDays={WEEK_DAYS} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="plans" element={<Plans />} />
          <Route path="trainers" element={<TrainersPage />} />
          <Route path="workout" element={<WorkoutPlans />} />
          <Route path="diet" element={<DietPlan />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Auth Modal (portal-level, above all routes) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
