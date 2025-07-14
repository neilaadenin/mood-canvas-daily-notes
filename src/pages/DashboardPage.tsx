
import React, { useState, useEffect } from 'react';
import MoodEntryForm from '@/components/MoodEntryForm';
import MoodList from '@/components/MoodList';
import Navbar from '@/components/Navbar';
import { MoodEntry, RawMoodEntryFromSupabase, Mood } from '@/types';
import type { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase
import { useToast } from '@/hooks/use-toast';

const DashboardPage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (!user || authLoading) return;
      setIsLoadingEntries(true);
      try {
        const { data, error } = await supabase
          .from('moods')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching mood entries:', error);
          toast({ title: "Error", description: "Gagal mengambil data mood.", variant: "destructive" });
          setMoodEntries([]); // Set ke array kosong jika ada error
        } else if (data) {
          const formattedEntries: MoodEntry[] = data.map((entry: Database['public']['Tables']['moods']['Row']) => ({
            id: entry.id,
            mood: entry.mood as Mood,
            note: entry.note,
            date: new Date(entry.created_at),
            user_id: entry.user_id,
          }));
          setMoodEntries(formattedEntries);
        }
      } catch (e) {
        console.error('Exception fetching mood entries:', e);
        toast({ title: "Error", description: "Terjadi kesalahan saat mengambil data.", variant: "destructive" });
        setMoodEntries([]);
      } finally {
        setIsLoadingEntries(false);
      }
    };

    fetchMoodEntries();
  }, [user, authLoading, toast]);

  const handleSaveMood = async (newEntryData: { mood: Mood; note: string }) => {
    if (!user) {
      toast({ title: "Error", description: "Anda harus login untuk menyimpan mood.", variant: "destructive" });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('moods')
        .insert([{ ...newEntryData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error saving mood entry:', error);
        toast({ title: "Error Menyimpan", description: error.message, variant: "destructive" });
      } else if (data) {
        const newEntry: MoodEntry = {
          id: data.id,
          mood: data.mood as Mood,
          note: data.note,
          date: new Date(data.created_at),
          user_id: data.user_id,
        };
        setMoodEntries(prevEntries => [newEntry, ...prevEntries].sort((a, b) => b.date.getTime() - a.date.getTime()));
      }
    } catch (e) {
        console.error('Exception saving mood entry:', e);
        toast({ title: "Error Menyimpan", description: "Terjadi kesalahan.", variant: "destructive" });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4 animate-fade-in animation-delay-200">
        <div className="mb-12">
         <MoodEntryForm onSaveMood={handleSaveMood} />
        </div>
        {authLoading || isLoadingEntries ? (
          <p className="text-center text-gray-500 mt-8">Memuat data mood...</p>
        ) : (
          <MoodList entries={moodEntries} />
        )}
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
