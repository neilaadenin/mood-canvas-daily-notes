
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, History, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Riwayat', path: '/history', icon: History },
  { name: 'Profil', path: '/profile', icon: User },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  // Placeholder for actual logout logic
  const handleLogout = () => {
    console.log("Logout clicked from Navbar");
    // Navigate to login or clear auth state - to be implemented with Supabase
    // For now, we can just navigate to login page
  };

  return (
    <nav className="bg-purple-600 p-4 shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-purple-200 transition-colors">
          Mood Journal
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className={cn(
                "text-white hover:bg-purple-700 hover:text-purple-100 transition-all duration-200",
                location.pathname === item.path && "bg-purple-700 text-purple-100 font-semibold"
              )}
            >
              <Link to={item.path} className="flex items-center">
                <item.icon size={18} className="mr-0 sm:mr-2" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </Button>
          ))}
          <Link to="/login">
            <Button variant="outline" onClick={handleLogout} className="border-purple-300 text-purple-200 hover:bg-purple-700 hover:text-white hover:border-purple-100 transition-all duration-200">
              <LogOut size={18} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
