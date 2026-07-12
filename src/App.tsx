import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Login } from './components/Login';
import { Unauthorized } from './components/Unauthorized';
import { Dashboard, Vehicles, Drivers, Trips, Maintenance, Expenses, Reports } from './components/Placeholders';
import type { Role } from './types';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState<Role>('Admin');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route element={<AppShell currentRole={userRole} onRoleChange={setUserRole} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
