import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, Clock, User, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';

const mockPrescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2025-06-01',
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
    nextRefill: '2025-09-01',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    date: '2025-05-15',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '10 days',
        instructions: 'Take with food every 8 hours',
      },
    ],
    status: 'completed',
    nextRefill: null,
  },
  // Add more mock prescriptions as needed
];

const PatientPrescriptions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
        <p className="text-gray-600">
          View and manage your prescriptions
        </p>
      </div>

      {/* Active Prescriptions Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Reminder
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Always follow your prescribed medication schedule. Contact your healthcare
                provider before making any changes to your medication regimen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-6">
        {mockPrescriptions.map((prescription) => (
          <div 
            key={prescription.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {prescription.medications[0].name} {prescription.medications[0].dosage}
                  </h2>
                  <p className="text-gray-500">{prescription.doctorName} • {prescription.specialty}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  prescription.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prescribed: {new Date(prescription.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration: {prescription.medications[0].duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  Frequency: {prescription.medications[0].frequency}
                </div>
                {prescription.nextRefill && (
                  <div className="flex items-center text-sm text-primary">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next Refill: {new Date(prescription.nextRefill).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Instructions</h3>
                <p className="text-sm text-gray-700">
                  {prescription.medications[0].instructions}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  Download PDF
                </Button>
                {prescription.status === 'active' && (
                  <Button>
                    Request Refill
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {mockPrescriptions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No prescriptions found</h3>
            <p className="text-gray-500 mb-4">
              You don't have any prescriptions at the moment.
            </p>
            <Link to="/patient/find-doctors">
              <Button>
                Find a Doctor
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPrescriptions;