import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const quotes = [
  "Every day is a new beginning. Take a deep breath and start again.",
  "Your emotions are valid, but they don't define your destiny.",
  "Small steps forward are still steps in the right direction.",
  "Be patient with yourself. Self-growth is tender, it's holy ground.",
  "Your journey is unique. Embrace your own timeline.",
  "Today's mood is tomorrow's wisdom.",
  "In the middle of difficulty lies opportunity.",
  "You are stronger than you think, braver than you believe.",
];

const DailyMotivation: React.FC = () => {
  const [dailyQuote, setDailyQuote] = useState<string>("");

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedQuote = localStorage.getItem(`daily-quote-${today}`);

    if (storedQuote) {
      setDailyQuote(storedQuote);
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      localStorage.setItem(`daily-quote-${today}`, randomQuote);
      setDailyQuote(randomQuote);
    }
  }, []);

  return (
    <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-purple-700">Daily Motivation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl text-center text-purple-600 italic">"{dailyQuote}"</p>
      </CardContent>
    </Card>
  );
};

export default DailyMotivation;