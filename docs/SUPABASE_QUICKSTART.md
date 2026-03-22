# Supabase Quick Start - Upload Circle Dish Logo

## Step 1: Create Supabase Project (if not done)

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: Circle Dish
   - **Database Password**: (generate a strong password)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be ready (~2 minutes)

## Step 2: Create Storage Buckets

1. In your Supabase project, click **Storage** in left sidebar
2. Click **"New bucket"**

### Create `website-assets` bucket:
- **Name**: `website-assets`
- **Public bucket**: ✅ **Check this box** (important!)
- Click **"Create bucket"**

### Create `user-images` bucket:
- **Name**: `user-images`
- **Public bucket**: ❌ **Leave unchecked**
- Click **"Create bucket"**

## Step 3: Upload Circle Dish Logo

1. Click on the `website-assets` bucket
2. Click **"Upload"** button
3. Select your Circle Dish logo image file
4. Upload as: `circle-dish-logo.png`
5. After upload, click on the file
6. Copy the **Public URL** - it will look like:
   ```
   https://abcdefghijklmnop.supabase.co/storage/v1/object/public/website-assets/circle-dish-logo.png
   ```

## Step 4: Configure Environment Variables

### Get your Supabase credentials:
1. Click **Settings** (gear icon) in left sidebar
2. Click **API** under Project Settings
3. Copy these values:
   - **Project URL**: `https://abcdefghijklmnop.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`

### Update Vercel Environment Variables:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Circle Dish project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STORAGE_URL=https://your-project-id.supabase.co/storage/v1/object/public
```

5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on latest deployment

### Update Railway Environment Variables:
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your Circle Dish backend service
3. Go to **Variables** tab
4. Add:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Railway will automatically redeploy

## Step 5: Verify Logo Appears

After Vercel redeploys (takes ~2 minutes):
1. Visit your site: `https://circledish.com`
2. You should see the Circle Dish logo in:
   - Header (top-left, smaller)
   - Hero section (center, larger)

## Troubleshooting

**Logo not showing?**
- Check the Public URL is correct in Supabase
- Verify `website-assets` bucket is **public**
- Confirm environment variables are set in Vercel
- Check Vercel deployment logs for errors
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Still not working?**
- Verify the file uploaded successfully in Supabase Storage
- Check the file name is exactly: `circle-dish-logo.png`
- Make sure you redeployed Vercel after adding environment variables

---

## Next Steps

Once the logo is working:
1. Upload additional website assets (icons, images) to `website-assets` bucket
2. Set up Row Level Security policies for `user-images` bucket
3. Implement recipe image upload functionality
4. Add user profile picture uploads

See `SUPABASE_SETUP.md` for detailed configuration and database schema.
