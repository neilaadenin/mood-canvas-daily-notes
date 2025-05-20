
export type Mood = "happy" | "neutral" | "sad";

export interface MoodEntry {
  id: string;
  mood: Mood;
  note: string;
  date: Date;
}

