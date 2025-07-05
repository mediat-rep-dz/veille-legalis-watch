-- Function to get all users (admin only)
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  created_at TIMESTAMPTZ,
  role app_role
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    u.id,
    u.email,
    u.created_at,
    COALESCE(ur.role, 'citoyen'::app_role) as role
  FROM auth.users u
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id
  WHERE public.has_role(auth.uid(), 'admin');
$$;

-- Function to update user role (admin only)
CREATE OR REPLACE FUNCTION public.update_user_role(
  target_user_id UUID,
  new_role app_role
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER  
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin rights required.';
  END IF;

  -- Delete existing role
  DELETE FROM public.user_roles WHERE user_id = target_user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (target_user_id, new_role, auth.uid());
  
  RETURN TRUE;
END;
$$;

-- Create admin user function (first time setup)
CREATE OR REPLACE FUNCTION public.create_admin_user(admin_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Find user by email
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = admin_email;
  
  IF admin_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', admin_email;
  END IF;
  
  -- Make user admin
  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN TRUE;
END;
$$;