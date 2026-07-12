// src/components/Trips.tsx
import React, { useMemo, useState } from 'react';
import { Table } from './ui/Table';
import { Badge } from './ui/Badge';
import { mockTrips } from '../mocks/trips';
import type { Trip } from '../mocks/trips';
import { mockVehicles } from '../mocks/vehicles';
import { drivers } from '../mocks/drivers';
import { DispatchForm } from './DispatchForm';
import { Toast } from './ui/Toast';
import './Trips.css';

export const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [showForm, setShowForm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const vehicleMap = useMemo(() => {
    const map = new Map();
    mockVehicles.forEach(v => map.set(v.id, v));
    return map;
  }, []);
  const driverMap = useMemo(() => {
    const map = new Map();
    drivers.forEach(d => map.set(d.id, d));
    return map;
  }, []);

  const columns = [
    {
      header: 'Trip',
      accessor: 'id' as const,
      render: (row: Trip) => `${row.origin} → ${row.destination}`,
    },
    {
      header: 'Vehicle',
      accessor: 'vehicleId' as const,
      render: (value: string) => vehicleMap.get(value)?.registrationNumber ?? '—',
    },
    {
      header: 'Driver',
      accessor: 'driverId' as const,
      render: (value: string) => driverMap.get(value)?.name ?? '—',
    },
    { header: 'Cargo (kg)', accessor: 'cargoWeight' as const },
    {
      header: 'Scheduled',
      accessor: 'scheduledDate' as const,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (value: string) => {
        const variantMap: Record<string, string> = {
          Draft: 'outline-beige',
          Dispatched: 'outline-olive',
          Completed: 'olive',
          Cancelled: 'olive-brown',
        };
        return <Badge variant={variantMap[value] as any}>{value}</Badge>;
      },
    },
  ];

  const handleAddTrip = (newTrip: Trip) => {
    setTrips(prev => [newTrip, ...prev]);
    setToastMessage('Trip created successfully');
    setShowForm(false);
  };

  return (
    <div className="trips-page">
      <h2 className="page-title">Trip Management & Dispatch</h2>
      <button className="new-dispatch-btn" onClick={() => setShowForm(true)}>
        + New Dispatch
      </button>
      <Table
        columns={columns.map(col => ({ ...col, sortable: true }))}
        data={trips}
      />
      {showForm && (
        <DispatchForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTrip}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
