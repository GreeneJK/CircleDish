'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  full_name: string;
  email: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', authUser.id)
        .single();

      setUser({
        id: authUser.id,
        full_name: profile?.full_name || 'User',
        email: authUser.email || '',
      });
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container-max section-padding">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container-max section-padding">
        <div className="max-w-2xl">
          <h1 className="text-section mb-8">Account Settings</h1>
          
          <div className="card space-y-6">
            <div>
              <h2 className="text-card mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-body font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.full_name || ''}
                    className="input-field"
                    disabled
                  />
                  <p className="text-body-small text-gray-600 mt-1">
                    Name changes coming soon
                  </p>
                </div>
                
                <div>
                  <label className="block text-body font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="input-field"
                    disabled
                  />
                  <p className="text-body-small text-gray-600 mt-1">
                    Email changes coming soon
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-card mb-4">Password</h2>
              <button className="btn-secondary">
                Change Password
              </button>
              <p className="text-body-small text-gray-600 mt-2">
                Password reset coming soon
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-card mb-4">Account Actions</h2>
              <div className="space-y-3">
                <button className="btn-secondary">
                  Export My Data
                </button>
                <button className="text-body-small text-red-600 hover:text-red-700">
                  Delete Account
                </button>
              </div>
              <p className="text-body-small text-gray-600 mt-2">
                Additional account features coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
