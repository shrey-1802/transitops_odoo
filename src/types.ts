export type Role = 'Admin' | 'Fleet Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

export type RouteKey = 'dashboard' | 'vehicles' | 'drivers' | 'trips' | 'maintenance' | 'expenses' | 'reports';

export const ROLE_NAV: Record<Role, RouteKey[]> = {
  'Admin': ['dashboard','vehicles','drivers','trips','maintenance','expenses','reports'],
  'Fleet Manager': ['dashboard','vehicles','maintenance','reports'],
  'Dispatcher':        ['dashboard', 'vehicles', 'drivers', 'trips'],
  'Safety Officer':    ['dashboard', 'drivers'],
  'Financial Analyst': ['dashboard', 'expenses', 'reports'],
};

export const ROLE_RESTRICTIONS: Record<Role, string[]> = {
  'Admin': [],
  'Fleet Manager': [],
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

// --- New Trip types ---
export type TripStatus = 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number; // kg
  scheduledDate: string; // ISO date
  status: TripStatus;
}

