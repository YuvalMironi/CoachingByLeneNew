
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleHashLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (window.location.hash.includes('/book')) {
      navigate('/');
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-darkGreen">Coaching and Consulting By Lene</h3>
            <p className="text-gray-600 max-w-xs text-sm leading-relaxed">
              Empowering leaders and professionals to navigate transitions and unlock their full potential through values-based, systemic coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-darkGreen transition-colors">Home</Link></li>
              <li><Link to="/" onClick={(e) => handleHashLink(e, '#about')} className="hover:text-darkGreen transition-colors">About</Link></li>
              <li><Link to="/" onClick={(e) => handleHashLink(e, '#specialties')} className="hover:text-darkGreen transition-colors">Specialties</Link></li>
              <li><Link to="/book" className="hover:text-darkGreen transition-colors font-medium">Book a Session</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Connect</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <Linkedin size={18} className="text-darkGreen" />
                <a href="https://www.linkedin.com/in/lene-vindelev-d-nielsen-42990a5/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-darkGreen" />
                <span>Denmark / Virtual</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-darkGreen" />
                <span>lene@coachingbylene.dk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Coaching and Consulting By Lene. All rights reserved. EMCC Credentialed Coach.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;