import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { employerService } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    requirements: '',
  });
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, jobsResponse] = await Promise.all([
          employerService.getDashboardStats(),
          employerService.getJobs(),
        ]);
        setDashboard(statsResponse.data);
        setJobs(jobsResponse.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'employer') {
      fetchDashboardData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await employerService.createJob(newJob);
      setJobs((prev) => [...prev, response.data]);
      setNewJob({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        requirements: '',
      });
      setIsCreatingJob(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await employerService.deleteJob(jobId);
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      } catch (err) {
        setError('Failed to delete job');
      }
    }
  };

  if (loading && !dashboard) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary mb-2">Employer Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome, {user?.name}</p>
      </div>

      {error && <div className="error-message mb-6">{error}</div>}

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-primary'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'jobs'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-primary'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'applications'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-primary'
          }`}
        >
          Applications
        </button>
      </div>

      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && dashboard && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Jobs">
              <div className="text-4xl font-bold text-primary mb-2">{dashboard.totalJobs}</div>
              <p className="text-gray-600">Posted jobs</p>
            </Card>

            <Card title="Active Jobs">
              <div className="text-4xl font-bold text-success mb-2">{dashboard.activeJobs}</div>
              <p className="text-gray-600">Currently open</p>
            </Card>

            <Card title="Total Applications">
              <div className="text-4xl font-bold text-warning mb-2">{dashboard.totalApplications}</div>
              <p className="text-gray-600">All time</p>
            </Card>

            <Card title="Workers Hired">
              <div className="text-4xl font-bold text-blue-500 mb-2">{dashboard.workersHired}</div>
              <p className="text-gray-600">Total</p>
            </Card>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-secondary">My Jobs</h2>
              <Button
                variant="primary"
                onClick={() => setIsCreatingJob(!isCreatingJob)}
              >
                {isCreatingJob ? 'Cancel' : '+ Create New Job'}
              </Button>
            </div>

            {isCreatingJob && (
              <Card title="Create New Job">
                <form onSubmit={handleCreateJob} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block font-semibold text-secondary">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Plumber, Electrician"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-semibold text-secondary">Job Type</label>
                      <select
                        name="jobType"
                        value={newJob.jobType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-semibold text-secondary">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={newJob.location}
                        onChange={handleInputChange}
                        placeholder="Job location"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-secondary">Salary</label>
                    <input
                      type="text"
                      name="salary"
                      value={newJob.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., $50,000 - $80,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-secondary">Description</label>
                    <textarea
                      name="description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      placeholder="Describe the job responsibilities and details"
                      rows="5"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-secondary">Requirements</label>
                    <textarea
                      name="requirements"
                      value={newJob.requirements}
                      onChange={handleInputChange}
                      placeholder="List required skills and qualifications"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="success"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Job'}
                  </Button>
                </form>
              </Card>
            )}

            <div className="grid gap-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Card
                    key={job._id}
                    title={job.title}
                    description={job.location}
                  >
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Type:</span>
                        <span className="text-gray-600">{job.jobType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Salary:</span>
                        <span className="text-gray-600">{job.salary || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Applications:</span>
                        <span className="text-gray-600 font-bold">{job.applicationsCount || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="secondary" size="small" className="flex-1">
                        View Applications
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeleteJob(job._id)}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-center text-gray-600">No jobs posted yet. Create your first job!</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-secondary">Job Applications</h2>
            <Card>
              <p className="text-center text-gray-600 py-12">Application management coming soon...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
