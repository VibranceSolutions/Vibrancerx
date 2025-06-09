import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  CheckSquare, 
  ChevronRight,
  Shield,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Mock data for admin dashboard
const stats = {
  totalUsers: {
    count: 1248,
    change: 12.5,
    trend: 'up',
  },
  totalDoctors: {
    count: 87,
    change: 8.2,
    trend: 'up',
  },
  totalPatients: {
    count: 1156,
    change: 14.3,
    trend: 'up',
  },
  activeAppointments: {
    count: 342,
    change: 5.7,
    trend: 'up',
  },
  totalRevenue: {
    amount: 45892,
    change: 7.2,
    trend: 'up',
  },
  completionRate: {
    percentage: 93.5,
    change: 1.8,
    trend: 'up',
  },
};

// Mock security alerts
const securityAlerts = [
  {
    id: '1',
    type: 'high',
    message: 'Multiple failed login attempts for user ID #38291',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'medium',
    message: 'Unusual access pattern detected from IP 192.168.1.54',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'low',
    message: 'System update available: HIPAA compliance module v2.3',
    time: '1 day ago',
  },
];

// Recent users
const recentUsers = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    specialty: 'General Medicine',
    status: 'active',
    joinedDate: '2025-06-10',
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    role: 'patient',
    status: 'active',
    joinedDate: '2025-06-12',
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    specialty: 'Cardiology',
    status: 'pending',
    joinedDate: '2025-06-14',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5 sm:px-8">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-1 text-gray-300">
            Here's what's happening with your telemedicine platform today.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">{stats.totalUsers.count}</h3>
                <span className={`ml-2 text-xs font-medium ${
                  stats.totalUsers.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stats.totalUsers.trend === 'up' ? (
                    <ArrowUpRight className="inline h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="inline h-3 w-3" />
                  )}
                  {stats.totalUsers.change}%
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-gray-700" />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-xs text-gray-500">Doctors</p>
              <p className="text-sm font-medium">{stats.totalDoctors.count}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Patients</p>
              <p className="text-sm font-medium">{stats.totalPatients.count}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Staff</p>
              <p className="text-sm font-medium">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Appointments</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">{stats.activeAppointments.count}</h3>
                <span className={`ml-2 text-xs font-medium ${
                  stats.activeAppointments.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stats.activeAppointments.trend === 'up' ? (
                    <ArrowUpRight className="inline h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="inline h-3 w-3" />
                  )}
                  {stats.activeAppointments.change}%
                </span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-xs text-gray-500">Today</p>
              <p className="text-sm font-medium">26</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">This Week</p>
              <p className="text-sm font-medium">148</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Completion Rate</p>
              <p className="text-sm font-medium">{stats.completionRate.percentage}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">${stats.totalRevenue.amount}</h3>
                <span className={`ml-2 text-xs font-medium ${
                  stats.totalRevenue.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stats.totalRevenue.trend === 'up' ? (
                    <ArrowUpRight className="inline h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="inline h-3 w-3" />
                  )}
                  {stats.totalRevenue.change}%
                </span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-xs text-gray-500">This Month</p>
              <p className="text-sm font-medium">$32,154</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Month</p>
              <p className="text-sm font-medium">$29,872</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">YTD</p>
              <p className="text-sm font-medium">$198,320</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
              <Link 
                to="/admin/users" 
                className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <div key={user.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={user.profileImage} 
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'doctor' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'doctor' ? 'Doctor' : 'Patient'}
                          </span>
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status === 'active' ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {user.role === 'doctor' ? user.specialty : 'Patient'} • Joined {new Date(user.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/admin/users/new"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 inline-flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add New User
              </Link>
            </div>
          </div>
        </div>

        {/* Security & Performance column */}
        <div className="space-y-6">
          {/* Security Alerts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gray-700" />
                Security Alerts
              </h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                1 High Priority
              </span>
            </div>
            
            <div className="divide-y divide-gray-200">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className={`mt-0.5 flex-shrink-0 ${
                      alert.type === 'high' 
                        ? 'text-red-500' 
                        : alert.type === 'medium'
                          ? 'text-yellow-500'
                          : 'text-blue-500'
                    }`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/admin/security"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View all security alerts
              </Link>
            </div>
          </div>
          
          {/* System Health */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-gray-700" />
                System Health
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Database Performance</span>
                    <span className="text-sm text-gray-500">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">API Uptime</span>
                    <span className="text-sm text-gray-500">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Storage Usage</span>
                    <span className="text-sm text-gray-500">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Video Server Load</span>
                    <span className="text-sm text-gray-500">48%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/admin/system-health"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View detailed report
              </Link>
            </div>
          </div>
          
          {/* HIPAA Compliance Status */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-gray-700" />
                HIPAA Compliance Status
              </h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="2"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="0"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">100%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm">
                  <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                  <span>Data encryption standards met</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                  <span>Access controls implemented</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                  <span>Audit logging active</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                  <span>Secure communications verified</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/admin/compliance"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View compliance dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;