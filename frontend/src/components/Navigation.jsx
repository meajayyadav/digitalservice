import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-testid="nav-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Ajay YTS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-cyan-500'
                    : 'text-slate-700 hover:text-cyan-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" data-testid="nav-cta-button">
              <button className="btn-primary">Get Started</button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden py-4 bg-white border-t border-slate-200"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                className={`block py-3 px-4 text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-cyan-500 bg-cyan-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block py-3 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="btn-primary w-full" data-testid="mobile-nav-cta-button">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;