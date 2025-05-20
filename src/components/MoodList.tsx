
import React from 'react';
import MoodCard from './MoodCard';
import { MoodEntry } from '@/types';

interface MoodListProps {
  entries: MoodEntry[];
}

const MoodList: React.FC<MoodListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Belum ada catatan mood. Mulai tambahkan!</p>;
  }

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Riwayat Mood Kamu</h3>
      {entries.map((entry) => (
        <MoodCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default MoodList;

