import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Demo data for the patient dashboard
const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2025-06-15',
    time: '10:00 AM',
    type: 'video',
    status: 'confirmed',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    date: '2025-06-18',
    time: '2:30 PM',
    type: 'chat',
    status: 'pending',
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

const recentPrescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Emma Wilson',
    medication: 'Amoxicillin 500mg',
    date: '2025-06-01',
    instructions: 'Take 1 capsule every 8 hours for 7 days',
  },
  {
    id: '2',
    doctorName: 'Dr. Sarah Johnson',
    medication: 'Lisinopril 10mg',
    date: '2025-05-15',
    instructions: 'Take 1 tablet daily',
  },
];

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 sm:px-8">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-1 text-white/90">
            How are you feeling today?
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 p-6">
          <Link 
            to="/patient/find-doctors"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Find a Doctor</h3>
                <p className="text-sm text-gray-600">Connect with specialists</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          
          <Link 
            to="/patient/appointments"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">My Appointments</h3>
                <p className="text-sm text-gray-600">View or reschedule</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold mt-1">{upcomingAppointments.length}</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              to="/patient/appointments"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Unread Messages</p>
              <h3 className="text-2xl font-bold mt-1">3</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              to="/patient/messages"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Prescriptions</p>
              <h3 className="text-2xl font-bold mt-1">2</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              to="/patient/prescriptions"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              View all
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <img 
                    src={appointment.profileImage} 
                    alt={appointment.doctorName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{appointment.doctorName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      {appointment.time}
                      <span className="mx-2">•</span>
                      <span className={`capitalize ${
                        appointment.type === 'video' ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        {appointment.type} consultation
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    to={`/patient/consultation/${appointment.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Join {appointment.type === 'video' ? 'Video Call' : 'Chat'}
                  </Link>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Reschedule
                  </button>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Upcoming Appointments</h3>
              <p className="text-gray-500 mb-4">You don't have any upcoming appointments scheduled.</p>
              <Link
                to="/patient/find-doctors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Find a Doctor
              </Link>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link
            to="/patient/appointments"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            View all appointments <ChevronRight className="inline h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Prescriptions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentPrescriptions.map((prescription) => (
            <div key={prescription.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{prescription.medication}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(prescription.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-500">{prescription.doctorName}</p>
              <p className="mt-2 text-sm text-gray-700">{prescription.instructions}</p>
              <div className="mt-4">
                <Link
                  to={`/patient/prescriptions/${prescription.id}`}
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link
            to="/patient/prescriptions"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            View all prescriptions <ChevronRight className="inline h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Health alerts */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Attention needed</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                It's time for your annual physical checkup. Schedule an appointment with your primary care physician.
              </p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className="bg-amber-50 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600"
                >
                  Schedule now
                </button>
                <button
                  type="button"
                  className="ml-3 bg-amber-50 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;