/**
 * Environment Configuration
 */

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const config = {
  isDevelopment,
  isProduction,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  apiTimeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  debug: import.meta.env.VITE_DEBUG === 'true',
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
    exports: import.meta.env.VITE_ENABLE_EXPORTS !== 'false',
    reports: import.meta.env.VITE_ENABLE_REPORTS !== 'false',
  },
};

export default config;
