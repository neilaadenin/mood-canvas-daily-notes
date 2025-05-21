
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser, setSession } = useAuth(); // Mengambil setUser dan setSession

  const handleAuthAction = async (action: 'login' | 'signup') => {
    setLoading(true);
    let error: AuthError | null = null;
    let sessionData = null;

    if (action === 'login') {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      error = signInError;
      sessionData = data.session;
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      error = signUpError;
      sessionData = data.session;
      if (!signUpError && data.user) { // Cek apakah ada user data, khususnya jika email confirmation diperlukan
        toast({
          title: "Pendaftaran Berhasil!",
          description: data.user.identities && data.user.identities.length > 0 ? "Silakan cek email Anda untuk verifikasi." : "Anda akan diarahkan ke dashboard.",
          className: "bg-green-500 text-white"
        });
      }
    }
    
    setLoading(false);

    if (error) {
      toast({
        title: `Error ${action === 'login' ? 'Login' : 'Sign Up'}`,
        description: error.message,
        variant: "destructive"
      });
    } else {
      if (sessionData) {
        setSession(sessionData);
        setUser(sessionData.user);
      }
      if (action === 'login') {
        toast({
          title: "Login Berhasil!",
          description: "Anda akan diarahkan ke dashboard.",
          className: "bg-blue-500 text-white"
        });
      }
      navigate('/dashboard'); // Arahkan ke Dashboard setelah login/signup berhasil
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl bg-white animate-scale-in">
        <CardHeader className="text-center">
          <Link to="/" className="inline-block mb-4"> {/* Link kembali ke LandingPage */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 hover:text-pink-500 transition-colors"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 15l-3-3 3-3"></path><path d="M9 12h6"></path></svg>
            <span className="sr-only">Kembali ke Beranda</span>
          </Link>
          <CardTitle className="text-3xl font-bold text-purple-700">Selamat Datang!</CardTitle>
          <CardDescription className="text-gray-600">Masuk atau daftar untuk mencatat mood harianmu.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleAuthAction('login'); }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 transform hover:scale-105 transition-all duration-200" disabled={loading}>
                {loading ? 'Memproses...' : 'Login'}
              </Button>
              <Button type="button" onClick={() => handleAuthAction('signup')} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 transform hover:scale-105 transition-all duration-200" disabled={loading}>
                {loading ? 'Memproses...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 mt-4">
          <p className="text-sm text-gray-600">
            Perlu kembali ke halaman utama?{' '}
            <Link to="/" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
              Klik di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
