-- Drop the insecure public INSERT policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create secure INSERT policy - only authenticated users can create bookings
CREATE POLICY "Authenticated users can create bookings"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Verify RLS is enabled (already enabled but ensuring)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner too
ALTER TABLE public.bookings FORCE ROW LEVEL SECURITY;