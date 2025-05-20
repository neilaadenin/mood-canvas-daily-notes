
import React, { useState, useEffect } from 'react';
import MoodEntryForm from '@/components/MoodEntryForm';
import MoodList from '@/components/MoodList';
import Navbar from '@/components/Navbar'; // Import Navbar
import { MoodEntry } from '@/types';

// Mock data - replace with API call later
const initialMockEntries: MoodEntry[] = [
  { id: '1', mood: 'happy', note: 'Meeting berjalan lancar hari ini!', date: new Date(2025, 4, 19, 10, 30) },
  { id: '2', mood: 'neutral', note: 'Kerjaan numpuk, tapi masih oke.', date: new Date(2025, 4, 18, 15, 0) },
  { id: '3', mood: 'sad', note: 'Kucingku sakit :(', date: new Date(2025, 4, 17, 9, 15) },
];

const DashboardPage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const sortedEntries = [...initialMockEntries].sort((a, b) => b.date.getTime() - a.date.getTime());
    setMoodEntries(sortedEntries);
  }, []);

  const handleSaveMood = (newEntryData: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      ...newEntryData,
      id: String(Date.now()), 
      date: new Date(),
    };
    setMoodEntries(prevEntries => [newEntry, ...prevEntries].sort((a, b) => b.date.getTime() - a.date.getTime()));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4 animate-fade-in animation-delay-200">
        <div className="mb-12">
         <MoodEntryForm onSaveMood={handleSaveMood} />
        </div>
        <MoodList entries={moodEntries} />
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
