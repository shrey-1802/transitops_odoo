import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';

import type { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      let role: Role = 'Admin'; // Default fallback
      if (email === 'dispatch@transitops.com') role = 'Dispatcher';
      if (email === 'driver@transitops.com') role = 'Driver';
      if (email === 'admin@transitops.com') role = 'Admin';
      onLogin(role);
    }, 600);
  };

  return (
    <div className="login-container">
      <ThemeToggle className="theme-toggle-fixed" />
      
      <div className="login-logo">
        TransitOps
      </div>
      
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="form-input-wrapper">
              <input
                type="email"
                className={clsx('form-input', emailError && 'error')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="name@company.com"
                disabled={loading}
              />
            </div>
            {emailError && <span className="error-text">{emailError}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
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
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!isFormValid || loading}
          >
            {loading ? <div className="spinner" /> : 'Sign In'}
          </button>
        </form>
        
        <div className="login-links">
          <a href="#" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
