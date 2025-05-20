
import React, { useState, useEffect } from 'react';
import MoodEntryForm from '@/components/MoodEntryForm';
import MoodList from '@/components/MoodList';
import { MoodEntry, Mood } from '@/types';
import { Button } from '@/components/ui/button'; // Assuming Button is from shadcn
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom'; // For navigation

// Mock data - replace with API call later
const initialMockEntries: MoodEntry[] = [
  { id: '1', mood: 'happy', note: 'Meeting berjalan lancar hari ini!', date: new Date(2025, 4, 19, 10, 30) },
  { id: '2', mood: 'neutral', note: 'Kerjaan numpuk, tapi masih oke.', date: new Date(2025, 4, 18, 15, 0) },
  { id: '3', mood: 'sad', note: 'Kucingku sakit :(', date: new Date(2025, 4, 17, 9, 15) },
];

const HomePage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mock data on component mount
  useEffect(() => {
    // Simulate fetching data
    const sortedEntries = [...initialMockEntries].sort((a, b) => b.date.getTime() - a.date.getTime());
    setMoodEntries(sortedEntries);
  }, []);


  const handleSaveMood = (newEntryData: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      ...newEntryData,
      id: String(Date.now()), // Temporary ID generation
      date: new Date(),
    };
    // Add to list and sort (newest first)
    setMoodEntries(prevEntries => [newEntry, ...prevEntries].sort((a, b) => b.date.getTime() - a.date.getTime()));
  };
  
  // Placeholder for actual logout logic
  const handleLogout = () => {
    console.log("Logout clicked");
    // Navigate to login or clear auth state - to be implemented with Supabase
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-8 px-4">
      <header className="container mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-700">Mood Journal</h1>
        <Link to="/login">
          <Button variant="outline" onClick={handleLogout} className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </Link>
      </header>
      <main className="container mx-auto">
        <MoodEntryForm onSaveMood={handleSaveMood} />
        <MoodList entries={moodEntries} />
      </main>
      <footer className="text-center py-8 mt-12 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mood Journal. Dibuat dengan ❤️ oleh Lovable.</p>
      </footer>
    </div>
  );
};

export default HomePage;

