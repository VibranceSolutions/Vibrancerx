import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// For HIPAA compliance - encrypts PII before storing
export function encryptData(data: string, key: string): string {
  // In a real implementation, this would use a proper encryption library
  // This is just a placeholder to demonstrate the concept
  return btoa(data); // Simple encoding for demo purposes only
}

// For HIPAA compliance - decrypts PII for display
export function decryptData(data: string, key: string): string {
  // In a real implementation, this would use a proper decryption library
  // This is just a placeholder to demonstrate the concept
  return atob(data); // Simple decoding for demo purposes only
}

// Activity logging for HIPAA compliance
export function logActivity(
  userId: string, 
  action: string, 
  resource: string, 
  details: string
): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userId,
    action,
    resource,
    details,
  };
  
  console.log('HIPAA Activity Log:', logEntry);
  // In a real implementation, this would securely store the log entry
  // in a HIPAA-compliant database or logging service
}