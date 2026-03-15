
// Added React import to resolve missing namespace 'React' error for React.ReactNode
import React from 'react';

export interface BookingFormData {
  fullName: string;
  email: string;
  day: string;
  description: string;
}

export interface Specialty {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}