import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Phone, Video, Mic, MicOff, VideoOff, MoreVertical, MessageSquare, FileText, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { generateSessionId, logActivity } from '../../lib/utils';
import Button from '../../components/ui/Button';

// Mock data for the selected appointment
const getMockAppointment = (appointmentId: string) => {
  return {
    id: appointmentId,
    doctor: {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      specialty: 'Cardiology',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true,
    },
    date: '2025-06-15',
    startTime: '10:00 AM',
    endTime: '10:30 AM',
    type: 'video' as 'video' | 'chat',
    status: 'scheduled' as 'scheduled' | 'completed' | 'canceled' | 'no-show',
  };
};

// Mock chat messages
const initialMessages = [
  {
    id: '1',
    sender: 'doctor',
    text: 'Hello! How can I help you today?',
    time: '10:01 AM',
  },
  {
    id: '2',
    sender: 'patient',
    text: "Hi Dr. Johnson. I've been experiencing chest pain for the past few days.",
    time: '10:02 AM',
  },
  {
    id: '3',
    sender: 'doctor',
    text: 'I\'m sorry to hear that. Can you describe the pain? Is it sharp, dull, or pressure-like?',
    time: '10:03 AM',
  },
];

const PatientConsultation: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { user } = useAuth();
  
  const appointment = getMockAppointment(appointmentId || '1');
  
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [showHIPAAWarning, setShowHIPAAWarning] = useState(true);
  const [sessionId, setSessionId] = useState('');
  
  // Initialize session ID
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Log session start for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'start_consultation',
        `consultation:${appointment.id}:${newSessionId}`,
        `Patient started a ${appointment.type} consultation with Dr. ${appointment.doctor.lastName}`
      );
    }
    
    return () => {
      // Log session end for HIPAA compliance
      if (user) {
        logActivity(
          user.id,
          'end_consultation',
          `consultation:${appointment.id}:${sessionId}`,
          `Patient ended the ${appointment.type} consultation with Dr. ${appointment.doctor.lastName}`
        );
      }
    };
  }, [user, appointment, sessionId]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    const message = {
      id: Date.now().toString(),
      sender: 'patient' as const,
      text: newMessage,
      time: currentTime,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Log message for HIPAA compliance (in a real app, message content would be encrypted)
    if (user) {
      logActivity(
        user.id,
        'send_message',
        `message:${appointment.id}:${sessionId}`,
        `Patient sent message to Dr. ${appointment.doctor.lastName}`
      );
    }
  };
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };
  
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };
  
  const startCall = () => {
    setIsCallConnected(true);
    
    // Log call start for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'start_video',
        `video:${appointment.id}:${sessionId}`,
        `Patient started a video call with Dr. ${appointment.doctor.lastName}`
      );
    }
  };
  
  const endCall = () => {
    setIsCallConnected(false);
    
    // Log call end for HIPAA compliance
    if (user) {
      logActivity(
        user.id,
        'end_video',
        `video:${appointment.id}:${sessionId}`,
        `Patient ended the video call with Dr. ${appointment.doctor.lastName}`
      );
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* HIPAA Warning Modal */}
      {showHIPAAWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  HIPAA Privacy Notice
                </h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowHIPAAWarning(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-5">
              <p className="text-sm text-gray-500 mb-3">
                This telemedicine session is protected under HIPAA privacy laws. By continuing, you agree to the following:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                <li>All communications are encrypted and secure</li>
                <li>Do not record or share this session without consent</li>
                <li>Ensure you are in a private location</li>
                <li>Medical information shared will be documented in your health record</li>
              </ul>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowHIPAAWarning(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Main content area - Video or chat */}
        <div className="flex-grow flex flex-col">
          {/* Header */}
          <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={appointment.doctor.profileImage}
                alt={`Dr. ${appointment.doctor.lastName}`}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                </h2>
                <p className="text-sm text-primary">{appointment.doctor.specialty}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Video area */}
          {appointment.type === 'video' && (
            <div className="flex-grow bg-gray-900 relative flex flex-col justify-center items-center">
              {isCallConnected ? (
                <div className="relative w-full h-full">
                  {/* Doctor's video (fullscreen) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    {isVideoEnabled ? (
                      <img
                        src={appointment.doctor.profileImage}
                        alt="Doctor video stream"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-semibold text-white">
                          {appointment.doctor.firstName[0]}{appointment.doctor.lastName[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Patient's video (picture-in-picture) */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                    {isVideoEnabled ? (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        {/* This would be the user's video in a real app */}
                        <span className="text-white text-sm">Your camera</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <VideoOff className="h-8 w-8 text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  
                  {/* Call controls */}
                  <div className="absolute left-0 right-0 bottom-4 flex justify-center">
                    <div className="bg-gray-800 bg-opacity-70 rounded-full p-2 flex items-center space-x-3">
                      <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                        } transition-colors`}
                        onClick={toggleAudio}
                      >
                        {isAudioEnabled ? (
                          <Mic className="h-5 w-5 text-white" />
                        ) : (
                          <MicOff className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                        } transition-colors`}
                        onClick={toggleVideo}
                      >
                        {isVideoEnabled ? (
                          <Video className="h-5 w-5 text-white" />
                        ) : (
                          <VideoOff className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <button
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors"
                        onClick={endCall}
                      >
                        <Phone className="h-6 w-6 text-white transform rotate-135" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={appointment.doctor.profileImage}
                      alt={`Dr. ${appointment.doctor.lastName}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                  </h3>
                  <p className="text-blue-300 mb-6">
                    {appointment.doctor.online ? 'Online and ready' : 'Waiting to connect...'}
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={startCall}
                    className="animate-pulse-slow"
                  >
                    Start Video Call
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Chat area */}
          {(appointment.type === 'chat' || !isCallConnected) && (
            <div className="flex-grow flex flex-col bg-gray-50 overflow-hidden">
              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs sm:max-w-sm md:max-w-md rounded-lg px-4 py-2 ${
                          message.sender === 'patient'
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-white shadow-sm border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span 
                          className={`text-xs block text-right mt-1 ${
                            message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto">
                  <div className="flex items-end space-x-2">
                    <div className="flex-grow">
                      <textarea
                        className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 resize-none"
                        placeholder="Type your message here..."
                        rows={2}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - Patient info and consultation details */}
        <div className="hidden md:block w-80 bg-white shadow-md overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Consultation Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Appointment Time</p>
                <p className="text-gray-900 font-medium">
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  {' • '}
                  {appointment.startTime} - {appointment.endTime}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Consultation Type</p>
                <p className="text-gray-900 font-medium capitalize">
                  {appointment.type} Consultation
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Session ID</p>
                <p className="text-gray-900 font-mono text-sm">
                  {sessionId || 'Generating...'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  For reference in case of technical issues
                </p>
              </div>
            </div>
          </div>
          
          {/* Patient symptoms/notes */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Your Symptoms
            </h3>
            <p className="text-sm text-gray-700">
              {/* This would display the symptoms the patient entered when booking */}
              Chest pain and shortness of breath for the past week, especially during physical activity. No prior history of heart problems.
            </p>
          </div>
          
          {/* Actions */}
          <div className="p-4">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <FileText className="h-4 w-4 mr-2" />
                View Medical History
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Emergency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientConsultation;