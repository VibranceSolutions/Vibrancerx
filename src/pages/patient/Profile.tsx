import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Mail, MapPin, Shield, AlertTriangle, Save, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { logActivity } from '../../lib/utils';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please enter your state'),
  zipCode: z.string().min(5, 'Please enter a valid ZIP code'),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Please enter a valid phone number'),
  emergencyContactRelation: z.string().min(2, 'Please specify the relationship'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const PatientProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'personal' | 'medical' | 'security'>('personal');
  
  // Mock initial data - in a real app, this would come from an API
  const defaultValues: ProfileFormValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    dateOfBirth: '1990-01-01',
    gender: 'prefer_not_to_say',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    insuranceProvider: 'Blue Cross Blue Shield',
    insuranceNumber: 'BCBS123456789',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '(555) 987-6543',
    emergencyContactRelation: 'Spouse',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const [medicalHistory, setMedicalHistory] = useState({
    conditions: ['Hypertension', 'Asthma'],
    allergies: ['Penicillin', 'Pollen'],
    medications: ['Lisinopril 10mg', 'Albuterol inhaler'],
    surgeries: ['Appendectomy (2015)'],
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // In a real app, this would be an API call to update the profile
      console.log('Updating profile:', data);
      
      // Log the activity for HIPAA compliance
      if (user) {
        logActivity(
          user.id,
          'update_profile',
          'profile',
          'Patient updated their profile information'
        );
      }
      
      setIsEditing(false);
      reset(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const addItem = (category: keyof typeof medicalHistory) => {
    const item = window.prompt(`Add new ${category.slice(0, -1)}`);
    if (item) {
      setMedicalHistory(prev => ({
        ...prev,
        [category]: [...prev[category], item],
      }));
      
      // Log the activity for HIPAA compliance
      if (user) {
        logActivity(
          user.id,
          'update_medical_history',
          'medical_history',
          `Patient added ${category.slice(0, -1)} to medical history`
        );
      }
    }
  };

  const removeItem = (category: keyof typeof medicalHistory, index: number) => {
    setMedicalHistory(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
    
    // Log the activity for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'update_medical_history',
        'medical_history',
        `Patient removed item from ${category} in medical history`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        
        {/* Profile Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'personal'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('personal')}
            >
              Personal Information
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'medical'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('medical')}
            >
              Medical History
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'security'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('security')}
            >
              Security & Privacy
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Personal Information Tab */}
          {selectedTab === 'personal' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={isEditing ? 'outline' : 'primary'}
                  onClick={() => {
                    if (isEditing) {
                      reset(defaultValues);
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
              
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    disabled={!isEditing}
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Last Name"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    disabled={!isEditing}
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={!isEditing}
                    leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Phone Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                    disabled={!isEditing}
                    leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Date of Birth"
                    type="date"
                    {...register('dateOfBirth')}
                    error={errors.dateOfBirth?.message}
                    disabled={!isEditing}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      {...register('gender')}
                      disabled={!isEditing}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Address */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Street Address"
                      {...register('address')}
                      error={errors.address?.message}
                      disabled={!isEditing}
                      leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                    />
                  </div>
                  
                  <Input
                    label="City"
                    {...register('city')}
                    error={errors.city?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="State"
                    {...register('state')}
                    error={errors.state?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="ZIP Code"
                    {...register('zipCode')}
                    error={errors.zipCode?.message}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {/* Insurance Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Insurance Provider"
                    {...register('insuranceProvider')}
                    error={errors.insuranceProvider?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Insurance Number"
                    {...register('insuranceNumber')}
                    error={errors.insuranceNumber?.message}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {/* Emergency Contact */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    {...register('emergencyContactName')}
                    error={errors.emergencyContactName?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Contact Phone"
                    {...register('emergencyContactPhone')}
                    error={errors.emergencyContactPhone?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Relationship"
                    {...register('emergencyContactRelation')}
                    error={errors.emergencyContactRelation?.message}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <Button
                    type="submit"
                    disabled={!isDirty}
                    leftIcon={<Save className="h-4 w-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          )}
          
          {/* Medical History Tab */}
          {selectedTab === 'medical' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Notice
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Please ensure all medical information is accurate and up-to-date.
                        This information will be shared with your healthcare providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medical Conditions */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Medical Conditions</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem('conditions')}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Condition
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  {medicalHistory.conditions.length > 0 ? (
                    <ul className="space-y-2">
                      {medicalHistory.conditions.map((condition, index) => (
                        <li 
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                        >
                          <span>{condition}</span>
                          <button
                            onClick={() => removeItem('conditions', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No medical conditions listed
                    </p>
                  )}
                </div>
              </div>
              
              {/* Allergies */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Allergies</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem('allergies')}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Allergy
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  {medicalHistory.allergies.length > 0 ? (
                    <ul className="space-y-2">
                      {medicalHistory.allergies.map((allergy, index) => (
                        <li 
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                        >
                          <span>{allergy}</span>
                          <button
                            onClick={() => removeItem('allergies', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No allergies listed
                    </p>
                  )}
                </div>
              </div>
              
              {/* Current Medications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Current Medications</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem('medications')}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Medication
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  {medicalHistory.medications.length > 0 ? (
                    <ul className="space-y-2">
                      {medicalHistory.medications.map((medication, index) => (
                        <li 
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                        >
                          <span>{medication}</span>
                          <button
                            onClick={() => removeItem('medications', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No medications listed
                    </p>
                  )}
                </div>
              </div>
              
              {/* Past Surgeries */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Past Surgeries</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem('surgeries')}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Surgery
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  {medicalHistory.surgeries.length > 0 ? (
                    <ul className="space-y-2">
                      {medicalHistory.surgeries.map((surgery, index) => (
                        <li 
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                        >
                          <span>{surgery}</span>
                          <button
                            onClick={() => removeItem('surgeries', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No past surgeries listed
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Security & Privacy Tab */}
          {selectedTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-green-800 font-medium">HIPAA Compliance</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Your medical information is protected under HIPAA privacy laws.
                    We use industry-standard encryption to keep your data secure.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-500">
                        Update your password regularly for better security
                      </p>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Login History</h3>
                      <p className="text-sm text-gray-500">
                        View your recent account activity
                      </p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                      <p className="text-sm text-gray-500">
                        Control who can see your profile information
                      </p>
                    </div>
                    <select className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>Doctors Only</option>
                      <option>Healthcare Providers</option>
                      <option>Private</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Manage your email preferences
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Data Export</h3>
                      <p className="text-sm text-gray-500">
                        Download a copy of your medical records
                      </p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-red-800 font-medium">Delete Account</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Once you delete your account, there is no going back.
                    Please be certain.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="danger"
                      size="sm"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;