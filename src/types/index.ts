export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  education: string;
  experience: number;
  rating: number;
  consultationFee: number;
  availability: {
    day: string;
    slots: string[];
  }[];
  profileImage: string;
  about: string;
  location: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
    pastSurgeries: string[];
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  symptoms?: string;
  notes?: string;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  paymentAmount: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes?: string;
  status: 'active' | 'completed';
}

export interface Message {
  id: string;
  senderId: string;
  senderRole: 'patient' | 'doctor' | 'admin';
  receiverId: string;
  receiverRole: 'patient' | 'doctor' | 'admin';
  content: string;
  timestamp: string;
  read: boolean;
  appointmentId?: string;
}

export interface ConsultationSession {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  startTime: string;
  endTime?: string;
  status: 'waiting' | 'active' | 'ended';
  type: 'video' | 'chat';
  notes?: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded';
  timestamp: string;
  method: 'credit_card' | 'insurance' | 'other';
  transactionId: string;
}