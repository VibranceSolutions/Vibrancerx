import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  ChevronRight, 
  Clock,
  Video,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Mock data
const upcomingAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 45,
    date: '2025-06-15',
    time: '10:00 AM',
    type: 'video',
    status: 'confirmed',
    reasonForVisit: 'Chest pain and shortness of breath',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    patientName: 'Emma Wilson',
    patientAge: 35,
    date: '2025-06-15',
    time: '11:30 AM',
    type: 'chat',
    status: 'confirmed',
    reasonForVisit: 'Follow-up on medication',
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    patientAge: 52,
    date: '2025-06-15',
    time: '2:00 PM',
    type: 'video',
    status: 'confirmed',
    reasonForVisit: 'Routine check-up for hypertension',
    profileImage: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
];

const weeklyStats = {
  totalAppointments: 26,
  completedAppointments: 18,
  canceledAppointments: 3,
  newPatients: 5,
  revenue: 3900,
};

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-secondary to-secondary-dark px-6 py-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, Dr. {user?.lastName}!
              </h1>
              <p className="mt-1 text-white/90">
                {currentDate} • {currentTime}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                <span className="text-sm">
                  <span className="font-medium">Today:</span> 3 appointments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Appointments</p>
              <h3 className="text-2xl font-bold mt-1">{weeklyStats.totalAppointments}</h3>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h3 className="text-2xl font-bold mt-1">{weeklyStats.completedAppointments}</h3>
              <p className="text-xs text-green-500 mt-1">
                {Math.round((weeklyStats.completedAppointments / weeklyStats.totalAppointments) * 100)}% completion rate
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">New Patients</p>
              <h3 className="text-2xl font-bold mt-1">{weeklyStats.newPatients}</h3>
              <p className="text-xs text-blue-500 mt-1">
                This week
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold mt-1">${weeklyStats.revenue}</h3>
              <p className="text-xs text-green-500 mt-1">
                +12% from last week
              </p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
            <Link 
              to="/doctor/appointments" 
              className="text-sm text-secondary hover:text-secondary-dark font-medium flex items-center"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <img 
                    src={appointment.profileImage} 
                    alt={appointment.patientName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">{appointment.time}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.type === 'video' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {appointment.type === 'video' ? 'Video' : 'Chat'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {appointment.patientAge} years old
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      <span className="font-medium">Reason:</span> {appointment.reasonForVisit}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    to={`/doctor/patient/${appointment.id.split('-')[0]}`}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Records
                  </Link>
                  <Link
                    to={`/doctor/consultation/${appointment.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                  >
                    {appointment.type === 'video' ? (
                      <>
                        <Video className="h-4 w-4 mr-1" /> Start Video
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 mr-1" /> Start Chat
                      </>
                    )}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Appointments Today</h3>
              <p className="text-gray-500 mb-4">You have no appointments scheduled for today.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pending Tasks</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">3 Prescriptions Pending Review</h3>
                <p className="text-sm text-gray-500">These need your approval before being sent to patients</p>
              </div>
            </div>
            <Link
              to="/doctor/prescriptions"
              className="text-secondary hover:text-secondary-dark font-medium text-sm"
            >
              Review
            </Link>
          </div>
          
          <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">5 Unread Messages</h3>
                <p className="text-sm text-gray-500">From patients requiring your response</p>
              </div>
            </div>
            <Link
              to="/doctor/messages"
              className="text-secondary hover:text-secondary-dark font-medium text-sm"
            >
              Respond
            </Link>
          </div>
          
          <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">Medical Records Update Required</h3>
                <p className="text-sm text-gray-500">Complete post-consultation documentation for 2 patients</p>
              </div>
            </div>
            <Link
              to="/doctor/records"
              className="text-secondary hover:text-secondary-dark font-medium text-sm"
            >
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;