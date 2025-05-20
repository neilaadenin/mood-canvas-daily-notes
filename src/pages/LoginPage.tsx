
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client'; // Import supabase client
import { AuthError } from '@supabase/supabase-js';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthAction = async (action: 'login' | 'signup') => {
    setLoading(true);
    let error: AuthError | null = null;

    if (action === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      error = signInError;
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      error = signUpError;
      if (!signUpError) {
        toast({
          title: "Pendaftaran Berhasil!",
          description: "Silakan cek email Anda untuk verifikasi (jika diaktifkan). Anda akan diarahkan ke halaman utama.",
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
      if (action === 'login') {
        toast({
          title: "Login Berhasil!",
          description: "Anda akan diarahkan ke halaman utama.",
          className: "bg-blue-500 text-white"
        });
      }
      navigate('/'); // Arahkan ke Dashboard setelah login/signup berhasil
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl bg-white animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-700">Selamat Datang!</CardTitle>
          <CardDescription className="text-gray-600">Masuk untuk mencatat mood harianmu.</CardDescription>
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
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 transform hover:scale-105 transition-all duration-200" disabled={loading}>
              {loading ? 'Memproses...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <Button variant="link" onClick={() => handleAuthAction('signup')} className="text-purple-600 hover:text-purple-800 p-0 h-auto transition-colors" disabled={loading}>
              {loading ? 'Memproses...' : 'Sign Up di sini'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
