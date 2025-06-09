import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Stethoscope,
  Brain,
  Eye,
  Activity
} from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '500+', label: 'Licensed Doctors', icon: Users },
    { number: '50,000+', label: 'Patients Served', icon: Heart },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Activity },
    { number: '4.9/5', label: 'Patient Rating', icon: Star },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make is guided by what\'s best for our patients. We prioritize accessibility, quality, and compassionate care in everything we do.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'We maintain the highest standards of data protection and HIPAA compliance, ensuring your medical information is always secure and confidential.',
    },
    {
      icon: Award,
      title: 'Clinical Excellence',
      description: 'Our network includes only board-certified physicians who meet rigorous standards for education, experience, and patient care quality.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Healthcare should be available to everyone, everywhere. We\'re breaking down barriers to make quality medical care accessible to all.',
    },
  ];

  const team = [
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Chief Medical Officer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Board-certified internal medicine physician with 15+ years of experience in telemedicine and healthcare innovation.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Former healthcare technology executive with expertise in HIPAA-compliant systems and medical software development.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Patient Experience',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Healthcare administration specialist focused on improving patient outcomes through technology and compassionate care.',
    },
    {
      name: 'Dr. David Kim',
      role: 'Director of Clinical Operations',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      bio: 'Emergency medicine physician and healthcare quality improvement expert with a passion for accessible care.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'MediConnect was founded with a mission to make healthcare accessible to everyone through technology.',
    },
    {
      year: '2021',
      title: 'HIPAA Certification',
      description: 'Achieved full HIPAA compliance and security certification, ensuring the highest standards of patient data protection.',
    },
    {
      year: '2022',
      title: '10,000 Patients',
      description: 'Reached our first major milestone of serving 10,000 patients across multiple specialties.',
    },
    {
      year: '2023',
      title: 'National Expansion',
      description: 'Expanded our services nationwide, partnering with healthcare providers in all 50 states.',
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered health assessments and symptom checking to enhance patient care.',
    },
    {
      year: '2025',
      title: '50,000+ Patients',
      description: 'Celebrating over 50,000 patients served and maintaining a 4.9/5 patient satisfaction rating.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transforming Healthcare
            <span className="block text-accent">Through Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            We're on a mission to make quality healthcare accessible to everyone, everywhere. 
            Through cutting-edge technology and compassionate care, we're building the future of medicine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At MediConnect, we believe that everyone deserves access to quality healthcare, 
                regardless of their location, schedule, or circumstances. We're leveraging technology 
                to break down traditional barriers and create a more connected, accessible healthcare system.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our platform connects patients with licensed healthcare providers through secure, 
                HIPAA-compliant video consultations, making it easier than ever to receive the care you need, 
                when you need it.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700">HIPAA Compliant & Secure</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700">24/7 Access to Healthcare</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700">Licensed Medical Professionals</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Healthcare professionals using technology" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Patient Satisfaction</div>
                    <div className="text-green-600 font-bold">99.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our patients and healthcare providers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to leading telemedicine platform
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of healthcare professionals, technologists, and innovators 
              is dedicated to transforming healthcare delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Advanced medical technology" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Security</div>
                    <div className="text-blue-600 font-bold">256-bit Encryption</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cutting-Edge Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform is built on enterprise-grade infrastructure with the latest 
                in healthcare technology. We use advanced encryption, AI-powered diagnostics, 
                and seamless integration capabilities to provide the best possible experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Enterprise Security</h4>
                    <p className="text-gray-600">Bank-level encryption and HIPAA compliance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI-Powered Insights</h4>
                    <p className="text-gray-600">Smart symptom assessment and health monitoring</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Monitoring</h4>
                    <p className="text-gray-600">24/7 system monitoring and support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future of Healthcare?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of patients and healthcare providers who trust MediConnect 
            for their telemedicine needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;