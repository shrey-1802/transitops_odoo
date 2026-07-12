export type Role = 'Admin' | 'Dispatcher' | 'Driver';

export type RouteKey = 'dashboard' | 'vehicles' | 'drivers' | 'trips' | 'maintenance' | 'expenses' | 'reports';

export const ROLE_NAV: Record<Role, RouteKey[]> = {
  Admin: ['dashboard', 'vehicles', 'drivers', 'trips', 'maintenance', 'expenses', 'reports'],
  Dispatcher: ['dashboard', 'vehicles', 'drivers', 'trips'],
  Driver: ['dashboard', 'trips', 'maintenance']
};

export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  type: string;
  loadCapacity: number;
  odometer: number;
  acquisitionCost: number;
  status: 'Active' | 'Available' | 'In Shop' | 'Retired';
  region: 'North' | 'South' | 'East' | 'West';
}
