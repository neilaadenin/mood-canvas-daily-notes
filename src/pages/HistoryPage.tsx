
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MoodList from '@/components/MoodList';
import { MoodEntry, Mood, RawMoodEntryFromSupabase } from '@/types';
import type { Database } from '@/integrations/supabase/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase
import { useToast } from '@/hooks/use-toast';

const HistoryPage: React.FC = () => {
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<Mood | 'all'>('all');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  useEffect(() => {
    const fetchHistoryEntries = async () => {
      if (!user || authLoading) return;
      setIsLoadingEntries(true);
      try {
        const { data, error } = await supabase
          .from('moods')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching history entries:', error);
          toast({ title: "Error", description: "Gagal mengambil riwayat mood.", variant: "destructive" });
          setAllEntries([]);
        } else if (data) {
          const formattedEntries: MoodEntry[] = data.map((entry: Database['public']['Tables']['moods']['Row']) => ({
            id: entry.id,
            mood: entry.mood as Mood,
            note: entry.note,
            date: new Date(entry.created_at),
            user_id: entry.user_id,
          }));
          setAllEntries(formattedEntries);
        }
      } catch (e) {
        console.error('Exception fetching history entries:', e);
        toast({ title: "Error", description: "Terjadi kesalahan saat mengambil riwayat.", variant: "destructive" });
        setAllEntries([]);
      } finally {
        setIsLoadingEntries(false);
      }
    };

    fetchHistoryEntries();
  }, [user, authLoading, toast]);

  useEffect(() => {
    let entries = [...allEntries];
    if (selectedMood !== 'all') {
      entries = entries.filter(entry => entry.mood === selectedMood);
    }
    if (startDate) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      entries = entries.filter(entry => entry.date >= startOfDay);
    }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      entries = entries.filter(entry => entry.date <= endOfDay);
    }
    setFilteredEntries(entries.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, [selectedMood, startDate, endDate, allEntries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4 animate-fade-in animation-delay-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Riwayat Mood</h1>
        
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg space-y-4 md:space-y-0 md:flex md:items-center md:justify-between animate-scale-in">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <label htmlFor="moodFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter Mood:</label>
              <Select value={selectedMood} onValueChange={(value) => setSelectedMood(value as Mood | 'all')}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Pilih mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Mood</SelectItem>
                  <SelectItem value="happy">Happy 😃</SelectItem>
                  <SelectItem value="neutral">Neutral 😐</SelectItem>
                  <SelectItem value="sad">Sad 😞</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal bg-gray-50 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal bg-gray-50 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      startDate ? date < startDate : false
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button 
            onClick={() => {
              setSelectedMood('all');
              setStartDate(undefined);
              setEndDate(undefined);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white mt-4 md:mt-0 w-full md:w-auto"
          >
            Reset Filter
          </Button>
        </div>
        {authLoading || isLoadingEntries ? (
          <p className="text-center text-gray-500 mt-8">Memuat riwayat mood...</p>
        ) : (
          <MoodList entries={filteredEntries} />
        )}
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default HistoryPage;
