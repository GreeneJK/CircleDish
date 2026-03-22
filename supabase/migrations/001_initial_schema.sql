-- Circle Dish Initial Schema
-- This migration creates the core database structure for Circle Dish

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Circles table - users can only create circles
CREATE TABLE public.circles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Circle members table with role-based access
CREATE TABLE public.circle_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID REFERENCES public.circles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  invited_by UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

-- Circle invitations table (for future invitation system)
CREATE TABLE public.circle_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID REFERENCES public.circles(id) ON DELETE CASCADE NOT NULL,
  invited_email TEXT NOT NULL,
  invited_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  token UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes table
CREATE TABLE public.recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] DEFAULT '{}',
  instructions TEXT[] DEFAULT '{}',
  prep_time INTEGER, -- in minutes
  cook_time INTEGER, -- in minutes
  servings INTEGER,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  category TEXT
);

-- Recipe circles junction table (which circles have access to which recipes)
CREATE TABLE public.recipe_circles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  circle_id UUID REFERENCES public.circles(id) ON DELETE CASCADE NOT NULL,
  added_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(recipe_id, circle_id)
);

-- Recipe images table
CREATE TABLE public.recipe_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to create profile automatically when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to automatically make circle creator an owner
CREATE OR REPLACE FUNCTION public.add_circle_creator_as_owner()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.circle_members (circle_id, user_id, role, invited_by, joined_at)
  VALUES (
    NEW.id,
    NEW.created_by,
    'owner',
    NEW.created_by,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to add circle creator as owner
CREATE TRIGGER on_circle_created
  AFTER INSERT ON public.circles
  FOR EACH ROW EXECUTE FUNCTION public.add_circle_creator_as_owner();

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated at triggers
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.updated_at_column();

CREATE TRIGGER circles_updated_at BEFORE UPDATE ON public.circles
  FOR EACH ROW EXECUTE FUNCTION public.updated_at_column();

CREATE TRIGGER recipes_updated_at BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_images ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Circles RLS policies
CREATE POLICY "Users can view circles they are members of"
  ON public.circles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.circle_members
      WHERE circle_members.circle_id = circles.id
      AND circle_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert circles"
  ON public.circles FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Circle owners can update circles"
  ON public.circles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.circle_members
      WHERE circle_members.circle_id = circles.id
      AND circle_members.user_id = auth.uid()
      AND circle_members.role = 'owner'
    )
  );

-- Circle members RLS policies
CREATE POLICY "Users can view circle membership for their circles"
  ON public.circle_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.circle_members cm2
      WHERE cm2.circle_id = circle_members.circle_id
      AND cm2.user_id = auth.uid()
    )
  );

-- Circle invitations RLS policies
CREATE POLICY "Users can view invitations for circles they own"
  ON public.circle_invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.circle_members
      WHERE circle_members.circle_id = circle_invitations.circle_id
      AND circle_members.user_id = auth.uid()
      AND circle_members.role = 'owner'
    )
  );

-- Recipes RLS policies
CREATE POLICY "Users can view recipes from their circles"
  ON public.recipes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.recipe_circles
      JOIN public.circle_members ON circle_members.circle_id = recipe_circles.circle_id
      WHERE recipe_circles.recipe_id = recipes.id
      AND circle_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert recipes"
  ON public.recipes FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recipe creators can update recipes"
  ON public.recipes FOR UPDATE
  USING (created_by = auth.uid());

-- Recipe circles RLS policies
CREATE POLICY "Users can view recipe-circle relationships for their circles"
  ON public.recipe_circles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.circle_members
      WHERE circle_members.circle_id = recipe_circles.circle_id
      AND circle_members.user_id = auth.uid()
    )
  );

-- Recipe images RLS policies
CREATE POLICY "Users can view recipe images from their circles"
  ON public.recipe_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.recipes
      JOIN public.recipe_circles ON recipe_circles.recipe_id = recipes.id
      JOIN public.circle_members ON circle_members.circle_id = recipe_circles.circle_id
      WHERE recipes.id = recipe_images.recipe_id
      AND circle_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert recipe images"
  ON public.recipe_images FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Image uploaders can update recipe images"
  ON public.recipe_images FOR UPDATE
  USING (uploaded_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_circles_created_by ON public.circles(created_by);
CREATE INDEX idx_circle_members_circle_id ON public.circle_members(circle_id);
CREATE INDEX idx_circle_members_user_id ON public.circle_members(user_id);
CREATE INDEX idx_recipes_created_by ON public.recipes(created_by);
CREATE INDEX idx_recipe_circles_recipe_id ON public.recipe_circles(recipe_id);
CREATE INDEX idx_recipe_circles_circle_id ON public.recipe_circles(circle_id);
CREATE INDEX idx_circle_invitations_token ON public.circle_invitations(token);
CREATE INDEX idx_circle_invitations_email ON public.circle_invitations(invited_email);
