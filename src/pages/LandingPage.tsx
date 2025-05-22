
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Smile, FileText, CalendarDays, Palette, Sparkles, TrendingUp } from 'lucide-react';
import DailyMotivation from '@/components/DailyMotivation';

const features = [
  {
    icon: <Smile size={48} className="text-yellow-500" />,
    title: 'Catat Mood Harian',
    description: 'Pilih emoji yang mewakili perasaanmu setiap hari: senang, netral, atau sedih.',
    color: 'bg-yellow-100',
  },
  {
    icon: <FileText size={48} className="text-blue-500" />,
    title: 'Tulis Catatan Pribadi',
    description: 'Tambahkan detail, jurnal singkat, atau apa pun yang ingin kamu ingat tentang harimu.',
    color: 'bg-blue-100',
  },
  {
    icon: <CalendarDays size={48} className="text-green-500" />,
    title: 'Lihat Riwayat Mood',
    description: 'Pantau tren suasana hatimu dari waktu ke waktu dengan tampilan kalender yang mudah.',
    color: 'bg-green-100',
  },
  {
    icon: <TrendingUp size={48} className="text-indigo-500" />,
    title: 'Pahami Pola Perasaanmu',
    description: 'Kenali lebih dalam dirimu dengan melihat pola mood dan catatan harianmu.',
    color: 'bg-indigo-100',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300 text-gray-800 animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Palette size={80} className="mx-auto mb-6 text-purple-600 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-purple-700">
            Selamat Datang di <span className="text-pink-500">Mood</span> Journal!
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-purple-600 max-w-3xl mx-auto">
            Catat perasaanmu, temukan keseimbangan, dan warnai harimu setiap hari dengan aplikasi jurnal mood yang simpel dan menyenangkan.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform duration-200">
              <Link to="/login">Mulai Sekarang</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform duration-200">
              <Link to="/login">Masuk / Daftar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Motivation Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <DailyMotivation />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Sparkles size={40} className="mx-auto mb-2 text-yellow-500" />
            <h2 className="text-4xl font-bold text-purple-700">Fitur Unggulan Kami</h2>
            <p className="text-lg text-purple-500 mt-2">Semua yang kamu butuhkan untuk perjalanan self-care yang lebih baik.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`shadow-xl hover:shadow-2xl transition-shadow duration-300 ${feature.color} transform hover:-translate-y-2`}>
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl font-semibold text-gray-700">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-purple-700">Siap Memulai Perjalanan Moodmu?</h2>
          <p className="text-xl mb-10 text-purple-600 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah menemukan manfaat mencatat mood harian.
          </p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 text-xl transform hover:scale-105 transition-transform duration-200">
            <Link to="/login">Daftar Gratis Sekarang!</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-purple-700 text-purple-100">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
