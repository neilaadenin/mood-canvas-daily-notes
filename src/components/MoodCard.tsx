
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown } from 'lucide-react';
import { MoodEntry, Mood } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // For Indonesian date formatting

interface MoodCardProps {
  entry: MoodEntry;
}

const moodIcons: Record<Mood, React.ElementType> = {
  happy: Smile,
  neutral: Meh,
  sad: Frown,
};

const moodColors: Record<Mood, string> = {
  happy: 'text-green-500',
  neutral: 'text-yellow-500',
  sad: 'text-red-500',
};

const MoodCard: React.FC<MoodCardProps> = ({ entry }) => {
  const Icon = moodIcons[entry.mood];
  const color = moodColors[entry.mood];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon size={32} className={color} />
          <span className="text-sm text-gray-500">
            {format(entry.date, "eeee, dd MMMM yyyy, HH:mm", { locale: id })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {entry.note ? (
          <p className="text-gray-700 whitespace-pre-wrap">{entry.note}</p>
        ) : (
          <p className="text-gray-400 italic">Tidak ada catatan.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodCard;

