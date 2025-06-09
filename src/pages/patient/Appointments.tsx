import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageSquare, AlertCircle, ChevronRight, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock appointments data
const mockAppointments = [
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
  {
    id: '3',
    doctorName: 'Dr. Emma Wilson',
    specialty: 'Dermatology',
    date: '2025-06-20',
    time: '11:15 AM',
    type: 'video',
    status: 'confirmed',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '4',
    doctorName: 'Dr. David Rodriguez',
    specialty: 'Psychiatry',
    date: '2025-06-22',
    time: '3:00 PM',
    type: 'chat',
    status: 'confirmed',
    profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
];

const PatientAppointments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'canceled'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    switch (filter) {
      case 'upcoming':
        return appointmentDate >= today;
      case 'past':
        return appointmentDate < today;
      case 'canceled':
        return appointment.status === 'canceled';
      default:
        return true;
    }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">
          Manage your upcoming and past appointments
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Appointments
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'past' ? 'primary' : 'outline'}
              onClick={() => setFilter('past')}
            >
              Past
            </Button>
            <Button
              variant={filter === 'canceled' ? 'primary' : 'outline'}
              onClick={() => setFilter('canceled')}
            >
              Canceled
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              More Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Type
                  </label>
                  <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                    <option>All types</option>
                    <option>Video consultation</option>
                    <option>Chat consultation</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
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
                        : appointment.status === 'canceled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
                    {appointment.type === 'video' ? (
                      <span className="flex items-center text-blue-500">
                        <Video className="h-4 w-4 mr-1" />
                        Video consultation
                      </span>
                    ) : (
                      <span className="flex items-center text-green-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat consultation
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {appointment.status === 'confirmed' && (
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
              )}
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
            <p className="text-gray-500 mb-4">
              {filter === 'upcoming' 
                ? "You don't have any upcoming appointments scheduled."
                : filter === 'past'
                ? "You don't have any past appointments."
                : filter === 'canceled'
                ? "You don't have any canceled appointments."
                : "You don't have any appointments."}
            </p>
            <Link to="/patient/find-doctors">
              <Button>
                Find a Doctor
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Need help?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                If you need to make changes to your appointment or have any questions, 
                our support team is here to help 24/7.
              </p>
            </div>
            <div className="mt-4">
              <Link
                to="/help"
                className="text-sm font-medium text-blue-800 hover:text-blue-900 flex items-center"
              >
                Contact Support <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;