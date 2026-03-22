# Supabase Setup Guide for Circle Dish

## Storage Buckets

Circle Dish uses Supabase Storage for all image assets with two separate buckets:

### 1. `website-assets` (Public)
- **Purpose**: Static website assets (logo, icons, marketing images)
- **Access**: Public read access
- **Upload**: Admin only (via Supabase dashboard)
- **Examples**: Circle Dish logo, feature icons, landing page images

### 2. `user-images` (Private with RLS)
- **Purpose**: User-generated content (recipe photos, profile pictures, comment images)
- **Access**: Controlled by Row Level Security policies
- **Upload**: Authenticated users only
- **Examples**: Recipe photos, user avatars, comment attachments

---

## Setup Instructions

### Step 1: Create Storage Buckets

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your Circle Dish project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**

#### Create `website-assets` bucket:
- **Name**: `website-assets`
- **Public bucket**: ✅ Yes
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/png, image/jpeg, image/svg+xml, image/webp`

#### Create `user-images` bucket:
- **Name**: `user-images`
- **Public bucket**: ❌ No (we'll use RLS)
- **File size limit**: 10 MB
- **Allowed MIME types**: `image/png, image/jpeg, image/webp`

### Step 2: Upload Website Assets

Upload the Circle Dish logo to the `website-assets` bucket:

1. Click on `website-assets` bucket
2. Click **"Upload file"**
3. Upload: `circle-dish-logo.png`
4. Note the public URL (will be something like):
   ```
   https://[project-id].supabase.co/storage/v1/object/public/website-assets/circle-dish-logo.png
   ```

### Step 3: Configure Storage Policies

#### For `user-images` bucket, create RLS policies:

**Policy 1: Users can upload their own images**
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: Users can view images in their circles**
```sql
CREATE POLICY "Users can view circle images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-images' AND
  EXISTS (
    SELECT 1 FROM recipe_circles rc
    JOIN circle_members cm ON rc.circle_id = cm.circle_id
    WHERE cm.user_id = auth.uid()
    AND storage.foldername(name)[1] = rc.recipe_id::text
  )
);
```

**Policy 3: Users can delete their own images**
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## Database Schema for Asset Management

### Table: `website_assets`
Track website assets for easy management:

```sql
CREATE TABLE website_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Circle Dish logo
INSERT INTO website_assets (name, description, file_path, file_type, storage_url)
VALUES (
  'circle-dish-logo',
  'Main Circle Dish logo with tagline',
  'circle-dish-logo.png',
  'image/png',
  'https://[project-id].supabase.co/storage/v1/object/public/website-assets/circle-dish-logo.png'
);
```

### Table: `recipe_images`
Track user-uploaded recipe images:

```sql
CREATE TABLE recipe_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE recipe_images ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view images for recipes in their circles
CREATE POLICY "Users can view recipe images in their circles"
ON recipe_images FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM recipe_circles rc
    JOIN circle_members cm ON rc.circle_id = cm.circle_id
    WHERE rc.recipe_id = recipe_images.recipe_id
    AND cm.user_id = auth.uid()
  )
);
```

---

## Environment Variables

Add to your `.env` files:

### Frontend (`frontend/.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_STORAGE_URL=https://[project-id].supabase.co/storage/v1/object/public
```

### Backend (`backend/.env`):
```bash
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

---

## File Organization Structure

### `website-assets` bucket:
```
website-assets/
├── circle-dish-logo.png
├── circle-dish-logo.svg (optional)
├── icons/
│   ├── feature-circles.svg
│   ├── feature-upload.svg
│   └── feature-print.svg
└── landing/
    ├── hero-image.jpg
    └── testimonial-bg.jpg
```

### `user-images` bucket:
```
user-images/
├── {user-id}/
│   ├── profile/
│   │   └── avatar.jpg
│   └── recipes/
│       ├── {recipe-id}/
│       │   ├── main.jpg
│       │   ├── step-1.jpg
│       │   └── step-2.jpg
└── comments/
    └── {comment-id}.jpg
```

---

## Usage in Code

### Frontend - Get Website Asset:
```typescript
const logoUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/website-assets/circle-dish-logo.png`;
```

### Frontend - Upload User Image:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function uploadRecipeImage(file: File, recipeId: string, userId: string) {
  const filePath = `${userId}/recipes/${recipeId}/${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('user-images')
    .upload(filePath, file);
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('user-images')
    .getPublicUrl(filePath);
    
  return publicUrl;
}
```

---

## Security Best Practices

1. **Never expose service role key** in frontend code
2. **Use RLS policies** for all user-generated content
3. **Validate file types** on both client and server
4. **Limit file sizes** to prevent abuse
5. **Use signed URLs** for temporary access to private images
6. **Implement virus scanning** for user uploads (future enhancement)

---

## Migration from Local Storage

If you have any local images, upload them to Supabase:

```bash
# Using Supabase CLI
supabase storage cp ./local-image.png supabase://website-assets/image.png
```

Or use the Supabase Dashboard to manually upload files.
