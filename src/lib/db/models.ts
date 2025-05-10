
// These types represent our database tables/entities

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  bloodGroup: string;
  registrationDate: string;
  medicalHistory?: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  contactNumber: string;
  email: string;
  department: string;
  joinDate: string;
  schedule?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  purpose: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Department {
  id: number;
  name: string;
  head: string;
  location: string;
  contactNumber: string;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  prescription: string;
  recordDate: string;
  notes?: string;
}

// Dashboard statistics interfaces
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  upcomingAppointments: number;
}
