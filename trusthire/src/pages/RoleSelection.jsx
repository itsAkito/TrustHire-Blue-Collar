import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'worker',
      title: 'Worker',
      description: 'Looking for jobs? Join as a skilled worker.',
      icon: '👷',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/worker-signup',
      extra: (
        <span className="block text-xs mt-2 text-blue-200">Already registered? <button className="underline" onClick={() => navigate('/login-worker')}>Login</button></span>
      )
    },
    {
      id: 'employer',
      title: 'Employer',
      description: 'Need skilled workers? Post jobs and hire talent.',
      icon: '💼',
      gradient: 'from-purple-500 to-pink-500',
      path: '/login-employer'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage the platform and oversee operations.',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500',
      path: '/login-admin'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to TrustHire</h1>
          <p className="text-xl text-gray-300">Choose your role to get started</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => navigate(role.path)}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${role.gradient} p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="text-6xl">{role.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center">{role.title}</h2>
                    <p className="text-white text-center text-sm mt-3 opacity-90">{role.description}</p>
                  </div>
                  <button className="mt-6 bg-white text-gray-800 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200 w-full">
                    Continue as {role.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
