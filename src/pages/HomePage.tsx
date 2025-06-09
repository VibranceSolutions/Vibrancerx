import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Brain,
  Eye,
  Stethoscope
} from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls with your healthcare providers from anywhere.',
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your medical data is protected with enterprise-grade security.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare when you need it, day or night.',
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with board-certified physicians across all specialties.',
    },
  ];

  const specialties = [
    { icon: Heart, name: 'Cardiology', doctors: 45 },
    { icon: Brain, name: 'Neurology', doctors: 32 },
    { icon: Eye, name: 'Ophthalmology', doctors: 28 },
    { icon: Stethoscope, name: 'General Medicine', doctors: 67 },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'MediConnect made it so easy to get the care I needed without leaving home. The doctors are professional and caring.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'The platform is intuitive and secure. I can provide quality care to my patients remotely with confidence.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    {
      name: 'Emma Wilson',
      role: 'Patient',
      content: 'Quick, convenient, and professional. I got my prescription renewed in minutes instead of waiting weeks for an appointment.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Healthcare at Your
                <span className="block text-accent"> Fingertips</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                Connect with licensed doctors instantly through secure video consultations. 
                Get the care you need, when you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-white/80">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50k+</div>
                  <div className="text-white/80">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-white/80">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Doctor consultation" 
                  className="rounded-xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Live consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare reimagined with our cutting-edge telemedicine platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600">
              Access specialists across all major medical fields
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <specialty.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {specialty.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {specialty.doctors} doctors available
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg">
                Browse All Specialties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Doctor</h3>
              <p className="text-gray-600">
                Browse our network of licensed physicians and select the specialist that's right for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
              <p className="text-gray-600">
                Schedule your consultation at a time that works for you, often with same-day availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Consultation</h3>
              <p className="text-gray-600">
                Connect with your doctor via secure video call and receive personalized care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of patients and healthcare providers
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
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of patients who have already discovered the convenience of telemedicine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;