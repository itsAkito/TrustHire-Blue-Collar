import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'user',
      title: 'Regular User / Employer',
      description: 'Post jobs, manage applications, and find workers.',
      icon: '👔',
      gradient: 'from-blue-500 to-cyan-500',
      loginPath: '/login',
      signupPath: '/signup',
    },
    {
      id: 'worker',
      title: 'Blue Collar Worker',
      description: 'Find jobs, apply to opportunities, and build your career.',
      icon: '👷',
      gradient: 'from-green-500 to-emerald-500',
      loginPath: '/worker-login',
      signupPath: '/worker-signup',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Administrator portal for platform management.',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500',
      loginPath: '/login-admin',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to TrustHire</h1>
          <p className="text-xl text-gray-300">Choose how you want to connect</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group"
            >
              <div className={`bg-gradient-to-br ${role.gradient} p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="text-6xl">{role.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center">{role.title}</h2>
                    <p className="text-white text-center text-sm mt-3 opacity-90">{role.description}</p>
                  </div>
                  {/* Action Buttons */}
                  <div className="w-full space-y-2">
                    {role.signupPath && (
                      <button 
                        onClick={() => navigate(role.signupPath)}
                        className="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition duration-200"
                      >
                        Join
                      </button>
                    )}
                    {role.loginPath && (
                      <button 
                        onClick={() => navigate(role.loginPath)}
                        className={`w-full ${role.signupPath ? 'bg-white bg-opacity-20 text-white' : 'bg-white text-gray-800'} font-semibold py-3 rounded-lg hover:${role.signupPath ? 'bg-opacity-30' : 'bg-gray-100'} transition duration-200`}
                      >
                        {role.signupPath ? 'Already have account? Login' : 'Login'}
                      </button>
                    )}
                  </div>
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
