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
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Phone
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const PatientLandingPage: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Find a Doctor',
      description: 'Browse our network of qualified healthcare professionals',
      icon: Users,
      href: '/patient/find-doctors',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      title: 'Book Appointment',
      description: 'Schedule a consultation at your convenience',
      icon: Calendar,
      href: '/patient/find-doctors',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      title: 'My Appointments',
      description: 'View and manage your upcoming appointments',
      icon: Clock,
      href: '/patient/appointments',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      title: 'Messages',
      description: 'Communicate securely with your healthcare providers',
      icon: MessageSquare,
      href: '/patient/messages',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
  ];

  const features = [
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: 'High-quality video calls with your doctors from anywhere',
    },
    {
      icon: Shield,
      title: 'HIPAA Secure',
      description: 'Your medical data is protected with enterprise-grade security',
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Get healthcare when you need it, any time of day',
    },
    {
      icon: FileText,
      title: 'Digital Records',
      description: 'Access your medical history and prescriptions online',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'MediConnect made it so easy to get care without leaving home. Highly recommend!',
      rating: 5,
    },
    {
      name: 'John D.',
      text: 'Quick, professional, and convenient. Got my prescription renewed in minutes.',
      rating: 5,
    },
    {
      name: 'Maria L.',
      text: 'The doctors are caring and thorough. Great telemedicine experience.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Welcome to MediConnect, {user?.firstName}!
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {' '}Our Priority
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access quality healthcare from the comfort of your home. Connect with licensed 
              doctors, manage appointments, and take control of your health journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/patient/find-doctors">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Doctor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/patient/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What would you like to do today?
            </h2>
            <p className="text-lg text-gray-600">
              Quick access to your most important healthcare tasks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${action.color} ${action.hoverColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  Get started
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-lg text-gray-600">
              Experience healthcare reimagined with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied patients who trust MediConnect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 rounded-2xl p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <Phone className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Medical Emergency?
            </h2>
            <p className="text-red-100 mb-6">
              For life-threatening emergencies, call 911 immediately or go to your nearest emergency room.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white text-red-600 border-white hover:bg-red-50"
              >
                Call 911
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-red-600"
              >
                Find Emergency Room
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your first consultation today and experience the future of healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/patient/find-doctors">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/patient/dashboard">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientLandingPage;