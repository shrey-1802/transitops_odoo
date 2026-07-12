/**
 * Production-ready Error Handler
 */

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }
  
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
      isOperational: false,
    };
  }
  
  return {
    status: 500,
    message: 'An unexpected error occurred',
    isOperational: false,
  };
};

export const logError = (error: unknown, context?: string) => {
  console.error(`[${context || 'Error'}]`, error);
  // In production, integrate with error tracking service (e.g., Sentry)
};
