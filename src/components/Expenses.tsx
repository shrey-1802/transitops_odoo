import React, { useState } from 'react';
import { Plus, Download, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

const mockExpenses = [
  { id: 'EXP001', date: '2024-01-15', expenseId: 'EXP001', vehicle: 'Truck-01', trip: 'TRIP-001', type: 'Fuel', description: 'Diesel Refill', amount: 2500, createdBy: 'John Doe', status: 'Approved' },
  { id: 'EXP002', date: '2024-01-16', expenseId: 'EXP002', vehicle: 'Van-02', trip: 'TRIP-002', type: 'Toll', description: 'Highway Toll', amount: 450, createdBy: 'Jane Smith', status: 'Approved' },
  { id: 'EXP003', date: '2024-01-17', expenseId: 'EXP003', vehicle: 'Truck-03', trip: 'TRIP-003', type: 'Maintenance', description: 'Oil Change', amount: 1200, createdBy: 'Mike Johnson', status: 'Submitted' },
  { id: 'EXP004', date: '2024-01-18', expenseId: 'EXP004', vehicle: 'Van-04', trip: 'TRIP-004', type: 'Repair', description: 'Brake Pad Replacement', amount: 3500, createdBy: 'Sarah Connor', status: 'Approved' },
];

const monthlyTrendData = [
  { month: 'Jan', fuel: 15000, maintenance: 8000, toll: 3500, insurance: 5000, other: 2000 },
  { month: 'Feb', fuel: 16200, maintenance: 7500, toll: 3800, insurance: 5000, other: 2300 },
  { month: 'Mar', fuel: 17500, maintenance: 9200, toll: 4100, insurance: 5000, other: 2100 },
  { month: 'Apr', fuel: 16800, maintenance: 8800, toll: 3900, insurance: 5000, other: 2400 },
  { month: 'May', fuel: 18200, maintenance: 10500, toll: 4300, insurance: 5000, other: 2600 },
];

const categoryData = [
  { name: 'Fuel', value: 45000, color: '#3B82F6' },
  { name: 'Maintenance', value: 35000, color: '#10B981' },
  { name: 'Toll', value: 8500, color: '#F59E0B' },
  { name: 'Insurance', value: 12000, color: '#8B5CF6' },
  { name: 'Other', value: 6500, color: '#EF4444' },
];

const vehicleCostData = [
  { vehicle: 'Truck-01', revenue: 150000, expenses: 45000, profit: 105000, roi: 233 },
  { vehicle: 'Van-02', revenue: 120000, expenses: 38000, profit: 82000, roi: 216 },
  { vehicle: 'Truck-03', revenue: 180000, expenses: 52000, profit: 128000, roi: 246 },
  { vehicle: 'Van-04', revenue: 100000, expenses: 35000, profit: 65000, roi: 186 },
];

export const Expenses: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');

  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const fuelExpenses = mockExpenses.filter(e => e.type === 'Fuel').reduce((sum, e) => sum + e.amount, 0);
  const maintenanceExpenses = mockExpenses.filter(e => e.type === 'Maintenance').reduce((sum, e) => sum + e.amount, 0);
  const tollExpenses = mockExpenses.filter(e => e.type === 'Toll').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Financial Operations & Expense Ledger</h1>
            <p className="text-slate-400">Track, audit, and analyze every operational expense</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} /> Add Expense
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <KPICard label="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} color="from-blue-600 to-blue-700" />
          <KPICard label="Fuel" value={`₹${fuelExpenses.toLocaleString()}`} color="from-green-600 to-green-700" />
          <KPICard label="Maintenance" value={`₹${maintenanceExpenses.toLocaleString()}`} color="from-amber-600 to-amber-700" />
          <KPICard label="Toll" value={`₹${tollExpenses.toLocaleString()}`} color="from-purple-600 to-purple-700" />
          <KPICard label="Monthly Profit" value="₹380,000" color="from-emerald-600 to-emerald-700" />
          <KPICard label="Expense Growth" value="+8.5%" color="from-red-600 to-red-700" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spending Trend */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="fuel" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="maintenance" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="toll" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Expense Breakdown by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Cost Analysis */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Vehicle Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis stroke="#94a3b8" dataKey="vehicle" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#10B981" />
              <Bar dataKey="expenses" fill="#EF4444" />
              <Bar dataKey="profit" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Ledger Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Expense Ledger</h3>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
                <option>All</option>
                <option>Fuel</option>
                <option>Maintenance</option>
                <option>Toll</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Expense ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Vehicle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Trip</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Description</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Created By</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {mockExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-700 transition">
                    <td className="px-6 py-3 text-sm text-slate-300">{expense.date}</td>
                    <td className="px-6 py-3 text-sm text-slate-300 font-mono">{expense.expenseId}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{expense.vehicle}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{expense.trip}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900 text-blue-200">{expense.type}</span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-300">{expense.description}</td>
                    <td className="px-6 py-3 text-sm text-right font-semibold text-emerald-400">₹{expense.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{expense.createdBy}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={clsx('px-2 py-1 rounded text-xs font-semibold', expense.status === 'Approved' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200')}>
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 mt-6 justify-end">
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition">
            <Download size={18} /> PDF Export
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition">
            <Download size={18} /> CSV Export
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition">
            <Download size={18} /> Excel Export
          </button>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`}>
    <p className="text-xs font-semibold opacity-90">{label}</p>
    <p className="text-xl font-bold mt-1">{value}</p>
  </div>
);
