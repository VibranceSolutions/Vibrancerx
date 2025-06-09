import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Shield,
  Settings,
  BarChart3,
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Database,
  Lock,
  Globe,
  Server
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const AdminLandingPage: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage patient and doctor accounts, approvals, and verification',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      badge: '12 pending',
    },
    {
      title: 'System Analytics',
      description: 'Monitor platform performance and user engagement',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      title: 'Security Center',
      description: 'Monitor security alerts and compliance status',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      badge: '2 alerts',
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings and integrations',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  const systemStats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,248',
      subtext: '87 doctors, 1,156 patients',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: Activity,
      label: 'System Uptime',
      value: '99.9%',
      subtext: 'Last 30 days',
      change: '+0.1%',
      positive: true,
    },
    {
      icon: DollarSign,
      label: 'Platform Revenue',
      value: '$45,892',
      subtext: 'This month',
      change: '+7.2%',
      positive: true,
    },
    {
      icon: CheckCircle,
      label: 'HIPAA Compliance',
      value: '100%',
      subtext: 'All checks passed',
      change: 'Compliant',
      positive: true,
    },
  ];

  const recentAlerts = [
    {
      type: 'security',
      severity: 'high',
      message: 'Multiple failed login attempts detected',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      type: 'system',
      severity: 'medium',
      message: 'Database backup completed successfully',
      time: '4 hours ago',
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      type: 'compliance',
      severity: 'low',
      message: 'Monthly HIPAA audit report generated',
      time: '1 day ago',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  const platformFeatures = [
    {
      icon: Lock,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with end-to-end encryption',
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Multi-language support and worldwide availability',
    },
    {
      icon: Server,
      title: 'Scalable Infrastructure',
      description: 'Cloud-based architecture that grows with your needs',
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Live system monitoring and performance analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-800 text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Admin Dashboard - {user?.firstName} {user?.lastName}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Platform
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-blue-600">
                {' '}Command Center
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitor, manage, and optimize your telemedicine platform. Ensure security, 
              compliance, and exceptional user experience across all touchpoints.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800">
                  View Full Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  System Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.subtext}
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
              Administrative Controls
            </h2>
            <p className="text-lg text-gray-600">
              Manage all aspects of your telemedicine platform
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
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  Manage
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              System Alerts & Activity
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed about important system events and security alerts
            </p>
          </div>
          
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className={`${alert.bgColor} rounded-xl p-6 border border-gray-200`}>
                <div className="flex items-start">
                  <div className={`${alert.color} mr-4 mt-1`}>
                    <alert.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 font-medium">
                        {alert.message}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/admin/alerts" className="text-gray-700 hover:text-gray-900 font-medium">
              View all alerts
              <ArrowRight className="ml-1 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Platform Features
            </h2>
            <p className="text-lg text-gray-600">
              Built for scale, security, and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-gray-700" />
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

      {/* HIPAA Compliance Banner */}
      <section className="py-12 bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-2xl p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              HIPAA Compliant & Secure
            </h2>
            <p className="text-green-100 mb-6">
              Your platform maintains the highest standards of healthcare data protection 
              and regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin/compliance">
                <Button 
                  variant="outline" 
                  className="bg-white text-green-600 border-white hover:bg-green-50"
                >
                  View Compliance Report
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                >
                  Security Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Platform Performance Excellence
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Monitor and optimize your telemedicine platform for peak performance 
            and user satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin/analytics">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Performance Dashboard
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
              >
                System Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLandingPage;