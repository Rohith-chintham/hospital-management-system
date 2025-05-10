
import { toast } from "sonner";
import { 
  Patient, 
  Doctor, 
  Appointment, 
  Department, 
  MedicalRecord,
  DashboardStats 
} from "./models";

// Mock database implementation with localStorage
// In a real app, this would connect to a SQL database via API

// Initialize database if empty
const initDatabase = () => {
  // Check if database is already initialized
  if (!localStorage.getItem('hms_initialized')) {
    // Create sample data
    const patients: Patient[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1985-05-15",
        gender: "Male",
        contactNumber: "555-123-4567",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown",
        bloodGroup: "O+",
        registrationDate: "2023-01-10",
        medicalHistory: "Hypertension"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-08-22",
        gender: "Female",
        contactNumber: "555-987-6543",
        email: "jane.smith@example.com",
        address: "456 Oak Ave, Somewhere",
        bloodGroup: "A+",
        registrationDate: "2023-02-15",
        medicalHistory: "None"
      },
      {
        id: 3,
        firstName: "Robert",
        lastName: "Johnson",
        dateOfBirth: "1978-11-30",
        gender: "Male",
        contactNumber: "555-567-8901",
        email: "robert.johnson@example.com",
        address: "789 Pine Rd, Elsewhere",
        bloodGroup: "B-",
        registrationDate: "2023-03-05",
        medicalHistory: "Diabetes"
      }
    ];

    const doctors: Doctor[] = [
      {
        id: 1,
        firstName: "Sarah",
        lastName: "Williams",
        specialization: "Cardiology",
        contactNumber: "555-222-3333",
        email: "sarah.williams@hospital.com",
        department: "Cardiology",
        joinDate: "2020-05-10",
        schedule: "Mon-Fri, 9AM-5PM"
      },
      {
        id: 2,
        firstName: "Michael",
        lastName: "Brown",
        specialization: "Neurology",
        contactNumber: "555-444-5555",
        email: "michael.brown@hospital.com",
        department: "Neurology",
        joinDate: "2019-08-15",
        schedule: "Mon-Thu, 8AM-4PM"
      },
      {
        id: 3,
        firstName: "Emily",
        lastName: "Davis",
        specialization: "Pediatrics",
        contactNumber: "555-666-7777",
        email: "emily.davis@hospital.com",
        department: "Pediatrics",
        joinDate: "2021-02-20",
        schedule: "Wed-Sun, 10AM-6PM"
      }
    ];

    const appointments: Appointment[] = [
      {
        id: 1,
        patientId: 1,
        doctorId: 2,
        appointmentDate: "2025-05-11",
        appointmentTime: "10:00 AM",
        purpose: "Headache consultation",
        status: "scheduled",
        notes: "Recurring migraines"
      },
      {
        id: 2,
        patientId: 3,
        doctorId: 1,
        appointmentDate: "2025-05-12",
        appointmentTime: "2:30 PM",
        purpose: "Routine checkup",
        status: "scheduled",
        notes: "Annual heart examination"
      },
      {
        id: 3,
        patientId: 2,
        doctorId: 3,
        appointmentDate: "2025-05-10",
        appointmentTime: "11:15 AM",
        purpose: "Follow-up",
        status: "completed",
        notes: "Post-treatment evaluation"
      }
    ];

    const departments: Department[] = [
      {
        id: 1,
        name: "Cardiology",
        head: "Dr. Sarah Williams",
        location: "Building A, 3rd Floor",
        contactNumber: "555-100-1000"
      },
      {
        id: 2,
        name: "Neurology",
        head: "Dr. Michael Brown",
        location: "Building B, 2nd Floor",
        contactNumber: "555-200-2000"
      },
      {
        id: 3,
        name: "Pediatrics",
        head: "Dr. Emily Davis",
        location: "Building C, 1st Floor",
        contactNumber: "555-300-3000"
      }
    ];

    const medicalRecords: MedicalRecord[] = [
      {
        id: 1,
        patientId: 3,
        doctorId: 1,
        diagnosis: "Type 2 Diabetes",
        prescription: "Metformin 500mg twice daily",
        recordDate: "2025-04-25",
        notes: "Blood sugar levels stabilizing"
      },
      {
        id: 2,
        patientId: 1,
        doctorId: 2,
        diagnosis: "Tension headache",
        prescription: "Ibuprofen 400mg as needed",
        recordDate: "2025-05-01",
        notes: "Advised stress management techniques"
      }
    ];

    // Save to localStorage
    localStorage.setItem('hms_patients', JSON.stringify(patients));
    localStorage.setItem('hms_doctors', JSON.stringify(doctors));
    localStorage.setItem('hms_appointments', JSON.stringify(appointments));
    localStorage.setItem('hms_departments', JSON.stringify(departments));
    localStorage.setItem('hms_medical_records', JSON.stringify(medicalRecords));
    localStorage.setItem('hms_initialized', 'true');
  }
};

// Initialize on module load
initDatabase();

// Helper function to get next ID for a collection
const getNextId = <T extends { id: number }>(items: T[]): number => {
  return items.length > 0 
    ? Math.max(...items.map(item => item.id)) + 1 
    : 1;
};

// Patient operations
export const getPatients = (): Patient[] => {
  try {
    const data = localStorage.getItem('hms_patients') || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching patients:", error);
    toast.error("Failed to fetch patients");
    return [];
  }
};

export const getPatientById = (id: number): Patient | undefined => {
  try {
    const patients = getPatients();
    return patients.find(patient => patient.id === id);
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    toast.error("Failed to fetch patient details");
    return undefined;
  }
};

export const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  try {
    const patients = getPatients();
    const newPatient = {
      ...patient,
      id: getNextId(patients),
      registrationDate: new Date().toISOString().split('T')[0]
    };
    
    patients.push(newPatient);
    localStorage.setItem('hms_patients', JSON.stringify(patients));
    toast.success("Patient added successfully");
    return newPatient;
  } catch (error) {
    console.error("Error adding patient:", error);
    toast.error("Failed to add patient");
    throw error;
  }
};

export const updatePatient = (id: number, patient: Omit<Patient, 'id'>): Patient => {
  try {
    const patients = getPatients();
    const index = patients.findIndex(p => p.id === id);
    
    if (index === -1) {
      toast.error("Patient not found");
      throw new Error("Patient not found");
    }
    
    const updatedPatient = { ...patient, id };
    patients[index] = updatedPatient;
    localStorage.setItem('hms_patients', JSON.stringify(patients));
    toast.success("Patient updated successfully");
    return updatedPatient;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    toast.error("Failed to update patient");
    throw error;
  }
};

export const deletePatient = (id: number): boolean => {
  try {
    const patients = getPatients();
    const filteredPatients = patients.filter(patient => patient.id !== id);
    
    if (filteredPatients.length === patients.length) {
      toast.error("Patient not found");
      return false;
    }
    
    localStorage.setItem('hms_patients', JSON.stringify(filteredPatients));
    toast.success("Patient deleted successfully");
    return true;
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    toast.error("Failed to delete patient");
    return false;
  }
};

// Doctor operations
export const getDoctors = (): Doctor[] => {
  try {
    const data = localStorage.getItem('hms_doctors') || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    toast.error("Failed to fetch doctors");
    return [];
  }
};

export const getDoctorById = (id: number): Doctor | undefined => {
  try {
    const doctors = getDoctors();
    return doctors.find(doctor => doctor.id === id);
  } catch (error) {
    console.error(`Error fetching doctor with ID ${id}:`, error);
    toast.error("Failed to fetch doctor details");
    return undefined;
  }
};

export const addDoctor = (doctor: Omit<Doctor, 'id'>): Doctor => {
  try {
    const doctors = getDoctors();
    const newDoctor = {
      ...doctor,
      id: getNextId(doctors)
    };
    
    doctors.push(newDoctor);
    localStorage.setItem('hms_doctors', JSON.stringify(doctors));
    toast.success("Doctor added successfully");
    return newDoctor;
  } catch (error) {
    console.error("Error adding doctor:", error);
    toast.error("Failed to add doctor");
    throw error;
  }
};

export const updateDoctor = (id: number, doctor: Omit<Doctor, 'id'>): Doctor => {
  try {
    const doctors = getDoctors();
    const index = doctors.findIndex(d => d.id === id);
    
    if (index === -1) {
      toast.error("Doctor not found");
      throw new Error("Doctor not found");
    }
    
    const updatedDoctor = { ...doctor, id };
    doctors[index] = updatedDoctor;
    localStorage.setItem('hms_doctors', JSON.stringify(doctors));
    toast.success("Doctor updated successfully");
    return updatedDoctor;
  } catch (error) {
    console.error(`Error updating doctor with ID ${id}:`, error);
    toast.error("Failed to update doctor");
    throw error;
  }
};

export const deleteDoctor = (id: number): boolean => {
  try {
    const doctors = getDoctors();
    const filteredDoctors = doctors.filter(doctor => doctor.id !== id);
    
    if (filteredDoctors.length === doctors.length) {
      toast.error("Doctor not found");
      return false;
    }
    
    localStorage.setItem('hms_doctors', JSON.stringify(filteredDoctors));
    toast.success("Doctor deleted successfully");
    return true;
  } catch (error) {
    console.error(`Error deleting doctor with ID ${id}:`, error);
    toast.error("Failed to delete doctor");
    return false;
  }
};

// Appointment operations
export const getAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem('hms_appointments') || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    toast.error("Failed to fetch appointments");
    return [];
  }
};

export const getAppointmentById = (id: number): Appointment | undefined => {
  try {
    const appointments = getAppointments();
    return appointments.find(appointment => appointment.id === id);
  } catch (error) {
    console.error(`Error fetching appointment with ID ${id}:`, error);
    toast.error("Failed to fetch appointment details");
    return undefined;
  }
};

