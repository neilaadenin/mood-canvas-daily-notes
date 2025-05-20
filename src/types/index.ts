
export type Mood = "happy" | "neutral" | "sad";

export interface MoodEntry {
  id: string; // UUID dari Supabase akan menjadi string
  mood: Mood;
  note: string;
  date: Date; // Ini akan diisi dari created_at (string) yang dikonversi ke Date
  user_id?: string; // Opsional, karena RLS menangani ini di backend
}

// Tipe untuk data yang diterima dari Supabase sebelum konversi
export interface RawMoodEntryFromSupabase {
  id: string;
  mood: Mood;
  note: string;
  created_at: string; // Supabase mengembalikan timestamp sebagai string
  user_id: string;
}
