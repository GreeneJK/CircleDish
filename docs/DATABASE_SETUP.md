# Database Setup Guide for Circle Dish

This guide will help you set up the complete database schema for Circle Dish using Supabase.

## Prerequisites

- Supabase project created and configured
- Environment variables set in your frontend
- Supabase CLI installed (optional, for local development)

## Quick Setup via Supabase Dashboard

### Step 1: Run the SQL Migration

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your Circle Dish project
3. Click **SQL Editor** in the left sidebar
4. Click **"New query"**
5. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
6. Paste it into the SQL editor
7. Click **"Run"** to execute the migration

### Step 2: Verify Schema Creation

After running the migration, you should see these tables in your database:

#### Core Tables:
- `profiles` - User profiles (extends auth.users)
- `circles` - User-created circles
- `circle_members` - Circle membership with roles
- `circle_invitations` - Pending invitations (future use)
- `recipes` - Recipe storage
- `recipe_circles` - Recipe-circle relationships
- `recipe_images` - Recipe image storage

#### Auth Integration:
- Automatic profile creation on user signup
- Circle creators automatically become owners
- Row Level Security (RLS) policies enabled
- Database triggers for data consistency

## Schema Overview

### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Circles Table
```sql
CREATE TABLE public.circles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Circle Members Table
```sql
CREATE TABLE public.circle_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID REFERENCES public.circles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  invited_by UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);
```

## Key Features

### 1. Invitation-Only Model
- Users can only **create** circles, not join them
- Circle invitations are stored in `circle_invitations` table
- No public circle discovery or browsing

### 2. Role-Based Access Control
- **Owner**: Can manage circle, invite members, delete circle
- **Admin**: Can manage circle, invite members
- **Member**: Can view and contribute to circle

### 3. Automatic Profile Creation
- Database trigger creates profile on user signup
- Extracts `full_name` from user metadata
- No manual profile creation needed

### 4. Row Level Security (RLS)
- Users can only see circles they're members of
- Recipe access controlled by circle membership
- Profile access limited to own profile

## Testing the Setup

### 1. Create a Test User
```sql
-- This will be done via the frontend signup
-- But you can verify the trigger works by checking profiles table
SELECT * FROM public.profiles;
```

### 2. Create a Test Circle
```sql
INSERT INTO public.circles (name, description, created_by)
VALUES ('Test Circle', 'A circle for testing', 'your-user-id');
```

### 3. Verify Circle Membership
```sql
SELECT * FROM public.circle_members 
WHERE circle_id = 'your-circle-id';
```

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STORAGE_URL=https://your-project.supabase.co/storage/v1/object/public
```

## Troubleshooting

### Common Issues:

1. **Migration Fails**: Check for syntax errors or missing dependencies
2. **RLS Policies Too Restrictive**: Test with different user roles
3. **Triggers Not Working**: Verify trigger functions exist and are enabled
4. **Foreign Key Constraints**: Ensure proper data relationships

### Debug Queries:

```sql
-- Check if triggers exist
SELECT * FROM pg_trigger WHERE tgname LIKE '%on_%_created%';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename LIKE 'circle%';

-- Verify user permissions
SELECT * FROM auth.users WHERE email = 'test@example.com';
```

## Next Steps

After database setup:

1. Test user signup flow
2. Create circles and verify membership
3. Upload recipes and test access controls
4. Implement invitation system (future iteration)

## Local Development (Optional)

For local development with Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Start local stack
supabase start

# Apply migrations
supabase db push
```

This gives you a local PostgreSQL instance for development.
