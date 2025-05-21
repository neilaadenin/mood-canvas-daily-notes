
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, History, UserCircle, LogOut } from 'lucide-react'; // Mengganti User dengan UserCircle dan Home dengan LayoutDashboard
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase client
import { useToast } from '@/hooks/use-toast'; // Import useToast

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }, // Path diubah ke /dashboard
  { name: 'Riwayat', path: '/history', icon: History },
  { name: 'Profil', path: '/profile', icon: UserCircle }, // Icon diubah
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { setUser, setSession } = useAuth(); // Mengambil setUser dan setSession dari context
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error Logout",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUser(null);
      setSession(null);
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar.",
        className: "bg-green-500 text-white"
      });
      navigate('/login'); // Arahkan ke halaman login setelah logout
    }
  };

  return (
    <nav className="bg-purple-600 p-4 shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-purple-200 transition-colors"> {/* Path diubah ke /dashboard */}
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
          <Button variant="outline" onClick={handleLogout} className="border-purple-300 text-purple-200 hover:bg-purple-700 hover:text-white hover:border-purple-100 transition-all duration-200">
            <LogOut size={18} className="mr-0 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
