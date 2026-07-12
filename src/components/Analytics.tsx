import React, { useState } from 'react';
import { TrendingUp, Zap, AlertCircle, Trophy } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const executiveKPIs = [
  { label: 'Fleet Utilization', value: '87.5%', change: '+5.2%', color: 'from-blue-600 to-blue-700' },
  { label: 'Total Revenue', value: '₹2.4M', change: '+12.3%', color: 'from-green-600 to-green-700' },
  { label: 'Operational Cost', value: '₹890K', change: '-3.1%', color: 'from-amber-600 to-amber-700' },
  { label: 'Total Profit', value: '₹1.51M', change: '+18.5%', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Avg Fuel Efficiency', value: '8.2 km/l', change: '+2.1%', color: 'from-purple-600 to-purple-700' },
  { label: 'Vehicle ROI', value: '245%', change: '+15.4%', color: 'from-pink-600 to-pink-700' },
];

const fleetUtilizationTrend = [
  { month: 'Jan', utilization: 75, target: 85 },
  { month: 'Feb', utilization: 78, target: 85 },
  { month: 'Mar', utilization: 82, target: 85 },
  { month: 'Apr', utilization: 85, target: 85 },
  { month: 'May', utilization: 87.5, target: 85 },
];

const vehicleStatusData = [
  { name: 'Active', value: 45, color: '#10B981' },
  { name: 'Idle', value: 8, color: '#F59E0B' },
  { name: 'Maintenance', value: 5, color: '#EF4444' },
  { name: 'Retired', value: 2, color: '#6B7280' },
];

const revenueData = [
  { month: 'Jan', revenue: 180000, expenses: 65000 },
  { month: 'Feb', revenue: 195000, expenses: 72000 },
  { month: 'Mar', revenue: 220000, expenses: 78000 },
  { month: 'Apr', revenue: 240000, expenses: 85000 },
  { month: 'May', revenue: 265000, expenses: 89000 },
];

const fuelAnalyticsData = [
  { vehicle: 'Truck-01', efficiency: 8.5, cost: 2400, consumption: 280 },
  { vehicle: 'Van-02', efficiency: 9.2, cost: 1800, consumption: 195 },
  { vehicle: 'Truck-03', efficiency: 7.8, cost: 2800, consumption: 360 },
  { vehicle: 'Van-04', efficiency: 8.9, cost: 2100, consumption: 235 },
];

const maintenanceData = [
  { vehicle: 'Truck-01', cost: 3500, frequency: 4, downtime: 12 },
  { vehicle: 'Truck-03', cost: 4200, frequency: 5, downtime: 18 },
  { vehicle: 'Van-02', cost: 2100, frequency: 2, downtime: 6 },
  { vehicle: 'Van-04', cost: 2800, frequency: 3, downtime: 9 },
];

const insights = [
  { icon: TrendingUp, text: 'Fleet utilization increased by 12%', color: 'text-green-400' },
  { icon: Zap, text: 'Fuel consumption increased by 8%', color: 'text-yellow-400' },
  { icon: AlertCircle, text: 'Truck-11 maintenance cost exceeded threshold', color: 'text-red-400' },
  { icon: Trophy, text: 'Vehicle Van-05 has highest ROI at 286%', color: 'text-blue-400' },
];

export const Analytics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'fleet' | 'driver' | 'financial' | 'fuel' | 'maintenance'>('fleet');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Operational Intelligence & Analytics Center</h1>
          <p className="text-slate-400">Real-time business intelligence for executive decision making</p>
        </div>

        {/* Executive Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {executiveKPIs.map((kpi, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${kpi.color} rounded-xl p-6 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold opacity-90">{kpi.label}</p>
                <span className="text-xs font-bold bg-black bg-opacity-20 px-2 py-1 rounded">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Smart Insights Panel */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">AI-Generated Smart Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div key={idx} className="bg-slate-700 rounded-lg p-4 flex items-start gap-3">
                  <Icon size={20} className={`mt-1 flex-shrink-0 ${insight.color}`} />
                  <p className="text-sm text-slate-200">{insight.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fleet Utilization Trend */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Fleet Utilization Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={fleetUtilizationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Area type="monotone" dataKey="utilization" fill="#3B82F6" stroke="#3B82F6" />
                <Line type="monotone" dataKey="target" stroke="#10B981" strokeDasharray="5 5" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Vehicle Status Distribution */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Vehicle Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={vehicleStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial & Fuel Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Analytics */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Financial Analytics: Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#94a3b8" dataKey="month" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#10B981" />
                <Bar dataKey="expenses" fill="#EF4444" />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Fuel Analytics */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Fuel Efficiency Ranking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fuelAnalyticsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="vehicle" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="efficiency" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Best Vehicle */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={24} />
              <h3 className="text-lg font-semibold">Top Performing Vehicle</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90">Vehicle</span>
                <span className="font-semibold">Truck-03</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">ROI</span>
                <span className="font-semibold">286%</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Revenue</span>
                <span className="font-semibold">₹280,000</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Health Score</span>
                <span className="font-semibold">95/100</span>
              </div>
            </div>
          </div>

          {/* Best Driver */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={24} />
              <h3 className="text-lg font-semibold">Top Performing Driver</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90">Driver</span>
                <span className="font-semibold">Ahmed Hassan</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Trips Completed</span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Safety Score</span>
                <span className="font-semibold">98/100</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Efficiency Rating</span>
                <span className="font-semibold">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Monitoring */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">⚠️ Risk Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-red-500 bg-red-900 bg-opacity-20 p-4 rounded">
              <p className="text-sm font-semibold text-red-200">Expiring Licenses</p>
              <p className="text-2xl font-bold text-red-400 mt-1">3</p>
            </div>
            <div className="border-l-4 border-yellow-500 bg-yellow-900 bg-opacity-20 p-4 rounded">
              <p className="text-sm font-semibold text-yellow-200">Overdue Maintenance</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">5</p>
            </div>
            <div className="border-l-4 border-orange-500 bg-orange-900 bg-opacity-20 p-4 rounded">
              <p className="text-sm font-semibold text-orange-200">High Cost Vehicles</p>
              <p className="text-2xl font-bold text-orange-400 mt-1">2</p>
            </div>
            <div className="border-l-4 border-purple-500 bg-purple-900 bg-opacity-20 p-4 rounded">
              <p className="text-sm font-semibold text-purple-200">Low Performing Vehicles</p>
              <p className="text-2xl font-bold text-purple-400 mt-1">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
