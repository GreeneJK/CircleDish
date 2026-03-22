import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage helper functions
export const storage = {
  // Get public URL for website assets
  getAssetUrl: (path: string) => {
    return `${supabaseUrl}/storage/v1/object/public/website-assets/${path}`;
  },

  // Upload user image
  uploadUserImage: async (
    file: File,
    userId: string,
    folder: 'profile' | 'recipes' | 'comments',
    subPath?: string
  ) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = subPath 
      ? `${userId}/${folder}/${subPath}/${fileName}`
      : `${userId}/${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('user-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('user-images')
      .getPublicUrl(filePath);

    return { filePath, publicUrl };
  },

  // Delete user image
  deleteUserImage: async (filePath: string) => {
    const { error } = await supabase.storage
      .from('user-images')
      .remove([filePath]);

    if (error) throw error;
  },

  // Get signed URL for private image (temporary access)
  getSignedUrl: async (filePath: string, expiresIn: number = 3600) => {
    const { data, error } = await supabase.storage
      .from('user-images')
      .createSignedUrl(filePath, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  }
};
