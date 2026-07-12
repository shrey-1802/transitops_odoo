import { useState, useMemo, useEffect } from 'react';
import { Search, MoreVertical, Filter, ArrowUpDown, Plus, X, UploadCloud, FileText, Car } from 'lucide-react';
import type { Vehicle } from '../types';
import { mockVehicles } from '../mocks/vehicles';
import clsx from 'clsx';
import './Vehicles.css';

interface SlideOutProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSave: (v: Vehicle) => void;
}

function VehicleSlideOut({ isOpen, onClose, vehicle, onSave }: SlideOutProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'documents'>('details');
  const [formData, setFormData] = useState<Partial<Vehicle>>(vehicle || {});
  const [isDragging, setIsDragging] = useState(false);

  // Sync form data when vehicle prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData(vehicle || {
        registrationNumber: '', model: '', type: 'Van', 
        loadCapacity: 0, odometer: 0, acquisitionCost: 0, 
        status: 'Available', region: 'North'
      });
      setActiveTab('details');
    }
  }, [isOpen, vehicle]);

  if (!isOpen) return null;

  const isEditing = !!vehicle;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Vehicle);
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  return (
    <>
      <div className="slideout-backdrop" onClick={onClose} />
      <div className="slideout-panel">
        
        <div className="slideout-header">
          <h2>{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="slideout-tabs">
          <button className={clsx('tab-btn', activeTab === 'details' && 'active')} onClick={() => setActiveTab('details')}>Details</button>
          <button className={clsx('tab-btn', activeTab === 'documents' && 'active')} onClick={() => setActiveTab('documents')}>Documents</button>
        </div>

        <div className="slideout-content">
          {activeTab === 'details' ? (
            <form id="vehicle-form" onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Registration Number</label>
                <input required className="form-input" value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value})} />
              </div>
              
              <div className="form-group">
                <label className="form-label">Model</label>
                <input required className="form-input" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Van">Van</option>
                    <option value="Box Truck">Box Truck</option>
                    <option value="Semi-Truck">Semi-Truck</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Region</label>
                  <select className="form-input" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as any})}>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Load Capacity (kg)</label>
                  <input required type="number" className="form-input" value={formData.loadCapacity || ''} onChange={e => setFormData({...formData, loadCapacity: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Odometer</label>
                  <input required type="number" className="form-input" value={formData.odometer || ''} onChange={e => setFormData({...formData, odometer: Number(e.target.value)})} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Acquisition Cost ($)</label>
                  <input required type="number" className="form-input" value={formData.acquisitionCost || ''} onChange={e => setFormData({...formData, acquisitionCost: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                    <option value="Active">Active</option>
                    <option value="Available">Available</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>
              </div>
            </form>
          ) : (
            <div className="documents-tab">
              <div 
                className={clsx('drop-zone', isDragging && 'dragging')}
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
              >
                <UploadCloud size={32} className="drop-icon" />
                <p>Drag and drop documents here, or click to browse</p>
                <span className="drop-hint">Supports PDF, JPG, PNG up to 10MB</span>
              </div>
              
              <div className="doc-list">
                <h4 style={{fontSize: '0.875rem', marginBottom: '12px'}}>Attached Documents</h4>
                <div className="doc-item">
                  <FileText size={16} />
                  <span className="doc-name">Registration_Certificate.pdf</span>
                </div>
                <div className="doc-item">
                  <FileText size={16} />
                  <span className="doc-name">Insurance_Policy_2024.pdf</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="slideout-footer">
          <button className="btn-outline" type="button" onClick={onClose}>Cancel</button>
          <button className="btn-primary" type="submit" form="vehicle-form">
            {isEditing ? 'Save Changes' : 'Add Vehicle'}
          </button>
        </div>

      </div>
    </>
  );
}

export function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  
  const [sortConfig, setSortConfig] = useState<{key: keyof Vehicle, direction: 'asc' | 'desc'} | null>(null);

  // Slide-out state
  const [isSlideOutOpen, setIsSlideOutOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = vehicles.filter(v => {
      const matchSearch = v.registrationNumber.toLowerCase().includes(search.toLowerCase()) || 
                          v.model.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter.length === 0 || statusFilter.includes(v.status);
      const matchType = typeFilter.length === 0 || typeFilter.includes(v.type);
      return matchSearch && matchStatus && matchType;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [vehicles, search, statusFilter, typeFilter, sortConfig]);

  const requestSort = (key: keyof Vehicle) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleFilter = (setter: any, list: string[], value: string) => {
    if (list.includes(value)) setter(list.filter((v: string) => v !== value));
    else setter([...list, value]);
  };

  const renderBadge = (status: string) => {
    let className = 'badge ';
    if (status === 'Active') className += 'badge-active';
    else if (status === 'Available') className += 'badge-available';
    else if (status === 'In Shop') className += 'badge-warning';
    else className += 'badge-muted';
    return <span className={className}>{status}</span>;
  };

  const openAdd = () => {
    setEditingVehicle(null);
    setIsSlideOutOpen(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setIsSlideOutOpen(true);
  };

  const handleSave = (v: Vehicle) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(item => item.id === v.id ? v : item));
    } else {
      setVehicles([{...v, id: Math.random().toString()}, ...vehicles]);
    }
    setIsSlideOutOpen(false);
  };

  return (
    <div className="vehicles-container">
      
      <div className="vehicles-header">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search Registration or Model..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <span className="filter-label"><Filter size={14}/> Status:</span>
          {['Active', 'Available', 'In Shop', 'Retired'].map(s => (
            <label key={s} className="filter-checkbox">
              <input type="checkbox" checked={statusFilter.includes(s)} onChange={() => toggleFilter(setStatusFilter, statusFilter, s)} /> {s}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">Type:</span>
          {['Van', 'Box Truck', 'Semi-Truck'].map(t => (
            <label key={t} className="filter-checkbox">
              <input type="checkbox" checked={typeFilter.includes(t)} onChange={() => toggleFilter(setTypeFilter, typeFilter, t)} /> {t}
            </label>
          ))}
        </div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('registrationNumber')}>Reg. Number <ArrowUpDown size={14} /></th>
                <th onClick={() => requestSort('model')}>Model <ArrowUpDown size={14} /></th>
                <th onClick={() => requestSort('type')}>Type <ArrowUpDown size={14} /></th>
                <th onClick={() => requestSort('loadCapacity')}>Load Cap. <ArrowUpDown size={14} /></th>
                <th onClick={() => requestSort('odometer')}>Odometer <ArrowUpDown size={14} /></th>
                <th onClick={() => requestSort('status')}>Status <ArrowUpDown size={14} /></th>
                <th className="action-cell"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? filteredAndSorted.map(v => (
                <tr key={v.id}>
                  <td className="fw-500">{v.registrationNumber}</td>
                  <td>{v.model}</td>
                  <td>{v.type}</td>
                  <td>{v.loadCapacity.toLocaleString()} kg</td>
                  <td>{v.odometer.toLocaleString()}</td>
                  <td>{renderBadge(v.status)}</td>
                  <td className="action-cell">
                    <div className="dropdown-trigger" onClick={() => openEdit(v)}>
                      <MoreVertical size={18} className="text-secondary" />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <Car size={32} />
                      <p>No vehicles match your search or filters</p>
                      <button className="btn-outline" onClick={() => { setSearch(''); setStatusFilter([]); setTypeFilter([]); }}>Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <VehicleSlideOut 
        isOpen={isSlideOutOpen} 
        onClose={() => setIsSlideOutOpen(false)} 
        vehicle={editingVehicle}
        onSave={handleSave}
      />

    </div>
  );
}
