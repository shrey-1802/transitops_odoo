export type Role = 'Admin' | 'Fleet Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

export type RouteKey = 'dashboard' | 'vehicles' | 'drivers' | 'trips' | 'maintenance' | 'expenses' | 'reports' | 'analytics';

export const ROLE_NAV: Record<Role, RouteKey[]> = {
  'Admin': ['dashboard','vehicles','drivers','trips','maintenance','expenses','reports','analytics'],
  'Fleet Manager': ['dashboard','vehicles','maintenance','reports','analytics'],
  'Dispatcher':        ['dashboard', 'vehicles', 'drivers', 'trips'],
  'Safety Officer':    ['dashboard', 'drivers'],
  'Financial Analyst': ['dashboard', 'expenses', 'reports', 'analytics'],
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

// --- Expense Types ---
export type ExpenseType = 'Fuel' | 'Toll' | 'Maintenance' | 'Insurance' | 'Repair' | 'Driver Allowance' | 'Miscellaneous';
export type ExpenseStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export interface Expense {
  id: string;
  date: string;
  vehicleId: string;
  tripId?: string;
  type: ExpenseType;
  description: string;
  amount: number;
  createdBy: string;
  status: ExpenseStatus;
  receiptUrl?: string;
  modifiedBy?: string;
  modifiedDate?: string;
}

// --- Maintenance Types ---
export type MaintenanceType = 'Service' | 'Repair' | 'Inspection' | 'Replacement' | 'Emergency';
export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Waiting Parts' | 'Completed';

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  description: string;
  serviceCenter: string;
  technician: string;
  cost: number;
  startDate: string;
  expectedCompletionDate: string;
  completionDate?: string;
  status: MaintenanceStatus;
}

export interface VehicleHealth {
  vehicleId: string;
  healthScore: number; // 0-100
  lastServiceDate: string;
  nextServiceDue: string;
  remainingDistance: number;
  odometer: number;
  status: 'Healthy' | 'Warning' | 'Critical';
}
