
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to handle hash scrolling even when on different pages
  const handleHashLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', hash: '#about' },
    { name: 'Specialties', hash: '#specialties' },
    { name: 'Experience', hash: '#experience' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-xl md:text-2xl font-serif font-bold ${scrolled ? 'text-darkGreen' : 'text-gray-900'}`}>
              Coaching and Consulting By Lene
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-darkGreen ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to="/"
                  onClick={(e) => handleHashLink(e, link.hash!)}
                  className={`text-sm font-medium transition-colors hover:text-darkGreen ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              to="/book"
              className="bg-darkGreen text-white px-6 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-darkGreen hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to="/"
                  onClick={(e) => handleHashLink(e, link.hash!)}
                  className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-darkGreen hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              to="/book"
              className="block w-full text-center bg-darkGreen text-white px-6 py-4 rounded-md text-base font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;