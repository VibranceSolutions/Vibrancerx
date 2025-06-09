import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar, Clock, CreditCard, MessageSquare, Video, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { formatCurrency, logActivity } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

import 'react-day-picker/dist/style.css';

// Mock doctor data based on the id from URL params
const getDoctorById = (id: string) => {
  return {
    id,
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialty: 'Cardiology',
    education: 'Harvard Medical School',
    experience: 12,
    rating: 4.9,
    consultationFee: 150,
    availability: [
      { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
      { day: 'Tuesday', slots: [] },
      { day: 'Wednesday', slots: ['1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'Thursday', slots: ['9:00 AM', '11:00 AM'] },
      { day: 'Friday', slots: ['8:00 AM', '11:00 AM', '4:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM', '12:00 PM'] },
      { day: 'Sunday', slots: [] },
    ],
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating various heart conditions.',
    location: 'Boston, MA',
  };
};

// Get available slots for the selected date
const getAvailableSlots = (date: Date) => {
  const dayOfWeek = format(date, 'EEEE');
  const doctor = getDoctorById('1'); // This would use the actual doctor ID in a real app
  const dayAvailability = doctor.availability.find(a => a.day === dayOfWeek);
  return dayAvailability ? dayAvailability.slots : [];
};

const BookAppointment: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const doctor = getDoctorById(doctorId || '1');
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<'video' | 'chat'>('video');
  const [symptoms, setSymptoms] = useState('');
  const [step, setStep] = useState(1);
  
  // Update available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableSlots(selectedDate);
      setAvailableSlots(slots);
      setSelectedSlot(null); // Reset selected slot when date changes
    }
  }, [selectedDate]);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };
  
  const handleAppointmentTypeChange = (type: 'video' | 'chat') => {
    setAppointmentType(type);
  };
  
  const handleNextStep = () => {
    if (step === 1 && (!selectedDate || !selectedSlot)) {
      toast.error('Please select both date and time');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAppointment = () => {
    // In a real app, this would call an API to book the appointment
    
    // Log the activity for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'book_appointment',
        `appointment:${doctor.id}:${selectedDate?.toISOString()}:${selectedSlot}`,
        `Patient booked a ${appointmentType} appointment with Dr. ${doctor.lastName}`
      );
    }
    
    toast.success('Appointment booked successfully!');
    
    // Redirect to appointments page
    navigate('/patient/appointments');
  };
  
  // Disable past dates in the calendar
  const disabledDays = { before: new Date() };
  
  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-primary hover:text-primary-dark mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to doctors
      </button>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-1">
            Schedule a consultation with Dr. {doctor.firstName} {doctor.lastName}
          </p>
        </div>
        
        <div className="p-6">
          {/* Doctor info */}
          <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
            <img 
              src={doctor.profileImage} 
              alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-primary">{doctor.specialty}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>${doctor.consultationFee} per consultation</span>
              </div>
            </div>
          </div>
          
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 1 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Select Date & Time
                </div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                step > 1 ? 'bg-primary' : 'bg-gray-200'
              }`} />
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > 2 ? <Check className="h-5 w-5" /> : 2}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 2 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Appointment Details
                </div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${
                step > 2 ? 'bg-primary' : 'bg-gray-200'
              }`} />
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step === 3 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Payment
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 1: Date and Time Selection */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Select Date
                </h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <DayPicker 
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="mx-auto"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Select Time
                </h3>
                {selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            className={`py-2 px-2 text-sm text-center rounded-lg transition-colors ${
                              selectedSlot === slot
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleSlotSelect(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-gray-600">
                        No available slots for {format(selectedDate, 'EEEE, MMMM do, yyyy')}.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Please select another date.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-gray-600">
                      Please select a date to see available time slots.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">
                Appointment Details
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Date & Time
                </h4>
                <div className="flex items-center text-gray-800">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span>{selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : ''}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>{selectedSlot}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Consultation Type
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`flex items-center justify-center p-4 border rounded-lg ${
                      appointmentType === 'video' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                    onClick={() => handleAppointmentTypeChange('video')}
                  >
                    <Video className={`h-5 w-5 mr-2 ${
                      appointmentType === 'video' ? 'text-primary' : 'text-gray-500'
                    }`} />
                    <span>Video Consultation</span>
                  </button>
                  <button
                    className={`flex items-center justify-center p-4 border rounded-lg ${
                      appointmentType === 'chat' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                    onClick={() => handleAppointmentTypeChange('chat')}
                  >
                    <MessageSquare className={`h-5 w-5 mr-2 ${
                      appointmentType === 'chat' ? 'text-primary' : 'text-gray-500'
                    }`} />
                    <span>Chat Consultation</span>
                  </button>
                </div>
              </div>
              
              <div>
                <Input
                  label="Please describe your symptoms or reason for visit"
                  as="textarea"
                  rows={4}
                  placeholder="E.g., I've been experiencing chest pain and shortness of breath for the past week..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  helperText="This information will be shared with the doctor to prepare for your consultation."
                />
              </div>
            </div>
          )}
          
          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">
                Payment Details
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Appointment Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="text-gray-900 font-medium">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialty:</span>
                    <span className="text-gray-900">{doctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="text-gray-900">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Type:</span>
                    <span className="text-gray-900 capitalize">{appointmentType}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total Amount:</span>
                  <span className="text-primary">{formatCurrency(doctor.consultationFee)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Payment Method
                </h4>
                
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-10 w-10 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">Credit or Debit Card</h4>
                      <p className="text-xs text-gray-500">
                        Safe and secure payment processing
                      </p>
                      
                      <div className="mt-4 grid gap-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          type="text"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry Date"
                            placeholder="MM/YY"
                            type="text"
                          />
                          <Input
                            label="CVV"
                            placeholder="123"
                            type="text"
                          />
                        </div>
                        
                        <Input
                          label="Cardholder Name"
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="save-card"
                    name="save-card"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                    Save card for future appointments
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {step < 3 ? (
              <Button
                onClick={handleNextStep}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleBookAppointment}
              >
                Confirm & Pay
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;