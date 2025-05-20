
import React, { useState } from 'react';
import MoodSelector from './MoodSelector';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mood, MoodEntry } from '@/types';
import { useToast } from '@/hooks/use-toast'; // Corrected import path

interface MoodEntryFormProps {
  onSaveMood: (moodEntry: Omit<MoodEntry, 'id' | 'date'>) => void;
}

const MoodEntryForm: React.FC<MoodEntryFormProps> = ({ onSaveMood }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!selectedMood) {
      toast({
        title: "Pilih Mood",
        description: "Anda harus memilih mood terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    onSaveMood({ mood: selectedMood, note });
    setSelectedMood(null);
    setNote('');
    toast({
      title: "Mood Tersimpan!",
      description: "Catatan mood Anda berhasil disimpan.",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Bagaimana perasaanmu hari ini?</h2>
      <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
      <Textarea
        placeholder="Tambahkan catatan singkat tentang harimu..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[100px] mb-4 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
      />
      <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
        Simpan Mood
      </Button>
    </div>
  );
};

export default MoodEntryForm;

