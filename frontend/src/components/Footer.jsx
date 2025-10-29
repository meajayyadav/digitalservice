import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="main-footer" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold">DigiServices</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transforming businesses through innovative digital solutions. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" data-testid="footer-social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" data-testid="footer-social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" data-testid="footer-social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" data-testid="footer-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-about">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-services">Services</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-pricing">Pricing</Link></li>
              <li><Link to="/portfolio" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-portfolio">Portfolio</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-slate-400 text-sm">Web Development</li>
              <li className="text-slate-400 text-sm">Mobile App Development</li>
              <li className="text-slate-400 text-sm">Graphic Design</li>
              <li className="text-slate-400 text-sm">Social Media Setup</li>
              <li className="text-slate-400 text-sm">Google SEO</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Digital Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@digiservices.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} DigiServices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;