-- Create moods table for mood tracking application
CREATE TABLE public.moods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('happy', 'neutral', 'sad')),
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
CREATE POLICY "Users can view their own moods" 
ON public.moods 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own moods" 
ON public.moods 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moods" 
ON public.moods 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods" 
ON public.moods 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_moods_updated_at
  BEFORE UPDATE ON public.moods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();