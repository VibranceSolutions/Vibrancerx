import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical, Send, Paperclip } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

const mockChats = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    lastMessage: 'Thank you for the prescription, Doctor.',
    time: '10:30 AM',
    unread: 0,
    online: false,
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastAppointment: '2025-06-15',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    age: 35,
    lastMessage: 'I have a question about my medication dosage.',
    time: '9:15 AM',
    unread: 2,
    online: true,
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    lastAppointment: '2025-06-14',
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 52,
    lastMessage: 'When should I schedule my next check-up?',
    time: 'Yesterday',
    unread: 1,
    online: false,
    profileImage: 'https://randomuser.me/api/portraits/men/62.jpg',
    lastAppointment: '2025-06-10',
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'patient',
    text: 'Hello Dr. Johnson, I wanted to follow up about my medication.',
    time: '9:00 AM',
  },
  {
    id: '2',
    sender: 'doctor',
    text: 'Hello! How are you feeling with the current dosage?',
    time: '9:05 AM',
  },
  {
    id: '3',
    sender: 'patient',
    text: 'I\'ve been feeling much better, but I have a question about the timing.',
    time: '9:10 AM',
  },
  {
    id: '4',
    sender: 'patient',
    text: 'Should I take it with food or on an empty stomach?',
    time: '9:11 AM',
  },
  {
    id: '5',
    sender: 'doctor',
    text: 'It\'s best to take it with food to minimize any stomach irritation. Have you experienced any side effects?',
    time: '9:15 AM',
  },
];

const DoctorMessages: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(mockChats[1]); // Start with Emma Wilson (has unread messages)
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      sender: 'doctor' as const,
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Chat list */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Patient Messages</h2>
          <Input
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedChat?.id === chat.id ? 'bg-gray-50 border-l-4 border-l-secondary' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-start">
                <div className="relative">
                  <img
                    src={chat.profileImage}
                    alt={chat.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{chat.age} years old</p>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last visit: {new Date(chat.lastAppointment).toLocaleDateString()}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-secondary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={selectedChat.profileImage}
                    alt={selectedChat.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-medium text-gray-900">
                    {selectedChat.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedChat.age} years old • Last visit: {new Date(selectedChat.lastAppointment).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Phone className="h-4 w-4" />}
                >
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Video className="h-4 w-4" />}
                >
                  Video
                </Button>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm rounded-lg px-4 py-2 ${
                      message.sender === 'doctor'
                        ? 'bg-secondary text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs block text-right mt-1 ${
                        message.sender === 'doctor' ? 'text-white/80' : 'text-gray-500'
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
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="flex items-end space-x-2">
                <button
                  type="button"
                  className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-grow">
                  <textarea
                    className="w-full border-gray-300 rounded-lg focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 resize-none"
                    placeholder="Type your message..."
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
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <MessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No chat selected</h3>
            <p className="text-gray-500">Choose a patient conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorMessages;