import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, MessageSquare, User, Filter, Search, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

// Mock appointments data
const mockAppointments = [
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
    date: '2025-06-16',
    time: '2:00 PM',
    type: 'video',
    status: 'pending',
    reasonForVisit: 'Routine check-up for hypertension',
    profileImage: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
  {
    id: '4',
    patientName: 'Sarah Johnson',
    patientAge: 28,
    date: '2025-06-17',
    time: '9:00 AM',
    type: 'chat',
    status: 'confirmed',
    reasonForVisit: 'Skin rash consultation',
    profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
];

const DoctorAppointments: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let matchesFilter = true;
    
    switch (filter) {
      case 'today':
        matchesFilter = appointmentDate.toDateString() === today.toDateString();
        break;
      case 'upcoming':
        matchesFilter = appointmentDate >= today;
        break;
      case 'completed':
        matchesFilter = appointment.status === 'completed';
        break;
      default:
        matchesFilter = true;
    }
    
    const matchesSearch = searchTerm === '' || 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reasonForVisit.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">
          Manage your patient appointments and consultations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by patient name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'today' ? 'primary' : 'outline'}
              onClick={() => setFilter('today')}
            >
              Today
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
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
                  alt={appointment.patientName}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{appointment.patientAge} years old</p>
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
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Reason:</span> {appointment.reasonForVisit}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/doctor/patient/${appointment.id.split('-')[0]}`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-1" />
                  View Patient
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
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
            <p className="text-gray-500 mb-4">
              {filter === 'today' 
                ? "You don't have any appointments scheduled for today."
                : filter === 'upcoming'
                ? "You don't have any upcoming appointments."
                : filter === 'completed'
                ? "You don't have any completed appointments."
                : "You don't have any appointments."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;