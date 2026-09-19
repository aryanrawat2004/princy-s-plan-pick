ALTER TABLE public.date_plans
ADD COLUMN note text;

ALTER TABLE public.date_plans
ADD CONSTRAINT date_plans_note_length CHECK (note IS NULL OR char_length(note) <= 500);
