import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Route as RouteIcon, 
  Wrench, 
  Receipt, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  UserCircle
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ROLE_NAV } from '../types';
import type { Role, RouteKey } from '../types';

interface AppShellProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onLogout: () => void;
}

const NAV_ITEMS: { key: RouteKey; label: string; path: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { key: 'vehicles', label: 'Vehicle Registry', path: '/vehicles', icon: Car },
  { key: 'drivers', label: 'Driver Management', path: '/drivers', icon: Users },
  { key: 'trips', label: 'Trip Management & Dispatch', path: '/trips', icon: RouteIcon },
  { key: 'maintenance', label: 'Maintenance', path: '/maintenance', icon: Wrench },
  { key: 'expenses', label: 'Expense Ledger', path: '/expenses', icon: Receipt },
  { key: 'reports', label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
];

export function AppShell({ currentRole, onRoleChange, onLogout }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [location.pathname]);

  const visibleNavItems = NAV_ITEMS.filter(item => 
    ROLE_NAV[currentRole].includes(item.key)
  );

  const currentNavItem = NAV_ITEMS.find(item => item.path === location.pathname);
  const headerTitle = currentNavItem ? currentNavItem.label : 'TransitOps';

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="app-shell">
      {/* Mobile Backdrop */}
      <div 
        className={clsx('drawer-backdrop', isMobileDrawerOpen && 'open')}
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Sidebar */}
      <aside className={clsx('app-sidebar', isSidebarCollapsed && 'collapsed', isMobileDrawerOpen && 'open')}>
        <div className="app-sidebar-header">
          <div className="app-sidebar-logo">TransitOps</div>
          {/* Desktop Collapse Toggle */}
          <button 
            className="icon-btn hidden-mobile" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{ display: window.innerWidth <= 1024 ? 'none' : 'flex' }}
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="app-sidebar-nav">
          {visibleNavItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink 
                key={item.key} 
                to={item.path} 
                className={clsx('nav-item', isActive && 'active')}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="app-sidebar-footer">
          <select 
            className="role-switcher"
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as Role)}
          >
            {Object.keys(ROLE_NAV).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          <div className={clsx('mt-2 text-sm text-secondary', isSidebarCollapsed ? 'hidden' : 'block')}>
            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>Admin User</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-disabled)' }}>{currentRole}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        <header className="app-header">
          <div className="header-left">
            <button 
              className="icon-btn mobile-only" 
              onClick={() => setIsMobileDrawerOpen(true)}
              style={{ display: window.innerWidth > 768 ? 'none' : 'flex' }}
            >
              <Menu size={20} />
            </button>
            <h1 className="header-title">{headerTitle}</h1>
          </div>
          
          <div className="header-right">
            <select className="role-switcher" style={{ width: 'auto', padding: '4px 8px' }}>
              <option>All Regions</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
            
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            
            <ThemeToggle />
            
            <button className="icon-btn" onClick={handleLogout} title="Log Out">
              <UserCircle size={24} />
            </button>
          </div>
        </header>
        
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
