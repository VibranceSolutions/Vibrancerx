import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Filter, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Mock data for doctors
const mockDoctors = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialty: 'Cardiology',
    education: 'Harvard Medical School',
    experience: 12,
    rating: 4.9,
    consultationFee: 150,
    availability: [
      { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
      { day: 'Wednesday', slots: ['1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'Friday', slots: ['8:00 AM', '11:00 AM', '4:00 PM'] },
    ],
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating various heart conditions.',
    location: 'Boston, MA',
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    specialty: 'General Medicine',
    education: 'Johns Hopkins University',
    experience: 8,
    rating: 4.7,
    consultationFee: 100,
    availability: [
      { day: 'Tuesday', slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
      { day: 'Thursday', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM', '12:00 PM'] },
    ],
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
    about: 'Dr. Michael Chen specializes in preventive care and chronic disease management, with a focus on holistic patient care.',
    location: 'San Francisco, CA',
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Wilson',
    specialty: 'Dermatology',
    education: 'Stanford University',
    experience: 15,
    rating: 4.8,
    consultationFee: 175,
    availability: [
      { day: 'Monday', slots: ['11:00 AM', '1:00 PM', '3:00 PM'] },
      { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
      { day: 'Thursday', slots: ['12:00 PM', '4:00 PM', '5:00 PM'] },
    ],
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    about: 'Dr. Emma Wilson is a leading dermatologist specializing in medical, cosmetic, and surgical dermatology for all ages.',
    location: 'New York, NY',
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Rodriguez',
    specialty: 'Psychiatry',
    education: 'Yale University',
    experience: 10,
    rating: 4.6,
    consultationFee: 200,
    availability: [
      { day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
      { day: 'Thursday', slots: ['1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    ],
    profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    about: 'Dr. David Rodriguez specializes in anxiety disorders, depression, and PTSD with a focus on cognitive behavioral therapy.',
    location: 'Chicago, IL',
  },
];

// Specialties for filter options
const specialties = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Family Medicine',
  'Gastroenterology',
  'General Medicine',
  'Neurology',
  'Obstetrics & Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Urology',
];

const DoctorDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleSearch = () => {
    let results = mockDoctors;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        doctor => 
          doctor.firstName.toLowerCase().includes(term) || 
          doctor.lastName.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term) ||
          doctor.location.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected specialties
    if (selectedSpecialties.length > 0) {
      results = results.filter(doctor => 
        selectedSpecialties.includes(doctor.specialty)
      );
    }
    
    // Filter by price range
    results = results.filter(
      doctor => 
        doctor.consultationFee >= priceRange[0] && 
        doctor.consultationFee <= priceRange[1]
    );
    
    setFilteredDoctors(results);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialties([]);
    setPriceRange([0, 300]);
    setFilteredDoctors(mockDoctors);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
        <p className="text-gray-600">
          Browse our network of trusted medical professionals and book an appointment
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name, specialty, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              className="px-6"
            >
              Search
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filters
            </Button>
          </div>
        </div>
        
        {/* Expandable filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Specialty</h4>
                <div className="max-h-48 overflow-y-auto grid grid-cols-2 gap-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <input
                        id={`specialty-${specialty}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                      />
                      <label 
                        htmlFor={`specialty-${specialty}`} 
                        className="ml-2 text-sm text-gray-700"
                      >
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Consultation Fee</h4>
                <div className="px-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      Today
                    </button>
                    <button 
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Tomorrow
                    </button>
                    <button 
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      This Week
                    </button>
                    <button 
                      className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Custom
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowFilters(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSearch}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctors
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="availability">Earliest Available</option>
            </select>
          </div>
        </div>
        
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img 
                      src={doctor.profileImage} 
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="h-24 w-24 md:h-32 md:w-32 rounded-lg object-cover"
                    />
                  </div>
                  <div className="md:ml-6 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h2>
                        <p className="text-primary">{doctor.specialty}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-gray-900">{doctor.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300">|</span>
                        <div className="text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {doctor.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <p>{doctor.about.substring(0, 150)}...</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                        {doctor.experience} years experience
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                        ${doctor.consultationFee} per consultation
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Next Available</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availability.slice(0, 2).map((avail, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="text-sm text-gray-700 font-medium">{avail.day}</span>
                            <span className="mx-1">•</span>
                            <span className="text-sm text-gray-600">{avail.slots[0]}</span>
                          </div>
                        ))}
                        <button className="text-sm text-primary font-medium hover:text-primary-dark">
                          + More times
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                  <Button variant="outline">View Profile</Button>
                  <Link to={`/patient/book/${doctor.id}`}>
                    <Button>Book Appointment</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDirectory;