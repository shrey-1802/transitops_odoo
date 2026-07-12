// src/components/DispatchForm.tsx
import React, { useEffect, useState } from 'react';

import './DispatchForm.css';
import type { Trip } from '../types';
import { mockVehicles } from '../mocks/vehicles';
import { drivers } from '../mocks/drivers';

interface Props {
  onClose: () => void;
  onSubmit: (trip: Trip) => void;
}

export const DispatchForm: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [capacityMsg, setCapacityMsg] = useState<React.ReactNode>(null);
  const [canSubmit, setCanSubmit] = useState(false);



  // Validation effect
  useEffect(() => {
    const weight = Number(cargoWeight);
    const selectedVehicle = mockVehicles.find(v => v.id === vehicleId);
    if (selectedVehicle && cargoWeight) {
      if (weight > selectedVehicle.loadCapacity) {
        const diff = weight - selectedVehicle.loadCapacity;
        setCapacityMsg(
          <div className="warning-msg">
            ⚠️ Cargo weight ({weight} kg) exceeds this vehicle's capacity ({selectedVehicle.loadCapacity} kg) by {diff} kg
          </div>
        );
        setCanSubmit(false);
      } else {
        setCapacityMsg(
          <div className="success-msg">
            ✅ Within capacity
          </div>
        );
        setCanSubmit(true);
      }
    } else {
      setCapacityMsg(null);
      setCanSubmit(false);
    }
  }, [cargoWeight, vehicleId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const newTrip: Trip = {
      id: `t${Date.now()}`,
      origin,
      destination,
      vehicleId,
      driverId,
      cargoWeight: Number(cargoWeight),
      scheduledDate,
      status: 'Draft',
    };
    onSubmit(newTrip);
  };

  return (
    <div className="dispatch-form-overlay" onClick={onClose}>
      <div className="dispatch-form" onClick={e => e.stopPropagation()}>
        <h3>New Dispatch</h3>
        <form onSubmit={handleSubmit}>
          <label>Origin</label>
          <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} required />

          <label>Destination</label>
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required />

          <label>Vehicle</label>
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} required>
            <option value="">Select vehicle</option>
            {mockVehicles.map(v => {
              const disabled = v.status !== 'Active' && v.status !== 'Available';
              return (
                <option key={v.id} value={v.id} disabled={disabled} title={disabled ? `Unavailable — ${v.status}` : undefined}>
                  {v.registrationNumber} ({v.loadCapacity} kg) – {v.status}
                </option>
              );
            })}
          </select>

          <label>Driver</label>
          <select value={driverId} onChange={e => setDriverId(e.target.value)} required>
            <option value="">Select driver</option>
            {drivers.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <label>Cargo Weight (kg)</label>
          <input type="number" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} required min="0" />
          {capacityMsg}

          <label>Scheduled Date</label>
          <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} required />

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn" disabled={!canSubmit}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
