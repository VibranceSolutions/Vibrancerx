import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Mail, MapPin, GraduationCap, Award, Save, Edit, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { logActivity } from '../../lib/utils';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  specialty: z.string().min(2, 'Please enter your specialty'),
  licenseNumber: z.string().min(5, 'Please enter your license number'),
  education: z.string().min(5, 'Please enter your education details'),
  experience: z.number().min(0, 'Experience must be a positive number'),
  consultationFee: z.number().min(0, 'Consultation fee must be a positive number'),
  about: z.string().min(50, 'About section must be at least 50 characters'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please enter your state'),
  zipCode: z.string().min(5, 'Please enter a valid ZIP code'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const DoctorProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'availability' | 'settings'>('profile');
  
  // Mock initial data - in a real app, this would come from an API
  const defaultValues: ProfileFormValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    specialty: 'Cardiology',
    licenseNumber: 'MD123456',
    education: 'Harvard Medical School',
    experience: 12,
    consultationFee: 150,
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating various heart conditions. She specializes in preventive cardiology, heart failure management, and interventional procedures.',
    address: '123 Medical Center Dr',
    city: 'Boston',
    state: 'MA',
    zipCode: '02115',
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

  const [availability, setAvailability] = useState([
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
    { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' },
  ]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // In a real app, this would be an API call to update the profile
      console.log('Updating profile:', data);
      
      // Log the activity for HIPAA compliance
      if (user) {
        logActivity(
          user.id,
          'update_profile',
          'doctor_profile',
          'Doctor updated their profile information'
        );
      }
      
      setIsEditing(false);
      reset(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const updateAvailability = (index: number, field: string, value: any) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
    
    // Log the activity for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'update_availability',
        'doctor_availability',
        `Doctor updated availability for ${updated[index].day}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Profile</h1>
          <p className="mt-1 text-gray-600">
            Manage your professional information and availability
          </p>
        </div>
        
        {/* Profile Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'profile'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('profile')}
            >
              Professional Information
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'availability'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('availability')}
            >
              Availability
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'settings'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Professional Information Tab */}
          {selectedTab === 'profile' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={isEditing ? 'outline' : 'secondary'}
                  onClick={() => {
                    if (isEditing) {
                      reset(defaultValues);
                    }
                    setIsEditing(!isEditing);
                  }}
                  leftIcon={<Edit className="h-4 w-4" />}
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
                </div>
              </div>
              
              {/* Professional Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Specialty"
                    {...register('specialty')}
                    error={errors.specialty?.message}
                    disabled={!isEditing}
                    leftIcon={<Award className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="License Number"
                    {...register('licenseNumber')}
                    error={errors.licenseNumber?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Education"
                    {...register('education')}
                    error={errors.education?.message}
                    disabled={!isEditing}
                    leftIcon={<GraduationCap className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Years of Experience"
                    type="number"
                    {...register('experience', { valueAsNumber: true })}
                    error={errors.experience?.message}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Consultation Fee ($)"
                    type="number"
                    {...register('consultationFee', { valueAsNumber: true })}
                    error={errors.consultationFee?.message}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                <textarea
                  {...register('about')}
                  rows={4}
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 disabled:bg-gray-100"
                  placeholder="Tell patients about yourself, your experience, and your approach to healthcare..."
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
                )}
              </div>
              
              {/* Address */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Practice Address</h2>
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
          
          {/* Availability Tab */}
          {selectedTab === 'availability' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Weekly Availability</h2>
                <Button variant="outline" size="sm">
                  Save Availability
                </Button>
              </div>
              
              <div className="space-y-4">
                {availability.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={day.enabled}
                        onChange={(e) => updateAvailability(index, 'enabled', e.target.checked)}
                        className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                      />
                      <span className="font-medium text-gray-900 w-20">{day.day}</span>
                    </div>
                    
                    {day.enabled && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={(e) => updateAvailability(index, 'startTime', e.target.value)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={(e) => updateAvailability(index, 'endTime', e.target.value)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
                        />
                      </div>
                    )}
                    
                    {!day.enabled && (
                      <span className="text-gray-500">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-blue-800 font-medium mb-2">Time Zone</h3>
                <p className="text-blue-700 text-sm">
                  All times are displayed in Eastern Time (ET). Patients will see appointment times converted to their local time zone.
                </p>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">New Appointment Notifications</h3>
                      <p className="text-sm text-gray-500">Get notified when patients book appointments</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Message Notifications</h3>
                      <p className="text-sm text-gray-500">Get notified when patients send messages</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Appointment Reminders</h3>
                      <p className="text-sm text-gray-500">Get reminded 15 minutes before appointments</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                      <p className="text-sm text-gray-500">Allow patients to find you in the directory</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Online Status</h3>
                      <p className="text-sm text-gray-500">Show when you're available for consultations</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
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

export default DoctorProfile;