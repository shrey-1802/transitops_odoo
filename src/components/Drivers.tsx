// src/components/Drivers.tsx
import React, { useMemo, useState } from 'react';
import { Table } from './ui/Table';
import { Badge } from './ui/Badge';
import { SafetyScoreBar } from './ui/SafetyScoreBar';
import { drivers } from '../mocks/drivers';
import './Drivers.css';

// Fixed today for expiry calculations
const TODAY = new Date('2026-07-01');

export const Drivers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');


  const filtered = useMemo(() => {
    return drivers.filter(d => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const sorted = filtered;



  const columns = [
    {
      header: 'Name',
      accessor: 'name' as const,
      render: (value: string, row: any) => (
        <div className="driver-name-cell">
          <div className="avatar">{value.charAt(0)}</div>
          <span>{value}</span>
          {isExpiringSoon(row.licenseExpiryDate) && (
            <Badge variant="beige-amber">
              Expires in {daysUntil(row.licenseExpiryDate)} days
            </Badge>
          )}
        </div>
      ),
    },
    { header: 'License #', accessor: 'licenseNumber' as const },
    { header: 'Category', accessor: 'category' as const },
    {
      header: 'Expiry Date',
      accessor: 'licenseExpiryDate' as const,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    { header: 'Contact', accessor: 'contactNumber' as const },
    {
      header: 'Safety Score',
      accessor: 'safetyScore' as const,
      render: (value: number) => <SafetyScoreBar score={value} />,
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (value: string) => {
        const variantMap: Record<string, string> = {
          'On Duty': 'olive',
          'Off Duty': 'beige',
          'Suspended': 'olive-brown',
          'Expired': 'beige-amber',
        };
        return <Badge variant={variantMap[value] as any}>{value}</Badge>;
      },
    },
  ];

  function isExpiringSoon(dateStr: string) {
    const expiry = new Date(dateStr);
    const diff = (expiry.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  }
  function daysUntil(dateStr: string) {
    const expiry = new Date(dateStr);
    return Math.round((expiry.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="drivers-page">
      <h2 className="page-title">Driver Management</h2>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search name or license…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="status-filter">
          <option value="All">All Statuses</option>
          <option value="On Duty">On Duty</option>
          <option value="Off Duty">Off Duty</option>
          <option value="Suspended">Suspended</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      {sorted.length ? (
        <Table
          columns={columns}
          data={sorted}
        />
      ) : (
        <div className="empty-state">No drivers match the current filters.</div>
      )}
    </div>
  );
};
