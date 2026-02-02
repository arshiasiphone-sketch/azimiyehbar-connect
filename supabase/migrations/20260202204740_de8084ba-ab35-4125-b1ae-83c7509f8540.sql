-- Drop the authenticated-only INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create bookings" ON public.bookings;

-- Create a public INSERT policy (anyone can create bookings)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);