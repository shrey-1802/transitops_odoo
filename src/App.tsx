import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Login } from './components/Login';
import { Unauthorized } from './components/Unauthorized';
import { Dashboard } from './components/Dashboard';
import { Vehicles } from './components/Vehicles';
import { Drivers, Trips, Maintenance, Expenses, Reports } from './components/Placeholders';
import type { Role, RouteKey } from './types';
import { ROLE_NAV } from './types';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (role: Role) => {
    setUserRole(role);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate('/login');
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children, routeKey }: { children: React.ReactNode, routeKey: RouteKey }) => {
    if (!userRole) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if (!ROLE_NAV[userRole].includes(routeKey)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route element={
        userRole ? (
          <AppShell currentRole={userRole} onRoleChange={setUserRole} onLogout={handleLogout} />
        ) : (
          <Navigate to="/login" replace />
        )
      }>
        <Route path="/dashboard" element={<ProtectedRoute routeKey="dashboard"><Dashboard /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute routeKey="vehicles"><Vehicles /></ProtectedRoute>} />
        <Route path="/drivers" element={<ProtectedRoute routeKey="drivers"><Drivers /></ProtectedRoute>} />
        <Route path="/trips" element={<ProtectedRoute routeKey="trips"><Trips /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute routeKey="maintenance"><Maintenance /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute routeKey="expenses"><Expenses /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute routeKey="reports"><Reports /></ProtectedRoute>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
