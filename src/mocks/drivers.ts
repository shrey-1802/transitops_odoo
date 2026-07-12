export type DriverStatus = 'On Duty' | 'Off Duty' | 'Suspended' | 'Expired';

export interface Driver {
  id: string;
  name: string;
  avatarUrl?: string; // optional, using initials if missing
  licenseNumber: string;
  category: string;
  licenseExpiryDate: string; // ISO date string
  contactNumber: string;
  safetyScore: number; // 0-100
  status: DriverStatus;
}

export const drivers: Driver[] = [
  {
    id: 'd1',
    name: 'Aditi Sharma',
    licenseNumber: 'DL-00123',
    category: 'Class A',
    licenseExpiryDate: '2026-07-15',
    contactNumber: '+91 98765 43210',
    safetyScore: 92,
    status: 'On Duty',
  },
  {
    id: 'd2',
    name: 'Rohan Patel',
    licenseNumber: 'DL-00456',
    category: 'Class B',
    licenseExpiryDate: '2026-09-30',
    contactNumber: '+91 91234 56789',
    safetyScore: 78,
    status: 'Off Duty',
  },
  {
    id: 'd3',
    name: 'Meera Joshi',
    licenseNumber: 'DL-00789',
    category: 'Class C',
    licenseExpiryDate: '2026-07-05',
    contactNumber: '+91 99887 66554',
    safetyScore: 65,
    status: 'Suspended',
  },
  {
    id: 'd4',
    name: 'Vikram Singh',
    licenseNumber: 'DL-01011',
    category: 'Class A',
    licenseExpiryDate: '2027-01-20',
    contactNumber: '+91 92345 67890',
    safetyScore: 88,
    status: 'On Duty',
  },
  {
    id: 'd5',
    name: 'Sneha Rao',
    licenseNumber: 'DL-01314',
    category: 'Class B',
    licenseExpiryDate: '2026-07-25',
    contactNumber: '+91 93456 78901',
    safetyScore: 55,
    status: 'Expired',
  },
  {
    id: 'd6',
    name: 'Karan Mehta',
    licenseNumber: 'DL-01617',
    category: 'Class C',
    licenseExpiryDate: '2026-12-12',
    contactNumber: '+91 94567 89012',
    safetyScore: 71,
    status: 'On Duty',
  },
  {
    id: 'd7',
    name: 'Rita Kapoor',
    licenseNumber: 'DL-01920',
    category: 'Class A',
    licenseExpiryDate: '2026-08-30',
    contactNumber: '+91 95678 90123',
    safetyScore: 84,
    status: 'Off Duty',
  },
  {
    id: 'd8',
    name: 'Arjun Verma',
    licenseNumber: 'DL-02223',
    category: 'Class B',
    licenseExpiryDate: '2026-07-10',
    contactNumber: '+91 96789 01234',
    safetyScore: 48,
    status: 'Suspended',
  },
  {
    id: 'd9',
    name: 'Nisha Gupta',
    licenseNumber: 'DL-02526',
    category: 'Class C',
    licenseExpiryDate: '2026-09-05',
    contactNumber: '+91 97890 12345',
    safetyScore: 95,
    status: 'On Duty',
  },
  {
    id: 'd10',
    name: 'Sanjay Kumar',
    licenseNumber: 'DL-02829',
    category: 'Class A',
    licenseExpiryDate: '2026-07-20',
    contactNumber: '+91 98901 23456',
    safetyScore: 62,
    status: 'Expired',
  },
  // add a few more to reach 12-15
  {
    id: 'd11',
    name: 'Priya Nair',
    licenseNumber: 'DL-03132',
    category: 'Class B',
    licenseExpiryDate: '2027-03-15',
    contactNumber: '+91 90012 34567',
    safetyScore: 80,
    status: 'On Duty',
  },
  {
    id: 'd12',
    name: 'Amitabh Sinha',
    licenseNumber: 'DL-03435',
    category: 'Class C',
    licenseExpiryDate: '2026-07-28',
    contactNumber: '+91 91123 45678',
    safetyScore: 58,
    status: 'Off Duty',
  },
];
