export type Role = 'Fleet Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

export type RouteKey = 'dashboard' | 'vehicles' | 'drivers' | 'trips' | 'maintenance' | 'expenses' | 'reports';

export const ROLE_NAV: Record<Role, RouteKey[]> = {
  'Fleet Manager':     ['dashboard', 'vehicles', 'maintenance', 'reports'],
  'Dispatcher':        ['dashboard', 'vehicles', 'drivers', 'trips'],
  'Safety Officer':    ['dashboard', 'drivers'],
  'Financial Analyst': ['dashboard', 'expenses', 'reports'],
};

export const ROLE_RESTRICTIONS: Record<Role, string[]> = {
  'Fleet Manager':     ['Manage Finance', 'Create Expenses'],
  'Dispatcher':        ['Delete Vehicles', 'Access Reports'],
  'Safety Officer':    ['Create Expenses', 'Manage Vehicles', 'Dispatch Trips'],
  'Financial Analyst': ['Dispatch Trips', 'Manage Vehicles', 'Manage Drivers'],
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