export const addAppointment = (appointment: Omit<Appointment, 'id'>): Appointment => {
  try {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointment,
      id: getNextId(appointments)
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('hms_appointments', JSON.stringify(appointments));
    toast.success("Appointment scheduled successfully");
    return newAppointment;
  } catch (error) {
    console.error("Error adding appointment:", error);
    toast.error("Failed to schedule appointment");
    throw error;
  }
};

export const updateAppointment = (id: number, appointment: Omit<Appointment, 'id'>): Appointment => {
  try {
    const appointments = getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    
    if (index === -1) {
      toast.error("Appointment not found");
      throw new Error("Appointment not found");
    }
    
    const updatedAppointment = { ...appointment, id };
    appointments[index] = updatedAppointment;
    localStorage.setItem('hms_appointments', JSON.stringify(appointments));
    toast.success("Appointment updated successfully");
    return updatedAppointment;
  } catch (error) {
    console.error(`Error updating appointment with ID ${id}:`, error);
    toast.error("Failed to update appointment");
    throw error;
  }
};

export const deleteAppointment = (id: number): boolean => {
  try {
    const appointments = getAppointments();
    const filteredAppointments = appointments.filter(appointment => appointment.id !== id);
    
    if (filteredAppointments.length === appointments.length) {
      toast.error("Appointment not found");
      return false;
    }
    
    localStorage.setItem('hms_appointments', JSON.stringify(filteredAppointments));
    toast.success("Appointment cancelled successfully");
    return true;
  } catch (error) {
    console.error(`Error deleting appointment with ID ${id}:`, error);
    toast.error("Failed to cancel appointment");
    return false;
  }
};

// Department operations
export const getDepartments = (): Department[] => {
  try {
    const data = localStorage.getItem('hms_departments') || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching departments:", error);
    toast.error("Failed to fetch departments");
    return [];
  }
};

// Medical Record operations
export const getMedicalRecords = (): MedicalRecord[] => {
  try {
    const data = localStorage.getItem('hms_medical_records') || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching medical records:", error);
    toast.error("Failed to fetch medical records");
    return [];
  }
};

export const getPatientMedicalRecords = (patientId: number): MedicalRecord[] => {
  try {
    const records = getMedicalRecords();
    return records.filter(record => record.patientId === patientId);
  } catch (error) {
    console.error(`Error fetching medical records for patient ${patientId}:`, error);
    toast.error("Failed to fetch patient medical records");
    return [];
  }
};

export const addMedicalRecord = (record: Omit<MedicalRecord, 'id'>): MedicalRecord => {
  try {
    const records = getMedicalRecords();
    const newRecord = {
      ...record,
      id: getNextId(records)
    };
    
    records.push(newRecord);
    localStorage.setItem('hms_medical_records', JSON.stringify(records));
    toast.success("Medical record added successfully");
    return newRecord;
  } catch (error) {
    console.error("Error adding medical record:", error);
    toast.error("Failed to add medical record");
    throw error;
  }
};

// Dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  try {
    const patients = getPatients();
    const doctors = getDoctors();
    const allAppointments = getAppointments();
    
    const today = new Date().toISOString().split('T')[0];
    const upcomingAppointments = allAppointments.filter(
      appointment => appointment.appointmentDate >= today && appointment.status === 'scheduled'
    );
    
    return {
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      totalAppointments: allAppointments.length,
      upcomingAppointments: upcomingAppointments.length
    };
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    toast.error("Failed to load dashboard statistics");
    return {
      totalPatients: 0,
      totalDoctors: 0,
      totalAppointments: 0,
      upcomingAppointments: 0
    };
  }
};

// Search functionality
export const searchPatients = (query: string): Patient[] => {
  try {
    if (!query.trim()) return [];
    
    const patients = getPatients();
    const lowerQuery = query.toLowerCase();
    
    return patients.filter(patient => 
      patient.firstName.toLowerCase().includes(lowerQuery) ||
      patient.lastName.toLowerCase().includes(lowerQuery) ||
      patient.email.toLowerCase().includes(lowerQuery) ||
      patient.contactNumber.includes(query)
    );
  } catch (error) {
    console.error("Error searching patients:", error);
    toast.error("Search failed");
    return [];
  }
};

export const searchDoctors = (query: string): Doctor[] => {
  try {
    if (!query.trim()) return [];
    
    const doctors = getDoctors();
    const lowerQuery = query.toLowerCase();
    
    return doctors.filter(doctor => 
      doctor.firstName.toLowerCase().includes(lowerQuery) ||
      doctor.lastName.toLowerCase().includes(lowerQuery) ||
      doctor.specialization.toLowerCase().includes(lowerQuery) ||
      doctor.email.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Error searching doctors:", error);
    toast.error("Search failed");
    return [];
  }
};
