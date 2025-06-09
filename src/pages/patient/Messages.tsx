import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const mockChats = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    lastMessage: 'Your test results look good. Let\'s discuss them in detail.',
    time: '10:30 AM',
    unread: 2,
    online: true,
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'General Medicine',
    lastMessage: 'How are you feeling today?',
    time: 'Yesterday',
    unread: 0,
    online: false,
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  // Add more mock chats as needed
];

const mockMessages = [
  {
    id: '1',
    sender: 'doctor',
    text: 'Hello! How can I help you today?',
    time: '10:00 AM',
  },
  {
    id: '2',
    sender: 'patient',
    text: 'Hi Dr. Johnson, I wanted to follow up about my medication.',
    time: '10:02 AM',
  },
  {
    id: '3',
    sender: 'doctor',
    text: 'Of course! How are you feeling with the current dosage?',
    time: '10:03 AM',
  },
  // Add more mock messages as needed
];

const PatientMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      sender: 'patient' as const,
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
          <Input
            placeholder="Search messages"
            leftIcon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
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
                  <p className="text-xs text-gray-500">{chat.role}</p>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
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
                  <p className="text-sm text-gray-500">{selectedChat.role}</p>
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
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm rounded-lg px-4 py-2 ${
                      message.sender === 'patient'
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs block text-right mt-1 ${
                        message.sender === 'patient' ? 'text-white/80' : 'text-gray-500'
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
                <div className="flex-grow">
                  <textarea
                    className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 resize-none"
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
            <p className="text-gray-500">Choose a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientMessages;