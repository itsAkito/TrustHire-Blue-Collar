import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, X, BookOpen, Code, Users, Zap, Shield, Smartphone } from 'lucide-react';

const Footer = () => {
  const [showDocs, setShowDocs] = useState(false);
  const [activeDoc, setActiveDoc] = useState('overview');
  const currentYear = new Date().getFullYear();

  const docs = {
    overview: {
      title: 'About TrustHire',
      icon: <BookOpen className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">TrustHire - Blue Collar Workforce Platform</h3>
        <p className="mb-4">TrustHire is a modern platform connecting skilled blue-collar workers with employers who need their services.</p>
        
        <h4 className="text-lg font-semibold mb-2">Mission:</h4>
        <p className="mb-4">Empower blue-collar workers and employers with a seamless, trustworthy platform for job opportunities and workforce management.</p>
        
        <h4 className="text-lg font-semibold mb-2">Features:</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>✓ Independent User & Worker Login Systems</li>
          <li>✓ Job Listings & Management</li>
          <li>✓ Application Tracking</li>
          <li>✓ Worker Profiles & Ratings</li>
          <li>✓ Admin Dashboard</li>
          <li>✓ Real-time Notifications</li>
        </ul>
      `
    },
    features: {
      title: 'Features & Functionality',
      icon: <Zap className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">Platform Features</h3>
        
        <h4 className="text-lg font-semibold mb-2">For Workers:</h4>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Create professional profiles</li>
          <li>Search and apply for jobs</li>
          <li>Track application status</li>
          <li>Build reputation with ratings</li>
          <li>Receive job notifications</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">For Regular Users:</h4>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Post job opportunities</li>
          <li>Browse worker profiles</li>
          <li>Manage applications</li>
          <li>View worker ratings & reviews</li>
          <li>Analytics dashboard</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">For Admins:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>User management</li>
          <li>Job moderation</li>
          <li>System analytics</li>
          <li>Report generation</li>
        </ul>
      `
    },
    gettingStarted: {
      title: 'Getting Started Guide',
      icon: <Smartphone className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">How to Get Started</h3>
        
        <h4 className="text-lg font-semibold mb-2">Step 1: Choose Your Login Type</h4>
        <p className="mb-4">Workers use Worker Login. Regular Users/Employers use User Login. Each system is independent.</p>
        
        <h4 className="text-lg font-semibold mb-2">Step 2: Create Account</h4>
        <p className="mb-4">Sign up with your email and create a strong password.</p>
        
        <h4 className="text-lg font-semibold mb-2">Step 3: Complete Your Profile</h4>
        <p className="mb-4">For Workers: Add skills, experience, and portfolio. For Users: Add company details.</p>
        
        <h4 className="text-lg font-semibold mb-2">Step 4: Start Using</h4>
        <p className="mb-4">Workers can apply to jobs. Regular Users can post jobs and review applications.</p>
        
        <h4 className="text-lg font-semibold mb-2">Step 5: Build Reputation</h4>
        <p>Get rated by employers. Provide quality work to build your profile.</p>
      `
    },
    security: {
      title: 'Security & Privacy',
      icon: <Shield className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">Your Security Matters</h3>
        
        <h4 className="text-lg font-semibold mb-2">Data Protection:</h4>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>✓ End-to-end encrypted credentials</li>
          <li>✓ JWT token-based authentication</li>
          <li>✓ HTTPS secure connections</li>
          <li>✓ Regular security audits</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">Privacy Policy:</h4>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>✓ Your data is never shared with third parties</li>
          <li>✓ Profile visibility controlled by you</li>
          <li>✓ Email communication preferences available</li>
          <li>✓ Right to delete your account anytime</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">Password Safety:</h4>
        <p>Use strong passwords with letters, numbers, and special characters. Never share your password.</p>
      `
    },
    faq: {
      title: 'Frequently Asked Questions',
      icon: <Code className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">Common Questions</h3>
        
        <h4 className="text-lg font-semibold mb-2">Q: Is TrustHire free to use?</h4>
        <p className="mb-4">A: Yes! Worker registration and job applications are free. Premium features available for employers.</p>
        
        <h4 className="text-lg font-semibold mb-2">Q: How do I verify my skills?</h4>
        <p className="mb-4">A: Add certificates and portfolio items to your profile. Employers can view and verify your qualifications.</p>
        
        <h4 className="text-lg font-semibold mb-2">Q: How are payments made?</h4>
        <p className="mb-4">A: Payments are processed through secure payment gateways. Funds are released after job completion and approval.</p>
        
        <h4 className="text-lg font-semibold mb-2">Q: Can I post multiple jobs?</h4>
        <p className="mb-4">A: Yes! Regular Users can post unlimited jobs. Manage all from your dashboard.</p>
        
        <h4 className="text-lg font-semibold mb-2">Q: What if I have a dispute?</h4>
        <p>A: Our support team mediates disputes. Contact support@trusthire.com for assistance.</p>
      `
    },
    contact: {
      title: 'Contact & Support',
      icon: <Users className="w-5 h-5" />,
      content: `
        <h3 className="text-xl font-bold mb-4">Get Help</h3>
        
        <h4 className="text-lg font-semibold mb-2">Contact Information:</h4>
        <ul className="space-y-2 mb-4">
          <li>📧 Email: support@trusthire.com</li>
          <li>📱 Phone: +91 8954904479</li>
          <li>💬 Live Chat: Available 9 AM - 6 PM IST</li>
          <li>🌐 Website: www.trusthire.com</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">Response Time:</h4>
        <p>Email support responds within 24 hours. Urgent issues get priority support.</p>
      `
    }
  };

  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      {/* Contact Info Bar - India Based */}
      <div className="bg-gray-900 border-b border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-500 transition-all cursor-pointer group">
              <div className="p-4 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <Mail className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="text-white font-medium">support@trusthire.com</p>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-500 transition-all cursor-pointer group">
              <div className="p-4 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <Phone className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="text-white font-medium">+91 8954904479</p>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-500 transition-all cursor-pointer group">
              <div className="p-4 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                <MapPin className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-white font-medium">Bareilly, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Ratings Monitoring Section */}
      <div className="bg-gray-950 border-b border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-8">Worker Reviews & Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample Review Card */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">Raj Kumar</p>
                  <p className="text-xs text-gray-400">Electrical Specialist</p>
                </div>
                <span className="text-yellow-500 text-lg">⭐ 4.9</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">"Excellent work quality and professionalism."</p>
              <p className="text-gray-500 text-xs">Reviewed by: <span className="text-gray-300">Suresh Patel</span></p>
              <p className="text-gray-500 text-xs">on Feb 1, 2026</p>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">Priya Singh</p>
                  <p className="text-xs text-gray-400">Plumbing Expert</p>
                </div>
                <span className="text-yellow-500 text-lg">⭐ 4.8</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">"Very reliable and punctual service."</p>
              <p className="text-gray-500 text-xs">Reviewed by: <span className="text-gray-300">Neha Gupta</span></p>
              <p className="text-gray-500 text-xs">on Jan 30, 2026</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">Amit Patel</p>
                  <p className="text-xs text-gray-400">Carpentry Master</p>
                </div>
                <span className="text-yellow-500 text-lg">⭐ 4.7</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">"Skilled craftsmanship and attention to detail."</p>
              <p className="text-gray-500 text-xs">Reviewed by: <span className="text-gray-300">Ravi Kumar</span></p>
              <p className="text-gray-500 text-xs">on Jan 28, 2026</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">Sneha Sharma</p>
                  <p className="text-xs text-gray-400">Interior Designer</p>
                </div>
                <span className="text-yellow-500 text-lg">⭐ 4.9</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">"Creative designs and professional execution."</p>
              <p className="text-gray-500 text-xs">Reviewed by: <span className="text-gray-300\">Priya Sharma</span></p>
              <p className="text-gray-500 text-xs">on Jan 25, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💼</span>
              <h3 className="text-xl font-bold text-white">TrustHire</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Connecting skilled blue-collar professionals with opportunities. Build your career on trust and expertise.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* For Workers */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">For Workers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/worker-signup" className="hover:text-gray-100 transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/employer-signup" className="hover:text-gray-100 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Find Workers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Hiring Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition-colors">
                  Submit Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <p>&copy; {currentYear} TrustHire. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-gray-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              Accessibility
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>🔒 Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⭐ Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Banner */}
      <div className="bg-gray-900 border-t border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-300">
              Ready to get started? <span className="font-semibold text-gray-100">Join TrustHire today</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/worker-signup"
              className="px-4 py-2 text-sm font-semibold bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Sign Up as Worker
            </Link>
            <Link
              to="/employer-signup"
              className="px-4 py-2 text-sm font-semibold border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Documentation Modal */}
      {showDocs && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDocs(false)}
        >
          <div 
            className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">TrustHire Documentation</h2>
              <button 
                onClick={() => setShowDocs(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 border-r border-gray-700 overflow-y-auto bg-gray-950">
                {Object.entries(docs).map(([key, doc]) => (
                  <button
                    key={key}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      activeDoc === key 
                        ? 'bg-gray-700 text-white border-l-2 border-blue-500' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => setActiveDoc(key)}
                  >
                    <span>{doc.icon}</span>
                    <span className="text-sm">{doc.title}</span>
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6 text-gray-300">
                <div className="max-w-2xl prose prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: docs[activeDoc].content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
