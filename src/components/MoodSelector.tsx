
import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mood } from '@/types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const moodOptions: { mood: Mood; icon: React.ElementType; label: string; color: string, bgColor: string, hoverBgColor: string, borderColor: string }[] = [
  { mood: 'happy', icon: Smile, label: 'Happy', color: 'text-green-600', bgColor: 'bg-green-100', hoverBgColor: 'hover:bg-green-200', borderColor: 'border-green-500' },
  { mood: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-600', bgColor: 'bg-yellow-100', hoverBgColor: 'hover:bg-yellow-200', borderColor: 'border-yellow-500' },
  { mood: 'sad', icon: Frown, label: 'Sad', color: 'text-red-600', bgColor: 'bg-red-100', hoverBgColor: 'hover:bg-red-200', borderColor: 'border-red-500' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 my-6">
      {moodOptions.map(({ mood, icon: Icon, label, color, bgColor, hoverBgColor, borderColor }) => (
        <Button
          key={mood}
          variant="outline"
          className={cn(
            "p-3 sm:p-4 rounded-full h-20 w-20 sm:h-24 sm:w-24 flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:scale-110",
            selectedMood === mood ? `${bgColor} ${borderColor} border-2 shadow-lg scale-110` : `bg-gray-50 ${hoverBgColor} border-gray-200 hover:shadow-md`,
            color
          )}
          onClick={() => onSelectMood(mood)}
        >
          <Icon size={32} smSize={40} className="mb-1" />
          <span className="text-xs sm:text-sm capitalize">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
