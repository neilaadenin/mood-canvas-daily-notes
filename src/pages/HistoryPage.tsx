
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MoodList from '@/components/MoodList';
import { MoodEntry, Mood } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar"; // Assuming you have this or a similar component
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for history
const mockHistoryEntries: MoodEntry[] = [
  { id: '1', mood: 'happy', note: 'Meeting berjalan lancar hari ini!', date: new Date(2025, 4, 19, 10, 30) },
  { id: '2', mood: 'neutral', note: 'Kerjaan numpuk, tapi masih oke.', date: new Date(2025, 4, 18, 15, 0) },
  { id: '3', mood: 'sad', note: 'Kucingku sakit :(', date: new Date(2025, 4, 17, 9, 15) },
  { id: '4', mood: 'happy', note: 'Dapat bonus!', date: new Date(2025, 4, 16, 17, 0) },
  { id: '5', mood: 'neutral', note: 'Cuaca mendung.', date: new Date(2025, 4, 15, 12, 0) },
];

const HistoryPage: React.FC = () => {
  const [filteredEntries, setFilteredEntries] = useState<MoodEntry[]>(mockHistoryEntries);
  const [selectedMood, setSelectedMood] = useState<Mood | 'all'>('all');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    let entries = [...mockHistoryEntries];
    if (selectedMood !== 'all') {
      entries = entries.filter(entry => entry.mood === selectedMood);
    }
    if (startDate) {
      entries = entries.filter(entry => entry.date >= startDate);
    }
    if (endDate) {
      // Set endDate to end of day for inclusive filtering
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      entries = entries.filter(entry => entry.date <= endOfDay);
    }
    setFilteredEntries(entries.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, [selectedMood, startDate, endDate]);

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

        <MoodList entries={filteredEntries} />
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default HistoryPage;
