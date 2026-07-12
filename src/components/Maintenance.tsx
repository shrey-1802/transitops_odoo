import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, Clock, Wrench } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import clsx from 'clsx';

const mockMaintenanceRecords = [
  { id: 'MAINT001', vehicle: 'Truck-01', type: 'Service', description: 'Regular Oil Change', center: 'North Service Center', technician: 'Raj Kumar', cost: 1200, status: 'Completed', startDate: '2024-01-10', completionDate: '2024-01-11' },
  { id: 'MAINT002', vehicle: 'Van-02', type: 'Repair', description: 'Brake System Repair', center: 'East Service Center', technician: 'Priya Singh', cost: 3500, status: 'In Progress', startDate: '2024-01-15', expectedDate: '2024-01-18' },
  { id: 'MAINT003', vehicle: 'Truck-03', type: 'Inspection', description: 'Safety Inspection', center: 'South Service Center', technician: 'Mike Johnson', cost: 800, status: 'Scheduled', startDate: '2024-01-20', expectedDate: '2024-01-21' },
  { id: 'MAINT004', vehicle: 'Van-04', type: 'Replacement', description: 'Tire Replacement', center: 'West Service Center', technician: 'Sarah Connor', cost: 2100, status: 'Waiting Parts', startDate: '2024-01-12', expectedDate: '2024-01-19' },
];

const vehicleHealthData = [
  { vehicle: 'Truck-01', health: 92, lastService: '2024-01-11', nextService: '2024-02-11', remaining: 450 },
  { vehicle: 'Van-02', health: 78, lastService: '2024-01-05', nextService: '2024-02-05', remaining: 280 },
  { vehicle: 'Truck-03', health: 88, lastService: '2024-01-08', nextService: '2024-02-08', remaining: 380 },
  { vehicle: 'Van-04', health: 85, lastService: '2024-01-15', nextService: '2024-02-15', remaining: 420 },
];

const monthlyCostTrend = [
  { month: 'Jan', cost: 8500, services: 12, repairs: 8 },
  { month: 'Feb', cost: 9200, services: 14, repairs: 9 },
  { month: 'Mar', cost: 7800, services: 10, repairs: 6 },
  { month: 'Apr', cost: 10500, services: 16, repairs: 11 },
  { month: 'May', cost: 9800, services: 13, repairs: 8 },
];

const expensiveVehicles = [
  { vehicle: 'Truck-03', cost: 18500, count: 4 },
  { vehicle: 'Truck-01', cost: 15200, count: 3 },
  { vehicle: 'Van-04', cost: 12800, count: 3 },
  { vehicle: 'Van-02', cost: 11200, count: 2 },
];

export const Maintenance: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);

  const vehiclesInMaintenance = mockMaintenanceRecords.filter(r => r.status !== 'Completed').length;
  const maintenanceDueSoon = vehicleHealthData.filter(v => v.remaining < 350).length;
  const overdueServices = mockMaintenanceRecords.filter(r => r.status === 'Waiting Parts').length;
  const monthlyMaintenanceCost = 10500;
  const avgHealthScore = (vehicleHealthData.reduce((sum, v) => sum + v.health, 0) / vehicleHealthData.length).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-900 text-green-200';
      case 'In Progress':
        return 'bg-blue-900 text-blue-200';
      case 'Waiting Parts':
        return 'bg-yellow-900 text-yellow-200';
      case 'Scheduled':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-slate-700 text-slate-200';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 85) return 'from-green-600 to-green-700';
    if (score >= 70) return 'from-yellow-600 to-yellow-700';
    return 'from-red-600 to-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Maintenance Management</h1>
            <p className="text-slate-400">Monitor vehicle health, schedule maintenance, and prevent breakdowns</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} /> New Record
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <KPICard label="In Maintenance" value={vehiclesInMaintenance} color="from-blue-600 to-blue-700" icon={Wrench} />
          <KPICard label="Due Soon" value={maintenanceDueSoon} color="from-yellow-600 to-yellow-700" icon={AlertCircle} />
          <KPICard label="Overdue" value={overdueServices} color="from-red-600 to-red-700" icon={AlertCircle} />
          <KPICard label="Monthly Cost" value={`₹${monthlyMaintenanceCost}K`} color="from-purple-600 to-purple-700" icon={Wrench} />
          <KPICard label="Avg Health Score" value={`${avgHealthScore}/100`} color="from-emerald-600 to-emerald-700" icon={CheckCircle} />
        </div>

        {/* Vehicle Health Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Health Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Vehicle Health Status</h3>
            {vehicleHealthData.map((vehicle) => (
              <div key={vehicle.vehicle} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{vehicle.vehicle}</h4>
                  <div className={`text-2xl font-bold ${getHealthColor(vehicle.health)}`}>{vehicle.health}</div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <div
                    className={clsx('h-2 rounded-full bg-gradient-to-r', getHealthBgColor(vehicle.health))}
                    style={{ width: `${vehicle.health}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
                  <div>Last: {vehicle.lastService.slice(5)}</div>
                  <div>Next: {vehicle.nextService.slice(5)}</div>
                  <div>{vehicle.remaining} km</div>
                </div>
              </div>
            ))}
          </div>

          {/* Predictive Maintenance Widget */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Predictive Maintenance</h3>
            <div className="space-y-4">
              {vehicleHealthData.map((vehicle) => (
                <div key={`pred-${vehicle.vehicle}`} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{vehicle.vehicle}</span>
                    <span className={clsx('text-sm font-bold px-2 py-1 rounded', vehicle.remaining < 350 ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200')}>
                      {vehicle.remaining > 350 ? 'Normal' : 'Alert'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Odometer: {vehicle.remaining} km remaining</div>
                    <div>Next due: {vehicle.nextService}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Cost Trend */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Maintenance Cost Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyCostTrend}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Area type="monotone" dataKey="cost" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Most Expensive Vehicles */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Most Expensive Vehicles</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expensiveVehicles} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="vehicle" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="cost" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kanban View */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Maintenance Kanban Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Scheduled', 'In Progress', 'Waiting Parts', 'Completed'].map((status) => (
              <div key={status} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <h4 className="font-semibold text-white mb-3 text-sm">{status}</h4>
                <div className="space-y-2">
                  {mockMaintenanceRecords
                    .filter((r) => r.status === status)
                    .map((record) => (
                      <div key={record.id} className="bg-slate-700 p-3 rounded-lg text-sm hover:bg-slate-600 transition cursor-pointer">
                        <p className="font-semibold text-white">{record.vehicle}</p>
                        <p className="text-slate-300 text-xs mt-1">{record.type}</p>
                        <p className="text-slate-400 text-xs mt-1">₹{record.cost.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Records Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Maintenance History</h3>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
              <option>All</option>
              <option>Scheduled</option>
              <option>In Progress</option>
              <option>Waiting Parts</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Vehicle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Service Center</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Technician</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white">Cost</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {mockMaintenanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-700 transition">
                    <td className="px-6 py-3 text-sm text-slate-300 font-mono">{record.id}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{record.vehicle}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{record.type}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{record.description}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{record.center}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{record.technician}</td>
                    <td className="px-6 py-3 text-sm text-right font-semibold text-emerald-400">₹{record.cost.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={clsx('px-2 py-1 rounded text-xs font-semibold', getStatusColor(record.status))}>{record.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ label: string; value: string | number; color: string; icon: React.ComponentType<{ size: number }> }> = ({ label, value, color, icon: Icon }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-semibold opacity-90">{label}</p>
      <Icon size={18} className="opacity-75" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
