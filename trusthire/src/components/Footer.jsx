import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    </footer>
  );
};

export default Footer;
