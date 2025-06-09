import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, User, LogIn } from 'lucide-react';

const RootLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`w-full ${isHomePage ? 'absolute top-0 left-0 z-10' : 'bg-primary shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-white">MediConnect</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-white hover:text-white/80 ${location.pathname === '/' ? 'font-semibold' : ''} transition-colors`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-white hover:text-white/80 ${location.pathname === '/about' ? 'font-semibold' : ''} transition-colors`}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`text-white hover:text-white/80 ${location.pathname === '/services' ? 'font-semibold' : ''} transition-colors`}
              >
                Services
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-white hover:text-white/80"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-white hover:text-white/80 flex items-center"
                  >
                    <LogIn className="h-4 w-4 mr-1" /> Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <User className="h-4 w-4 mr-1" /> Sign Up
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white p-2 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary shadow-lg">
            <Link
              to="/"
              className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            {user ? (
              <>
                <Link
                  to={`/${user.role}/dashboard`}
                  className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-primary-dark block w-full text-left px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;