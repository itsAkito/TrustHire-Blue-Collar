import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import { workerService } from '../services/api';
import { Search, MapPin, Briefcase, DollarSign, Clock, Star } from 'lucide-react';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showInfo } = useAlert();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });
  const [featuredWorkers] = useState([
    {
      id: 1,
      name: 'Raj Kumar',
      profilePhoto: '/Gemini_Generated_Image_6zccc26zccc26zcc.png',
      skills: ['Electrical', 'Wiring', 'Installation'],
      reviews: 0,
      experience: 8,
      bio: 'Expert electrical technician with 8+ years experience',
    },
    {
      id: 2,
      name: 'Priya Singh',
      profilePhoto: '/Gemini_Generated_Image_e670sre670sre670.png',
      skills: ['Plumbing', 'Repairs', 'Installation'],
      reviews: 0,
      experience: 6,
      bio: 'Certified plumber with 6 years of professional experience',
    },
    {
      id: 3,
      name: 'Amit Patel',
      profilePhoto: '/Gemini_Generated_Image_jiy1wsjiy1wsjiy1.png',
      skills: ['Carpentry', 'Woodwork', 'Furniture'],
      reviews: 0,
      experience: 10,
      bio: 'Master carpenter specializing in custom furniture & renovations',
    },
    {
      id: 4,
      name: 'Sneha Sharma',
      profilePhoto: '/Gemini_Generated_Image_lwamuelwamuelwam.png',
      skills: ['Painting', 'Interior Design', 'Decorating'],
      reviews: 0,
      experience: 5,
      bio: 'Professional painter with expertise in modern interior design',
    },
  ]);

  useEffect(() => {
    if (user?.role === 'worker') {
      fetchJobs();
    }
  }, [searchTerm, filters, user]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await workerService.getAvailableJobs({
        search: searchTerm,
        ...filters,
      });
      setJobs(response.data || []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      showError('Failed to load jobs', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyJob = async (jobId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await workerService.applyForJob(jobId);
      showInfo('Successfully applied for the job!', 'Application Sent');
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to apply for job', 'Application Failed');
    }
  };

  return (
    <>
      <div className="goth-body min-h-screen ">
        {/* Navigation */}
        {/* <nav className="goth-nav">
          <div className="goth-nav-content">
            <div className="flex items-center gap-12">
              <div className="goth-logo cursor-pointer" onClick={() => navigate('/')}>TRUSTHIRE</div>
              <div className="goth-nav-links hidden md:flex">
                <a href="#portfolio">Portfolio</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <button className="goth-contact-btn">Contact Us</button>
          </div>
        </nav> */}

        {/* Hero Section */}
        <section className="goth-hero">
          <div className="goth-hero-container">
            {/* Left Side Image Grid */}
            <div className="goth-left-images">
              <img src="/Gemini_Generated_Image_e670sre670sre670.png" alt="Detail 1" className="goth-left-img-1 hover:scale-105 transition-transform duration-500" />
              <img src="/Gemini_Generated_Image_jiy1wsjiy1wsjiy1.png" alt="Detail 2" className="goth-left-img-2 hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Left Title */}
            <h1 className="goth-title-primary-left">TRUST</h1>

            {/* Center Image - Main Focus */}
            {/* <div className="goth-center-image-wrapper">
              <img src="/Miximage.png" alt="Professional" className="goth-center-image hover:scale-105 transition-transform duration-500 cursor-pointer w-90 h-96" />
            </div> */}

            {/* Right Title */}
            <h1 className="goth-title-primary-right">HIRE</h1>

            {/* Right Side Images */}
            <div className="goth-right-images">
              <img src="/Gemini_Generated_Image_jiy1wsjiy1wsjiy1.png" alt="Detail 3" className="goth-right-img-1 hover:scale-105 transition-transform duration-500" />
              <img src="/Gemini_Generated_Image_e670sre670sre670.png" alt="Detail 4" className="goth-right-img-2 hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Tagline */}
            <div className="goth-tagline">
              <p>WORKFORCE SOLUTIONS FOR BLUE-COLLAR PROFESSIONALS, EMPLOYERS, AND ENTERPRISES.</p>
            </div>

            {/* CTA Buttons */}
            <div className="goth-cta-buttons">
              <button onClick={() => navigate('/worker-signup')} className="goth-btn goth-btn-outline">Get Started</button>
              <button onClick={() => navigate('/employer-signup')} className="goth-btn goth-btn-filled">Post Job</button>
            </div>
          </div>
        </section>

        {/* Search and Filter Section - Only for Workers */}
        {user?.role === 'worker' && (
          <section className="goth-search-section">
            <div className="goth-search-container">
              <div className="goth-search-row">
                <div className="relative">
                  <Search className="absolute left-4 top-3 h-5 w-5 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="goth-search-input pl-12"
                  />
                </div>
              </div>

              <div className="goth-search-row two-col">
                <div>
                  <label className="block text-sm mb-2 text-gray-400">Job Type</label>
                  <select
                    name="jobType"
                    value={filters.jobType}
                    onChange={handleFilterChange}
                    className="goth-select"
                  >
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-400">Location</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-3 h-5 w-5 text-gray-600" />
                    <input
                      type="text"
                      name="location"
                      placeholder="City or region"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="goth-search-input pr-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Jobs Grid Section - Only for Workers */}
        {user?.role === 'worker' && (
          <section className="goth-section">
            <div className="goth-section-container">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block text-2xl">Loading...</div>
                </div>
              ) : jobs.length > 0 ? (
                <div className="goth-grid">
                  {jobs.map((job) => (
                    <div key={job.id} className="goth-card">
                      <h3 className="goth-card-title">{job.title}</h3>
                      <p className="goth-card-text">{job.employer?.name || 'Company'}</p>
                      <div className="goth-card-meta">
                        <span>📍 {job.location || 'Remote'}</span>
                        <span>💼 {job.jobType || 'Full-time'}</span>
                      </div>
                      {job.salary && <p className="goth-card-text">💰 ${Number(job.salary).toLocaleString()}/mo</p>}
                      <button onClick={() => handleApplyJob(job.id)} className="goth-card-button">Apply Now</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl text-gray-400">No opportunities found</h3>
                  <button onClick={() => { setSearchTerm(''); setFilters({ jobType: '', location: '' }); }} className="goth-cta-button mt-4">Clear Filters</button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Featured Workers Section - Only for Non-authenticated Users */}
        {!user && (
          <section className="goth-section">
            <div className="goth-section-container">
              <h2 className="goth-section-title">Featured Professionals</h2>
              <p className="goth-section-subtitle">Connect with highly-rated, verified workers</p>

              <div className="goth-grid">
                {featuredWorkers.map((worker) => (
                  <div key={worker.id} className="goth-card">
                    <img src={worker.profilePhoto} alt={worker.name} className="goth-card-image" />
                    <h3 className="goth-card-title">{worker.name}</h3>
                    <p className="goth-card-text">{worker.bio}</p>
                    <div className="goth-card-meta">
                      <span>📊 {worker.reviews} reviews</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{worker.experience} years experience</p>
                    <button onClick={() => navigate('/login')} className="goth-card-button">View Profile</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section - Only for Non-authenticated Users */}
        {!user && (
          <section className="goth-section">
            <div className="goth-section-container">
              <h2 className="goth-section-title text-center mb-16">Why Choose TrustHire?</h2>
              <div className="goth-grid">
                <div className="goth-card">
                  <h3 className="goth-card-title text-center">Verified Professionals</h3>
                  <p className="goth-card-text text-center">Work with trusted and verified blue-collar professionals</p>
                </div>
                <div className="goth-card">
                  <h3 className="goth-card-title text-center">Fair Compensation</h3>
                  <p className="goth-card-text text-center">Competitive rates and transparent payment terms for all</p>
                </div>
                <div className="goth-card">
                  <h3 className="goth-card-title text-center">Career Growth</h3>
                  <p className="goth-card-text text-center">Build your professional profile and grow your network</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Only for Non-authenticated Users */}
        {!user && (
          <section className="goth-section">
            <div className="goth-section-container text-center">
              <h2 className="goth-section-title">Ready to Get Started?</h2>
              <p className="goth-section-subtitle mb-8">Join thousands of skilled professionals on TrustHire</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => navigate('/worker-signup')} className="goth-cta-button primary">Sign Up as Worker</button>
                <button onClick={() => navigate('/employer-signup')} className="goth-cta-button">Post a Job</button>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;