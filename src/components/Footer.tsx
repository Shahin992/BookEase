import { Link } from "react-router-dom";
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-white">BookEase</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted platform for booking resorts, vehicles, and conference halls. 
              Experience seamless reservations with competitive pricing and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@bookease.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>123 Booking Street, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © 2025 Online Reservation & Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
