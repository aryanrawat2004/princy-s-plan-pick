DROP POLICY IF EXISTS "Anyone can confirm one complete plan" ON public.date_plans;

CREATE POLICY "Anyone can confirm one complete plan"
ON public.date_plans
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name = 'Princy'
  AND status = 'confirmed'
  AND suspicion_level BETWEEN 0 AND 100
  AND char_length(activity) BETWEEN 1 AND 500
  AND (activity_preference IS NULL OR char_length(activity_preference) <= 500)
  AND char_length(selected_time) BETWEEN 1 AND 100
  AND char_length(location_preference) BETWEEN 1 AND 120
  AND char_length(response_type) BETWEEN 1 AND 80
  AND char_length(deal_response) BETWEEN 1 AND 80
);
