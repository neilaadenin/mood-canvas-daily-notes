
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Save, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth(); // Gunakan useAuth
  const [name, setName] = useState(user?.user_metadata?.full_name || ''); // Ambil nama jika ada
  const { toast } = useToast();
  const navigate = useNavigate();

  const userEmail = user?.email || "Memuat email...";

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini Anda bisa menambahkan logika untuk menyimpan nama ke Supabase user_metadata
    // Contoh: await supabase.auth.updateUser({ data: { full_name: name } })
    console.log('Saving profile changes:', { name });
    toast({
      title: "Profil Disimpan (Simulasi)",
      description: "Perubahan profil Anda telah disimpan.",
      className: "bg-green-500 text-white"
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar.",
    });
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex justify-center items-center animate-fade-in animation-delay-200">
        <Card className="w-full max-w-lg shadow-xl bg-white animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto bg-pink-200 rounded-full p-4 w-24 h-24 flex items-center justify-center mb-4">
              <User size={48} className="text-pink-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-pink-700">Profil Pengguna</CardTitle>
            <CardDescription className="text-gray-600">Kelola informasi akun Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex items-center">
                  <Mail size={16} className="mr-2 text-pink-500" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  readOnly
                  className="border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-pink-500" /> Nama (Opsional)
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3">
                <Save size={18} className="mr-2" /> Simpan Perubahan
              </Button>
            </form>
            <Button onClick={handleLogout} variant="outline" className="w-full mt-4 border-pink-500 text-pink-600 hover:bg-pink-50 hover:text-pink-700">
              <LogOut size={18} className="mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
