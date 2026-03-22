import { createClient as createBrowserClient } from './supabase/client';

// Client-side supabase client
export const supabase = (() => {
  try {
    return createBrowserClient();
  } catch (error) {
    // Return a mock client during build time
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        signIn: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        signOut: () => Promise.resolve({ error: new Error('Not available during build') }),
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        updateUser: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        insert: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        update: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
        delete: () => Promise.resolve({ data: null, error: new Error('Not available during build') }),
      }),
    } as any;
  }
})();

// Auth helper functions
export const auth = {
  // Get current user
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    return { data, error };
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },
};

// Storage helper functions
export const storage = {
  // Get public URL for website assets
  getAssetUrl: (path: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
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
