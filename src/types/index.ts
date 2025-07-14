
export type Mood = "happy" | "neutral" | "sad";

export interface MoodEntry {
  id: string;
  mood: Mood;
  note: string;
  date: Date;
  user_id: string;
}

// Type for data received from Supabase
export interface RawMoodEntryFromSupabase {
  id: string;
  mood: Mood;
  note: string;
  created_at: string;
  user_id: string;
}
