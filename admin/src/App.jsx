import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Overview from './pages/Overview';
import Members from './pages/Members';
import Plans from './pages/Plans';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';
import Transactions from './pages/Transactions';
import CheckIn from './pages/CheckIn';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLogin={() => setIsAuthenticated(true)} />
        } 
      />
      
      <Route 
        path="/" 
        element={
          isAuthenticated ? <AdminLayout onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Overview />} />
        <Route path="members" element={<Members />} />
        <Route path="plans" element={<Plans />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="checkin" element={<CheckIn />} />
      </Route>
    </Routes>
  );
}

export default App;
