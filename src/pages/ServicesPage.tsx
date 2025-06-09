import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  MessageSquare, 
  FileText, 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope,
  Baby,
  Bone,
  Pill,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Phone
} from 'lucide-react';
import Button from '../components/ui/Button';

const ServicesPage: React.FC = () => {
  const consultationTypes = [
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Face-to-face consultations with healthcare providers through secure HD video calls.',
      features: ['HD Video Quality', 'Screen Sharing', 'Recording Available', 'Multi-device Support'],
      price: 'Starting at $75',
      popular: true,
    },
    {
      icon: MessageSquare,
      title: 'Chat Consultations',
      description: 'Text-based consultations for quick questions and follow-up care.',
      features: ['Instant Messaging', 'File Sharing', 'Photo Upload', '24/7 Availability'],
      price: 'Starting at $45',
      popular: false,
    },
    {
      icon: Phone,
      title: 'Phone Consultations',
      description: 'Traditional voice calls for patients who prefer audio-only consultations.',
      features: ['Crystal Clear Audio', 'Call Recording', 'Conference Calls', 'Callback Options'],
      price: 'Starting at $60',
      popular: false,
    },
  ];

  const specialties = [
    {
      icon: Heart,
      name: 'Cardiology',
      description: 'Heart and cardiovascular system care',
      doctors: 45,
      conditions: ['Hypertension', 'Heart Disease', 'Arrhythmia', 'Chest Pain'],
    },
    {
      icon: Brain,
      name: 'Neurology',
      description: 'Brain and nervous system disorders',
      doctors: 32,
      conditions: ['Headaches', 'Migraines', 'Epilepsy', 'Memory Issues'],
    },
    {
      icon: Eye,
      name: 'Ophthalmology',
      description: 'Eye and vision care',
      doctors: 28,
      conditions: ['Vision Problems', 'Eye Infections', 'Glaucoma', 'Dry Eyes'],
    },
    {
      icon: Stethoscope,
      name: 'General Medicine',
      description: 'Primary care and general health',
      doctors: 67,
      conditions: ['Cold & Flu', 'Allergies', 'Diabetes', 'Preventive Care'],
    },
    {
      icon: Baby,
      name: 'Pediatrics',
      description: 'Healthcare for children and adolescents',
      doctors: 38,
      conditions: ['Child Development', 'Vaccinations', 'Growth Issues', 'Behavioral Health'],
    },
    {
      icon: Bone,
      name: 'Orthopedics',
      description: 'Bone, joint, and muscle care',
      doctors: 25,
      conditions: ['Joint Pain', 'Sports Injuries', 'Arthritis', 'Back Pain'],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your medical information is protected with enterprise-grade security and encryption.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare services any time of day, including weekends and holidays.',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Receive and manage prescriptions electronically, sent directly to your pharmacy.',
    },
    {
      icon: Users,
      title: 'Licensed Providers',
      description: 'All our healthcare providers are board-certified and licensed in their specialties.',
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book appointments instantly or schedule for later with our flexible booking system.',
    },
    {
      icon: Pill,
      title: 'Medication Management',
      description: 'Track your medications, set reminders, and manage refills all in one place.',
    },
  ];

  const pricing = [
    {
      name: 'Basic Consultation',
      price: '$75',
      duration: '15-30 minutes',
      features: [
        'Video or chat consultation',
        'Basic health assessment',
        'Treatment recommendations',
        'Digital prescription (if needed)',
        'Follow-up instructions',
      ],
      popular: false,
    },
    {
      name: 'Comprehensive Consultation',
      price: '$125',
      duration: '30-45 minutes',
      features: [
        'Extended video consultation',
        'Detailed health assessment',
        'Comprehensive treatment plan',
        'Digital prescriptions',
        'Lab order recommendations',
        '7-day follow-up included',
      ],
      popular: true,
    },
    {
      name: 'Specialist Consultation',
      price: '$175',
      duration: '45-60 minutes',
      features: [
        'Specialist video consultation',
        'In-depth condition review',
        'Specialized treatment plan',
        'Coordination with primary care',
        'Detailed medical report',
        '14-day follow-up included',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      condition: 'Diabetes Management',
      text: 'MediConnect has made managing my diabetes so much easier. I can check in with my doctor regularly without taking time off work.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    {
      name: 'John D.',
      condition: 'Hypertension',
      text: 'The convenience is unmatched. I got my blood pressure medication adjusted during my lunch break.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      name: 'Maria L.',
      condition: 'Skin Consultation',
      text: 'The dermatologist was able to diagnose my skin condition through video and prescribed treatment immediately.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Comprehensive
            <span className="block text-accent">Healthcare Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            From routine check-ups to specialist consultations, we provide a full range of 
            medical services through our secure telemedicine platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer multiple ways to connect with healthcare providers based on your preferences and needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {consultationTypes.map((type, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 ${
                type.popular ? 'border-primary' : 'border-gray-200'
              } hover:shadow-xl transition-shadow`}>
                {type.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`${type.popular ? 'bg-primary' : 'bg-gray-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <type.icon className={`h-8 w-8 ${type.popular ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="text-2xl font-bold text-primary">{type.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/register">
                  <Button 
                    className={`w-full ${type.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
                    variant={type.popular ? 'primary' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialists across all major medical fields with board-certified physicians 
              ready to provide expert care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <specialty.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{specialty.name}</h3>
                    <p className="text-gray-600 text-sm">{specialty.doctors} doctors available</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{specialty.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Common Conditions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialty.conditions.map((condition, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link to="/register">
                  <Button variant="outline" className="w-full">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with your health and convenience in mind, 
              offering features that make healthcare accessible and efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees, no surprise charges. Choose the consultation type that fits your needs and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg ${
                plan.popular ? 'border-2 border-primary' : 'border border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.duration}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/register">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    Choose Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Insurance coverage may apply. Check with your insurance provider for telemedicine benefits.
            </p>
            <Link to="/insurance" className="text-primary hover:text-primary-dark font-medium">
              Learn about insurance coverage <ArrowRight className="inline h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Patient Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real patients sharing their experiences with MediConnect's healthcare services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.condition}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting healthcare through MediConnect is simple and straightforward
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Account</h3>
              <p className="text-gray-600">
                Sign up and complete your medical profile with basic health information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Doctor</h3>
              <p className="text-gray-600">
                Browse our network of licensed physicians and select the right specialist for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
              <p className="text-gray-600">
                Schedule your consultation at a convenient time, often with same-day availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Care</h3>
              <p className="text-gray-600">
                Connect with your doctor via video, chat, or phone for your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of patients who have already discovered the convenience 
            and quality of MediConnect's healthcare services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Book Your First Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;