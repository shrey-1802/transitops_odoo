import { useState } from 'react';

import { Eye, EyeOff, Info } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';

import type { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

// Mock user credentials
const MOCK_USERS: { email: string; password: string; role: Role }[] = [
  { email: 'admin@transitops.com',    password: 'Admin@123',    role: 'Fleet Manager' },
  { email: 'dispatch@transitops.com', password: 'Dispatch@123', role: 'Dispatcher' },
  { email: 'driver@transitops.com',   password: 'Driver@123',   role: 'Safety Officer' },
  { email: 'finance@transitops.com',  password: 'Finance@123',  role: 'Financial Analyst' },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setEmailError('');
      return true;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
    return isValid;
  };

  const isFormValid = email && password && !emailError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    if (!isFormValid) return;

    setAuthError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Check credentials
      const user = MOCK_USERS.find(
        u => u.email === email.toLowerCase().trim() && u.password === password
      );

      if (!user) {
        setAuthError('Invalid email or password. Please try again.');
        return;
      }

      onLogin(user.role);
    }, 700);
  };

  return (
    <div className="login-container">
      <ThemeToggle className="theme-toggle-fixed" />
      
      <div className="login-logo">
        TransitOps
      </div>
      
      <div className="login-card">
        <h2 style={{ marginBottom: '8px', fontSize: '1.5rem', fontWeight: 700 }}>Welcome back</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '28px' }}>
          Sign in to your TransitOps account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="form-input-wrapper">
              <input
                type="email"
                id="login-email"
                className={clsx('form-input', emailError && 'error')}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
                onBlur={validateEmail}
                placeholder="name@company.com"
                disabled={loading}
                autoComplete="email"
              />
            </div>
            {emailError && <span className="error-text">{emailError}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                className={clsx('form-input', authError && 'error')}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {authError && <span className="error-text">{authError}</span>}
          </div>
          
          <button 
            type="submit" 
            id="login-submit"
            className="btn-primary"
            disabled={!isFormValid || loading}
          >
            {loading ? <div className="spinner" /> : 'Sign In'}
          </button>
        </form>
        
        {/* Demo credentials hint */}
        <div className="credentials-hint">
          <button
            className="credentials-toggle"
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
          >
            <Info size={14} />
            {showCredentials ? 'Hide' : 'View'} demo credentials
          </button>

          {showCredentials && (
            <div className="credentials-table">
              {MOCK_USERS.map(u => (
                <div key={u.email} className="credentials-row" onClick={() => { setEmail(u.email); setPassword(u.password); setAuthError(''); }}>
                  <div>
                    <div className="cred-role">{u.role}</div>
                    <div className="cred-email">{u.email}</div>
                  </div>
                  <div className="cred-password">{u.password}</div>
                </div>
              ))}
              <p className="cred-hint-text">Click any row to auto-fill</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
