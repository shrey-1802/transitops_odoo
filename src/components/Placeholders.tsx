

// Placeholder Component for unbuilt pages
const PagePlaceholder = ({ title, part }: { title: string, part: number }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-secondary)'
  }}>
    <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>{title}</h2>
    <p>This page will be built in Part {part} of the project.</p>
    <div style={{ marginTop: '24px', padding: '16px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
      Select another route from the sidebar to continue exploring the shell.
    </div>
  </div>
);

export const Drivers = () => <PagePlaceholder title="Driver Management" part={3} />;
export const Trips = () => <PagePlaceholder title="Trip Management & Dispatch" part={3} />;
export const Maintenance = () => <PagePlaceholder title="Maintenance" part={4} />;
export const Expenses = () => <PagePlaceholder title="Expense Ledger" part={4} />;
export const Reports = () => <PagePlaceholder title="Reports & Analytics" part={4} />;
