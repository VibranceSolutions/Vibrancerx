import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  Video,
  Clock,
  Shield,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const DoctorLandingPage: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Today\'s Schedule',
      description: 'View and manage your appointments for today',
      icon: Calendar,
      href: '/doctor/appointments',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      badge: '3 appointments',
    },
    {
      title: 'Patient Messages',
      description: 'Respond to patient inquiries and follow-ups',
      icon: MessageSquare,
      href: '/doctor/messages',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      badge: '5 unread',
    },
    {
      title: 'Patient Records',
      description: 'Access and update patient medical records',
      icon: Users,
      href: '/doctor/patients',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      title: 'Prescriptions',
      description: 'Manage and review patient prescriptions',
      icon: FileText,
      href: '/doctor/prescriptions',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      badge: '2 pending',
    },
  ];

  const stats = [
    {
      icon: Users,
      label: 'Patients Served',
      value: '1,247',
      change: '+12%',
      positive: true,
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: '4.9',
      change: '+0.2',
      positive: true,
    },
    {
      icon: DollarSign,
      label: 'Monthly Revenue',
      value: '$12,450',
      change: '+8%',
      positive: true,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: '< 2 min',
      change: '-15%',
      positive: true,
    },
  ];

  const features = [
    {
      icon: Video,
      title: 'Seamless Video Consultations',
      description: 'High-quality video calls with integrated medical tools',
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant Platform',
      description: 'Secure patient data handling with full compliance',
    },
    {
      icon: FileText,
      title: 'Digital Prescribing',
      description: 'Electronic prescription management and tracking',
    },
    {
      icon: BarChart3,
      title: 'Practice Analytics',
      description: 'Insights into your practice performance and growth',
    },
  ];

  const recentActivity = [
    {
      type: 'appointment',
      message: 'Completed consultation with John Doe',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      type: 'message',
      message: 'New message from Emma Wilson',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      type: 'prescription',
      message: 'Prescription approved for Michael Brown',
      time: '6 hours ago',
      icon: FileText,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
              <Stethoscope className="h-4 w-4 mr-2" />
              Welcome back, Dr. {user?.lastName}!
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {' '}Healthcare Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Deliver exceptional patient care through our advanced telemedicine platform. 
              Manage appointments, consultations, and patient records all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/doctor/appointments">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  View Today's Schedule
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/doctor/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className={`text-xs font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} this month
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Practice Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Quick access to your most important daily tasks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`${action.color} ${action.hoverColor} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  {action.badge && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  Access now
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Tools for Modern Healthcare
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to provide exceptional patient care
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with your latest practice activities
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg">
                  <div className={`${activity.color} mr-4`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">
                      {activity.message}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/doctor/activity" className="text-green-600 hover:text-green-700 font-medium">
                View all activity
                <ArrowRight className="ml-1 h-4 w-4 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Growth */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <Award className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Grow Your Practice with MediConnect
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of healthcare providers who trust our platform to deliver 
            exceptional patient care and grow their practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/doctor/analytics">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                View Analytics
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
              >
                Professional Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorLandingPage;