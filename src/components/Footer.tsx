import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🦁</span>
              <span className="font-display text-xl font-bold">WildLife Zoo</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Experience the wonders of wildlife at India's premier zoological park. Home to over 500 species from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/animals" className="text-primary-foreground/80 hover:text-secondary transition-colors">Animals</Link></li>
              <li><Link to="/tickets" className="text-primary-foreground/80 hover:text-secondary transition-colors">Book Tickets</Link></li>
              <li><Link to="/login" className="text-primary-foreground/80 hover:text-secondary transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">123 Safari Road, Wildlife District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">info@wildlifezoo.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">Mon - Fri: 9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">Sat - Sun: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2024 WildLife Zoo. All rights reserved. | Committed to Conservation</p>
        </div>
      </div>
    </footer>
  );
}
