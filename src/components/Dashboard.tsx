import { useState, useMemo } from 'react';
import { 
  Car, CheckCircle, Wrench, Route, Clock, Users, Activity 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { mockVehicles } from '../mocks/vehicles';
import './Dashboard.css';

const roiData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const fuelData = [
  { name: 'Mon', usage: 120 },
  { name: 'Tue', usage: 132 },
  { name: 'Wed', usage: 101 },
  { name: 'Thu', usage: 134 },
  { name: 'Fri', usage: 190 },
  { name: 'Sat', usage: 230 },
  { name: 'Sun', usage: 210 },
];

export function Dashboard() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Filter vehicles based on toolbar
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(v => {
      const matchRegion = regionFilter === 'All' || v.region === regionFilter;
      const matchStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchType = typeFilter === 'All' || v.type === typeFilter;
      return matchRegion && matchStatus && matchType;
    });
  }, [regionFilter, statusFilter, typeFilter]);

  // Derived metrics from filtered data
  const totalVehicles = filteredVehicles.length;
  const activeVehicles = filteredVehicles.filter(v => v.status === 'Active').length;
  const availableVehicles = filteredVehicles.filter(v => v.status === 'Available').length;
  const maintenanceVehicles = filteredVehicles.filter(v => v.status === 'In Shop').length;
  
  // Utilization calculation (Active / (Active + Available))
  const utilizableVehicles = activeVehicles + availableVehicles;
  const utilizationPct = utilizableVehicles > 0 ? Math.round((activeVehicles / utilizableVehicles) * 100) : 0;

  // Mock static stats that could scale with filter size for demo purposes
  const scaleFactor = totalVehicles > 0 ? totalVehicles / mockVehicles.length : 0;
  const onDutyDrivers = Math.round(42 * scaleFactor);
  const activeTrips = Math.round(18 * scaleFactor);
  const avgResponseTime = Math.round(14 * (2 - scaleFactor)); // inverse scaling for fun

  return (
    <div className="dashboard-container">
      
      {/* Interactive Toolbar */}
      <div className="dashboard-toolbar">
        <h2 className="dashboard-title">Overview</h2>
        <div className="toolbar-filters">
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="filter-select">
            <option value="All">All Regions</option>
            <option value="North">North Region</option>
            <option value="South">South Region</option>
            <option value="East">East Region</option>
            <option value="West">West Region</option>
          </select>

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="filter-select">
            <option value="All">All Types</option>
            <option value="Van">Van</option>
            <option value="Box Truck">Box Truck</option>
            <option value="Semi-Truck">Semi-Truck</option>
          </select>

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="filter-select">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Available">Available</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
      </div>

      {/* KPI Grid (7 Cards) */}
      <div className="kpi-grid">
        
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper active"><Car size={20} /></div>
            <span className="kpi-label">Active Vehicles</span>
          </div>
          <div className="kpi-value">{activeVehicles}</div>
          <div className="kpi-trend positive">+3 this week</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper available"><CheckCircle size={20} /></div>
            <span className="kpi-label">Available Vehicles</span>
          </div>
          <div className="kpi-value">{availableVehicles}</div>
          <div className="kpi-trend neutral">Ready for dispatch</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper warning"><Wrench size={20} /></div>
            <span className="kpi-label">In Maintenance</span>
          </div>
          <div className="kpi-value">{maintenanceVehicles}</div>
          <div className="kpi-trend warning">-1 since yesterday</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper secondary"><Route size={20} /></div>
            <span className="kpi-label">Active Trips</span>
          </div>
          <div className="kpi-value">{activeTrips}</div>
          <div className="kpi-trend positive">+12% vs last month</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper secondary"><Users size={20} /></div>
            <span className="kpi-label">Drivers On Duty</span>
          </div>
          <div className="kpi-value">{onDutyDrivers}</div>
          <div className="kpi-trend neutral">92% shift coverage</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper active"><Clock size={20} /></div>
            <span className="kpi-label">Avg Response Time</span>
          </div>
          <div className="kpi-value">{avgResponseTime}m</div>
          <div className="kpi-trend positive">-2m improvement</div>
        </div>

        <div className="kpi-card kpi-card-featured">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper"><Activity size={20} /></div>
            <span className="kpi-label" style={{color: 'white'}}>Fleet Utilization</span>
          </div>
          <div className="kpi-value" style={{color: 'white'}}>{utilizationPct}%</div>
          <div className="utilization-bar-bg">
            <div className="utilization-bar-fill" style={{ width: `${utilizationPct}%` }}></div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        
        <div className="chart-card">
          <h3 className="chart-title">Vehicle ROI Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent-color)' }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--accent-color)" strokeWidth={3} dot={{r: 4, fill: 'var(--bg-surface)', strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Weekly Fuel Logs</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  cursor={{fill: 'var(--bg-surface-hover)'}}
                />
                <Bar dataKey="usage" fill="var(--accent-light)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
