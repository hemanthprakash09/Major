import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🦁</span>
            <span className="font-display text-xl font-bold text-primary">WildLife Zoo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/animals" className="text-foreground hover:text-primary transition-colors font-medium">
              Animals
            </Link>
            <Link to="/tickets" className="text-foreground hover:text-primary transition-colors font-medium">
              Book Tickets
            </Link>
            {user && (
              <Link to="/my-bookings" className="text-foreground hover:text-primary transition-colors font-medium">
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link to="/" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/animals" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>
                Animals
              </Link>
              <Link to="/tickets" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>
                Book Tickets
              </Link>
              {user && (
                <Link to="/my-bookings" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  My Bookings
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="px-4 py-2 hover:bg-muted rounded-lg flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
              <div className="border-t border-border pt-3 mt-2 px-4">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">Logged in as {user.name}</span>
                    <Button variant="outline" size="sm" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="hero" className="w-full">Login / Sign Up</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
