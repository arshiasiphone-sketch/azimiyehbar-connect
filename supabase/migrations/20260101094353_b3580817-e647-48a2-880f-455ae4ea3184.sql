-- Allow creating the first admin when no admins exist
CREATE POLICY "Allow first admin creation"
ON public.user_roles
FOR INSERT
WITH CHECK (
  role = 'admin'::app_role
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role
  )
);