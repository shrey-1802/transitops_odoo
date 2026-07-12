import type { Vehicle } from '../types';

export const mockVehicles: Vehicle[] = [
  { id: '1', registrationNumber: 'TX-1001', model: 'Ford Transit 350', type: 'Van', loadCapacity: 1500, odometer: 45200, acquisitionCost: 45000, status: 'Active', region: 'North' },
  { id: '2', registrationNumber: 'TX-1002', model: 'Mercedes Sprinter', type: 'Van', loadCapacity: 1800, odometer: 32100, acquisitionCost: 52000, status: 'Available', region: 'South' },
  { id: '3', registrationNumber: 'TX-1003', model: 'Freightliner M2', type: 'Box Truck', loadCapacity: 8500, odometer: 112000, acquisitionCost: 85000, status: 'In Shop', region: 'East' },
  { id: '4', registrationNumber: 'TX-1004', model: 'Volvo VNL 860', type: 'Semi-Truck', loadCapacity: 22000, odometer: 245000, acquisitionCost: 155000, status: 'Active', region: 'West' },
  { id: '5', registrationNumber: 'TX-1005', model: 'Ford E-Series Cutaway', type: 'Box Truck', loadCapacity: 4500, odometer: 88500, acquisitionCost: 60000, status: 'Active', region: 'North' },
  { id: '6', registrationNumber: 'TX-1006', model: 'Peterbilt 579', type: 'Semi-Truck', loadCapacity: 23000, odometer: 420000, acquisitionCost: 165000, status: 'Retired', region: 'South' },
  { id: '7', registrationNumber: 'TX-1007', model: 'RAM ProMaster 2500', type: 'Van', loadCapacity: 1650, odometer: 12000, acquisitionCost: 48000, status: 'Active', region: 'East' },
  { id: '8', registrationNumber: 'TX-1008', model: 'Kenworth T680', type: 'Semi-Truck', loadCapacity: 21500, odometer: 134000, acquisitionCost: 160000, status: 'Available', region: 'West' },
  { id: '9', registrationNumber: 'TX-1009', model: 'Isuzu NPR-HD', type: 'Box Truck', loadCapacity: 6000, odometer: 67000, acquisitionCost: 72000, status: 'Active', region: 'North' },
  { id: '10', registrationNumber: 'TX-1010', model: 'Chevrolet Express 3500', type: 'Van', loadCapacity: 1400, odometer: 105000, acquisitionCost: 41000, status: 'In Shop', region: 'South' },
  { id: '11', registrationNumber: 'TX-1011', model: 'Mack Anthem', type: 'Semi-Truck', loadCapacity: 22500, odometer: 95000, acquisitionCost: 145000, status: 'Active', region: 'East' },
  { id: '12', registrationNumber: 'TX-1012', model: 'Hino 268', type: 'Box Truck', loadCapacity: 10000, odometer: 54000, acquisitionCost: 88000, status: 'Available', region: 'West' },
  { id: '13', registrationNumber: 'TX-1013', model: 'Ford Transit 250', type: 'Van', loadCapacity: 1300, odometer: 8900, acquisitionCost: 43000, status: 'Active', region: 'North' },
  { id: '14', registrationNumber: 'TX-1014', model: 'Freightliner Cascadia', type: 'Semi-Truck', loadCapacity: 24000, odometer: 310000, acquisitionCost: 158000, status: 'Active', region: 'South' },
  { id: '15', registrationNumber: 'TX-1015', model: 'International MV607', type: 'Box Truck', loadCapacity: 9500, odometer: 18000, acquisitionCost: 92000, status: 'In Shop', region: 'East' },
  { id: '16', registrationNumber: 'TX-1016', model: 'Nissan NV2500 HD', type: 'Van', loadCapacity: 1450, odometer: 132000, acquisitionCost: 39000, status: 'Retired', region: 'West' },
  { id: '17', registrationNumber: 'TX-1017', model: 'Volvo VNR 300', type: 'Semi-Truck', loadCapacity: 21000, odometer: 42000, acquisitionCost: 142000, status: 'Available', region: 'North' },
  { id: '18', registrationNumber: 'TX-1018', model: 'GMC Savana 3500', type: 'Van', loadCapacity: 1550, odometer: 75000, acquisitionCost: 44000, status: 'Active', region: 'South' },
];
