import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Layouts
import RootLayout from '@/components/layouts/RootLayout';
import PatientLayout from '@/components/layouts/PatientLayout';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import AdminLayout from '@/components/layouts/AdminLayout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Landing Pages
import PatientLandingPage from '@/pages/patient/LandingPage';
import DoctorLandingPage from '@/pages/doctor/LandingPage';
import AdminLandingPage from '@/pages/admin/LandingPage';

// Patient Pages
import PatientDashboard from '@/pages/patient/Dashboard';
import DoctorDirectory from '@/pages/patient/DoctorDirectory';
import BookAppointment from '@/pages/patient/BookAppointment';
import PatientAppointments from '@/pages/patient/Appointments';
import PatientProfile from '@/pages/patient/Profile';
import PatientMessages from '@/pages/patient/Messages';
import PatientConsultation from '@/pages/patient/Consultation';
import PatientPrescriptions from '@/pages/patient/Prescriptions';

// Doctor Pages
import DoctorDashboard from '@/pages/doctor/Dashboard';
import DoctorAppointments from '@/pages/doctor/Appointments';
import DoctorProfile from '@/pages/doctor/Profile';
import DoctorMessages from '@/pages/doctor/Messages';
import DoctorConsultation from '@/pages/doctor/Consultation';
import DoctorPrescriptions from '@/pages/doctor/Prescriptions';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import ManageUsers from '@/pages/admin/ManageUsers';
import ManageAppointments from '@/pages/admin/ManageAppointments';
import ManagePayments from '@/pages/admin/ManagePayments';
import SystemSettings from '@/pages/admin/SystemSettings';

// Public and Shared Pages
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const App: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={`/${user.role}/landing`} replace />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={`/${user.role}/landing`} replace />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Patient Routes */}
      <Route element={<ProtectedRoute role="patient" />}>
        <Route element={<PatientLayout />}>
          <Route path="/patient/landing" element={<PatientLandingPage />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/find-doctors" element={<DoctorDirectory />} />
          <Route path="/patient/book/:doctorId" element={<BookAppointment />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/messages" element={<PatientMessages />} />
          <Route path="/patient/consultation/:appointmentId" element={<PatientConsultation />} />
          <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
          {/* Default redirect for /patient */}
          <Route path="/patient" element={<Navigate to="/patient/landing\" replace />} />
        </Route>
      </Route>

      {/* Doctor Routes */}
      <Route element={<ProtectedRoute role="doctor" />}>
        <Route element={<DoctorLayout />}>
          <Route path="/doctor/landing" element={<DoctorLandingPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/messages" element={<DoctorMessages />} />
          <Route path="/doctor/consultation/:appointmentId" element={<DoctorConsultation />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
          {/* Default redirect for /doctor */}
          <Route path="/doctor" element={<Navigate to="/doctor/landing\" replace />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/landing" element={<AdminLandingPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/appointments" element={<ManageAppointments />} />
          <Route path="/admin/payments" element={<ManagePayments />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          {/* Default redirect for /admin */}
          <Route path="/admin" element={<Navigate to="/admin/landing\" replace />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

interface ProtectedRouteProps {
  role: 'patient' | 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<React.PropsWithChildren<ProtectedRouteProps>> = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login\" replace />;
  }

  if (user.role !== role) {
    if (user.role === 'patient') return <Navigate to="/patient/landing" replace />;
    if (user.role === 'doctor') return <Navigate to="/doctor/landing" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/landing" replace />;
  }

  return <>{children}</>;
};

export default App;