
import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mood } from '@/types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const moodOptions: { mood: Mood; icon: React.ElementType; color: string, bgColor: string, hoverBgColor: string }[] = [
  { mood: 'happy', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-100', hoverBgColor: 'hover:bg-green-200' },
  { mood: 'neutral', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-100', hoverBgColor: 'hover:bg-yellow-200' },
  { mood: 'sad', icon: Frown, color: 'text-red-500', bgColor: 'bg-red-100', hoverBgColor: 'hover:bg-red-200' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="flex justify-center space-x-4 my-6">
      {moodOptions.map(({ mood, icon: Icon, color, bgColor, hoverBgColor }) => (
        <Button
          key={mood}
          variant="outline"
          className={cn(
            "p-4 rounded-full h-20 w-20 flex flex-col items-center justify-center transition-all duration-200 ease-in-out",
            selectedMood === mood ? `${bgColor} border-2 border-current ${color}` : `bg-gray-50 ${hoverBgColor}`,
            color 
          )}
          onClick={() => onSelectMood(mood)}
        >
          <Icon size={36} />
          <span className="text-xs mt-1 capitalize">{mood}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;

