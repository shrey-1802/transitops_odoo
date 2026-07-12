/**
 * Data Formatters and Utilities
 */

import { CURRENCY, DATE_FORMAT } from './constants';

export const formatCurrency = (amount: number): string => {
  return `${CURRENCY.SYMBOL}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: CURRENCY.DECIMAL_PLACES,
    maximumFractionDigits: CURRENCY.DECIMAL_PLACES,
  })}`;
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('en-IN');
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const abbreviateNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getStatusBadgeColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Approved': 'bg-green-900 text-green-200',
    'Pending': 'bg-yellow-900 text-yellow-200',
    'Rejected': 'bg-red-900 text-red-200',
    'Completed': 'bg-green-900 text-green-200',
    'In Progress': 'bg-blue-900 text-blue-200',
    'Scheduled': 'bg-purple-900 text-purple-200',
    'Waiting Parts': 'bg-yellow-900 text-yellow-200',
  };
  return statusMap[status] || 'bg-slate-700 text-slate-200';
};
