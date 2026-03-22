'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import UserMenu from './UserMenu';

const LOGO_URL = process.env.NEXT_PUBLIC_STORAGE_URL 
  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/website-assets/circle-dish-logo.png`
  : '/images/circle-dish-logo.png'; // Fallback for local dev

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <header className="bg-background border-b border-gray-100">
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            <div className="w-20 h-6 bg-gray-200 animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="w-28 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background border-b border-gray-100">
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src={LOGO_URL}
              alt="Circle Dish - Cook. Share. Discover."
              className="h-14 w-auto max-h-[60px] object-contain"
              style={{ 
                maxHeight: '60px', 
                height: '60px',
                width: 'auto',
                display: 'block'
              }}
            />
          </Link>

          {/* Right Side - Conditional based on auth state */}
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-4">
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
