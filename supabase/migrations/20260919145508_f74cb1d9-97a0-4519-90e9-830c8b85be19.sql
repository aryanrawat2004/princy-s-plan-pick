CREATE TABLE public.date_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Princy',
  activity text NOT NULL,
  activity_preference text,
  selected_date date NOT NULL,
  selected_time text NOT NULL,
  location_preference text NOT NULL,
  suspicion_level integer NOT NULL CHECK (suspicion_level BETWEEN 0 AND 100),
  response_type text NOT NULL,
  deal_response text NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.date_plans TO anon;
GRANT INSERT ON public.date_plans TO authenticated;
GRANT ALL ON public.date_plans TO service_role;

ALTER TABLE public.date_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can confirm one complete plan"
ON public.date_plans
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name = 'Princy'
  AND status = 'confirmed'
  AND suspicion_level BETWEEN 0 AND 100
  AND char_length(activity) BETWEEN 1 AND 100
  AND char_length(selected_time) BETWEEN 1 AND 100
  AND char_length(location_preference) BETWEEN 1 AND 120
  AND char_length(response_type) BETWEEN 1 AND 80
  AND char_length(deal_response) BETWEEN 1 AND 80
);