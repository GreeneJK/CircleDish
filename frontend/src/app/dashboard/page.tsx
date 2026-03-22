'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface Circle {
  id: string;
  name: string;
  member_count: number;
}

interface Recipe {
  id: string;
  title: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        setUser({
          id: user.id,
          full_name: profile?.full_name || 'User',
          email: user.email || '',
        });

        // Get user's circles
        const { data: userCircles } = await supabase
          .from('circles')
          .select(`
            id,
            name,
            circle_members!inner(count)
          `)
          .eq('circle_members.user_id', user.id);

        setCircles(userCircles || []);

        // Get user's recipes
        const { data: userRecipes } = await supabase
          .from('recipes')
          .select('id, title')
          .eq('created_by', user.id);

        setRecipes(userRecipes || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container-max section-padding">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const isEmptyState = circles.length === 0 && recipes.length === 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="container-max section-padding">
        <div className="mb-8">
          <h1 className="text-section mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-body-large text-gray-600">
            Ready to preserve some family recipes?
          </p>
        </div>

        {isEmptyState ? (
          /* Empty State */
          <div className="bento-grid">
            {/* Create Your First Circle - Prominent Card */}
            <div className="bento-item bento-item-large bg-gradient-to-br from-primary to-primary/90 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Your First Circle</h3>
              <p className="text-lg mb-6 opacity-90">
                Start by creating a private circle for your family or friends. 
                This is where you'll share and preserve your culinary heritage together.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Create Circle
              </button>
            </div>

            {/* Quick Upload */}
            <div className="bento-item">
              <div className="w-12 h-12 bg-accent-terracotta rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">📸</span>
              </div>
              <h3 className="text-card mb-3">Quick Upload</h3>
              <p className="text-body text-gray-600 mb-4">
                Have a recipe ready? Upload it instantly. 
                Just snap a photo or type it out.
              </p>
              <button 
                className="btn-secondary w-full"
                disabled
              >
                Upload Recipe (Create Circle First)
              </button>
            </div>

            {/* Pending Invitations (Future) */}
            <div className="bento-item opacity-60">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-gray-400 text-xl">📬</span>
              </div>
              <h3 className="text-card mb-3">Pending Invitations</h3>
              <p className="text-body text-gray-600 mb-4">
                Circle invitations will appear here once friends invite you to their circles.
              </p>
              <div className="text-center py-4">
                <p className="text-body-small text-gray-400">Coming soon</p>
              </div>
            </div>

            {/* Recipe of the Day Placeholder */}
            <div className="bento-item bento-item-large opacity-60">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-gray-400 text-xl">🍳</span>
              </div>
              <h3 className="text-card mb-3">Recipe of the Day</h3>
              <p className="text-body text-gray-600 mb-4">
                Discover featured recipes from circles around the world. 
                Get inspired by what others are cooking.
              </p>
              <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                <p className="text-body-small text-gray-400">Recipe preview coming soon</p>
              </div>
            </div>
          </div>
        ) : (
          /* Non-Empty State (Future Implementation) */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary mb-2">{circles.length}</div>
                <p className="text-body text-gray-600">Your Circles</p>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary mb-2">{recipes.length}</div>
                <p className="text-body text-gray-600">Your Recipes</p>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-body text-gray-600">Pending Invitations</p>
              </div>
            </div>
            
            <div className="text-center py-12">
              <p className="text-body-large text-gray-600 mb-4">
                Your dashboard content is coming soon!
              </p>
              <p className="text-body text-gray-600">
                We're building the perfect place to manage your circles and recipes.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
