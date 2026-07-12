import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <ShieldAlert className="security-icon" />
      <h1>Access Restricted</h1>
      <p>
        Your current role does not have permission to view this page. Please contact your administrator if you believe this is an error.
      </p>
      <button 
        className="btn-outline" 
        onClick={() => navigate('/dashboard')}
      >
        Return to Dashboard
      </button>
    </div>
  );
}
