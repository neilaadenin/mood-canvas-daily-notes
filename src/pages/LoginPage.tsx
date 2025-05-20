
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useToast } from '@/hooks/use-toast'; // Corrected import path

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { toast } = useToast();

  // Placeholder for actual login logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', email, password);
    // Here you would typically call your auth service
    // For now, we'll simulate a successful login and navigate to home
    toast({
      title: "Login Berhasil (Simulasi)",
      description: "Anda akan diarahkan ke halaman utama.",
      className: "bg-blue-500 text-white"
    });
    navigate('/'); // Navigate to HomePage (which is at '/')
  };

  // Placeholder for actual sign up navigation or modal
  const handleSignUp = () => {
    console.log('Sign Up clicked');
    toast({
      title: "Fitur Sign Up",
      description: "Fungsionalitas Sign Up akan diimplementasikan setelah integrasi Supabase.",
      variant: "default"
    });
    // Navigate to a sign-up page or open a modal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-700">Selamat Datang!</CardTitle>
          <CardDescription className="text-gray-600">Masuk untuk mencatat mood harianmu.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
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
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <Button variant="link" onClick={handleSignUp} className="text-purple-600 hover:text-purple-800 p-0 h-auto">
              Sign Up di sini
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

