import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Filter, Calendar, User, Check, X, Edit } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

const mockPrescriptions = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 45,
    date: '2025-06-15',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '3 months',
        instructions: 'Take in the morning with food',
      },
    ],
    status: 'active',
    appointmentId: '1',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    patientName: 'Emma Wilson',
    patientAge: 35,
    date: '2025-06-14',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '10 days',
        instructions: 'Take with food every 8 hours',
      },
    ],
    status: 'pending',
    appointmentId: '2',
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    patientAge: 52,
    date: '2025-06-10',
    medications: [
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '6 months',
        instructions: 'Take with meals',
      },
    ],
    status: 'completed',
    appointmentId: '3',
    profileImage: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
];

const DoctorPrescriptions: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesFilter = filter === 'all' || prescription.status === filter;
    const matchesSearch = searchTerm === '' || 
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medications.some(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesFilter && matchesSearch;
  });

  const approvePrescription = (id: string) => {
    // In a real app, this would call an API to approve the prescription
    console.log('Approving prescription:', id);
  };

  const rejectPrescription = (id: string) => {
    // In a real app, this would call an API to reject the prescription
    console.log('Rejecting prescription:', id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Prescriptions</h1>
            <p className="text-gray-600">
              Manage patient prescriptions and medications
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            New Prescription
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by patient name or medication..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'secondary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'secondary' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'active' ? 'secondary' : 'outline'}
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'secondary' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div 
            key={prescription.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={prescription.profileImage} 
                    alt={prescription.patientName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {prescription.medications[0].name} {prescription.medications[0].dosage}
                    </h2>
                    <p className="text-gray-500">
                      {prescription.patientName} • {prescription.patientAge} years old
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  prescription.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : prescription.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prescribed: {new Date(prescription.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  Frequency: {prescription.medications[0].frequency}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  Duration: {prescription.medications[0].duration}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Instructions</h3>
                <p className="text-sm text-gray-700">
                  {prescription.medications[0].instructions}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/doctor/patient/${prescription.patientName.split(' ')[0].toLowerCase()}`}
                  className="text-sm text-secondary hover:text-secondary-dark font-medium"
                >
                  View Patient Records
                </Link>
                
                <div className="flex space-x-3">
                  {prescription.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rejectPrescription(prescription.id)}
                        leftIcon={<X className="h-4 w-4" />}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => approvePrescription(prescription.id)}
                        leftIcon={<Check className="h-4 w-4" />}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                  
                  {prescription.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Edit className="h-4 w-4" />}
                    >
                      Modify
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<FileText className="h-4 w-4" />}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPrescriptions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No prescriptions found</h3>
            <p className="text-gray-500 mb-4">
              {filter === 'pending' 
                ? "You don't have any pending prescriptions to review."
                : filter === 'active'
                ? "You don't have any active prescriptions."
                : filter === 'completed'
                ? "You don't have any completed prescriptions."
                : "You haven't created any prescriptions yet."}
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create New Prescription
            </Button>
          </div>
        )}
      </div>

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Prescription</h2>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowCreateModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>
                  <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50">
                    <option>Select a patient</option>
                    <option>John Doe</option>
                    <option>Emma Wilson</option>
                    <option>Michael Brown</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                    placeholder="Enter medication name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                    placeholder="e.g., 10mg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50">
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Four times daily</option>
                    <option>As needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                    placeholder="e.g., 7 days, 1 month"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                    placeholder="Number of pills/doses"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                  placeholder="Special instructions for the patient..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => setShowCreateModal(false)}
                >
                  Create Prescription
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPrescriptions;