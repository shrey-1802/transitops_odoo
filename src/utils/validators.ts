/**
 * Form and Data Validators
 */

import { VALIDATION_RULES } from './constants';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE.test(phone);
};

export const validateAmount = (amount: string | number): boolean => {
  return VALIDATION_RULES.AMOUNT.test(String(amount));
};

export const validateExpense = (expense: any): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!expense.vehicleId || expense.vehicleId.trim() === '') {
    errors.push({ field: 'vehicleId', message: 'Vehicle is required' });
  }
  
  if (!expense.type || expense.type.trim() === '') {
    errors.push({ field: 'type', message: 'Expense type is required' });
  }
  
  if (!expense.amount || !validateAmount(expense.amount)) {
    errors.push({ field: 'amount', message: 'Valid amount is required' });
  }
  
  if (!expense.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  }
  
  return errors;
};

export const validateMaintenance = (maintenance: any): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!maintenance.vehicleId || maintenance.vehicleId.trim() === '') {
    errors.push({ field: 'vehicleId', message: 'Vehicle is required' });
  }
  
  if (!maintenance.type || maintenance.type.trim() === '') {
    errors.push({ field: 'type', message: 'Maintenance type is required' });
  }
  
  if (!maintenance.cost || !validateAmount(maintenance.cost)) {
    errors.push({ field: 'cost', message: 'Valid cost is required' });
  }
  
  if (!maintenance.technician || maintenance.technician.trim() === '') {
    errors.push({ field: 'technician', message: 'Technician name is required' });
  }
  
  return errors;
};
