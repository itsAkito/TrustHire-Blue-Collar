import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGeolocation } from '../hooks/useGeolocation';
import { workerService } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { location, getLocation } = useGeolocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await workerService.getAvailableJobs({
          search: searchTerm,
          ...filters,
        });
        setJobs(response.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm, filters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoading(true);
  };

  const handleGetLocation = () => {
    getLocation();
  };

  const handleApplyJob = async (jobId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await workerService.applyForJob(jobId);
      alert('Successfully applied for the job!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply for job');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      {!user && (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TrustHire</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Connect skilled workers with employers seeking their expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate('/login')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary mb-6">
            {user ? 'Available Jobs' : 'Find Jobs Near You'}
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search jobs by title or skill..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition-all"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition-all"
              />

              {!user && (
                <Button
                  variant="secondary"
                  onClick={handleGetLocation}
                  className="whitespace-nowrap"
                >
                  📍 Use My Location
                </Button>
              )}
            </div>

            {location && (
              <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
                📍 Your location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </div>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16 text-lg text-gray-500">
              Loading jobs...
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <Card
                key={job.id || job._id}
                title={job.title}
                description={job.location}
                className="flex flex-col h-full"
              >
                <div className="flex-1 space-y-2 mb-4">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-700">Type:</span>
                    <span className="text-gray-600">{job.jobType}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-700">Salary:</span>
                    <span className="text-gray-600">{job.salary || 'Negotiable'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-700">Company:</span>
                    <span className="text-gray-600">{job.employer?.name || 'Company'}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">{job.description}</p>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleApplyJob(job.id || job._id)}
                  className="mt-auto"
                >
                  Apply Now
                </Button>
              </Card>
            ))
          ) : (
            <Card className="col-span-full text-center py-12">
              <p className="text-gray-600">
                No jobs found. Try adjusting your search or filters.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Features Section */}
      {!user && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Why Choose TrustHire?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Easy Job Search" className="text-center">
                <p className="text-gray-600">
                  Find jobs that match your skills and location with our advanced search filters.
                </p>
              </Card>
              <Card title="Safe Transactions" className="text-center">
                <p className="text-gray-600">
                  Secure payment and rating system to ensure trust between workers and employers.
                </p>
              </Card>
              <Card title="Real-time Updates" className="text-center">
                <p className="text-gray-600">
                  Get notified instantly about new job opportunities and application updates.
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;


