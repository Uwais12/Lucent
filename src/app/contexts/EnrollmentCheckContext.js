'use client';

import { createContext, useContext } from 'react';
import { useEnrollmentCheck as useEnrollmentCheckHook } from '@/hooks/useEnrollmentCheck';

const EnrollmentCheckContext = createContext(null);

export function EnrollmentCheckProvider({ children }) {
  const enrollmentCheck = useEnrollmentCheckHook();

  return (
    <EnrollmentCheckContext.Provider value={enrollmentCheck}>
      {children}
    </EnrollmentCheckContext.Provider>
  );
}

export function useEnrollmentCheck() {
  const context = useContext(EnrollmentCheckContext);
  if (!context) {
    throw new Error('useEnrollmentCheck must be used within an EnrollmentCheckProvider');
  }
  return context;
} 