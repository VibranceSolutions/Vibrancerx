import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  Video, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Stethoscope
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Mock appointment data
const mockAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    patientId: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: '2',
    specialty: 'Cardiology',
    date: '2025-06-15',
    time: '10:00 AM',
    duration: 30,
    type: 'video',
    status: 'confirmed',
    fee: 150,
    paymentStatus: 'completed',
    symptoms: 'Chest pain and shortness of breath',
    patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    doctorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    patientName: 'Emma Wilson',
    patientId: '3',
    doctorName: 'Dr. Michael Chen',
    doctorId: '4',
    specialty: 'General Medicine',
    date: '2025-06-15',
    time: '2:30 PM',
    duration: 30,
    type: 'chat',
    status: 'pending',
    fee: 100,
    paymentStatus: 'pending',
    symptoms: 'Follow-up consultation',
    patientImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    doctorImage: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: '3',
    patientName: 'Robert Smith',
    patientId: '5',
    doctorName: 'Dr. Emma Wilson',
    doctorId: '6',
    specialty: 'Dermatology',
    date: '2025-06-16',
    time: '11:00 AM',
    duration: 45,
    type: 'video',
    status: 'completed',
    fee: 175,
    paymentStatus: 'completed',
    symptoms: 'Skin rash examination',
    patientImage: 'https://randomuser.me/api/portraits/men/62.jpg',
    doctorImage: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '4',
    patientName: 'Mary Johnson',
    patientId: '7',
    doctorName: 'Dr. David Rodriguez',
    doctorId: '8',
    specialty: 'Psychiatry',
    date: '2025-06-16',
    time: '3:00 PM',
    duration: 60,
    type: 'video',
    status: 'canceled',
    fee: 200,
    paymentStatus: 'refunded',
    symptoms: 'Anxiety and depression consultation',
    patientImage: 'https://randomuser.me/api/portraits/women/45.jpg',
    doctorImage: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
];

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'canceled'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'chat'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const matchesType = selectedType === 'all' || appointment.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    canceled: appointments.filter(a => a.status === 'canceled').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Appointments</h1>
        <p className="text-gray-600">
          Monitor and manage all appointments across the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-semibold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-lg font-semibold">{stats.confirmed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-semibold">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Canceled</p>
              <p className="text-lg font-semibold">{stats.canceled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by patient, doctor, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video</option>
                  <option value="chat">Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Appointments ({filteredAppointments.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={appointment.patientImage}
                        alt={appointment.patientName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {appointment.patientId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={appointment.doctorImage}
                        alt={appointment.doctorName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.doctorName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.specialty}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time} ({appointment.duration}min)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {appointment.type === 'video' ? (
                        <Video className="h-4 w-4 text-blue-500 mr-1" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-900 capitalize">
                        {appointment.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${appointment.fee}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(appointment.paymentStatus)}`}>
                      {appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                            title="Confirm Appointment"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'canceled')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Appointment"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;