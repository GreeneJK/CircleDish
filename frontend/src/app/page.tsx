import Image from 'next/image';
import Header from '@/components/Header';

const LOGO_URL = process.env.NEXT_PUBLIC_STORAGE_URL 
  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/website-assets/circle-dish-logo.png`
  : '/images/circle-dish-logo.png'; // Fallback for local dev

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Copy */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-hero text-primary">
                  Your Family's Living Cookbook
                </h1>
                <p className="text-body-large text-gray-600">
                  Stop losing recipes to scattered texts and forgotten recipe cards. 
                  Circle Dish brings your family's culinary heritage into one private, 
                  beautiful space where traditions live and grow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Circle
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Watch Demo
                </button>
              </div>
              <p className="text-body-small text-gray-600">
                Free for families • No credit card required • 2-minute setup
              </p>
            </div>
            
            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/family-cooking.png"
                  alt="Family cooking together in Circle Dish"
                  className="rounded-2xl shadow-lg object-cover"
                  style={{ 
                    maxHeight: '350px',
                    height: '350px',
                    width: 'auto',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="section-padding bg-surface-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-section text-left">
                Recipe Sharing Problem
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">Fragmented Sharing</h3>
                    <p className="text-body text-gray-600">Recipes scattered across emails, texts, and social media</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">Lost Heritage</h3>
                    <p className="text-body text-gray-600">Grandma's handwritten recipes fading away in drawers</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">No Context</h3>
                    <p className="text-body text-gray-600">Missing stories, variations, and family memories</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-section text-left">
                The Circle Dish Solution
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">Private Circles</h3>
                    <p className="text-body text-gray-600">Invite-only groups for family, friends, or cooking clubs</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">Living Cookbook</h3>
                    <p className="text-body text-gray-600">Photos, comments, and variations that evolve over time</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-semibold mb-1">Kitchen-Ready</h3>
                    <p className="text-body text-gray-600">Print-optimized recipes for cooking without devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="section-padding bg-surface-light">
        <div className="container-max">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-section">
              Made for Your Circle
            </h2>
            <p className="text-body-large text-gray-600 container-medium">
              Whether you're preserving family traditions or sharing with friends, Circle Dish adapts to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent-sage rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-card">Families</h3>
              <p className="text-body text-gray-600">
                Preserve Grandma's recipes and pass down traditions to the next generation
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent-terracotta rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-3xl">🍻</span>
              </div>
              <h3 className="text-card">Friend Groups</h3>
              <p className="text-body text-gray-600">
                Share meal-prep wins and dinner party successes with your closest friends
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-3xl">🔥</span>
              </div>
              <h3 className="text-card">Specialty Circles</h3>
              <p className="text-body text-gray-600">
                Cooking clubs, work groups, or enthusiasts focused on specific cuisines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-section">
              Start Your Living Cookbook Today
            </h2>
            <p className="text-body-large text-gray-600">
              Join families who are already preserving their culinary heritage, one recipe at a time.
            </p>
            
            <div className="bg-surface-light rounded-2xl p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Free</div>
                  <p className="text-body-small text-gray-600">No credit card required</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2 Min</div>
                  <p className="text-body-small text-gray-600">Setup time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">∞</div>
                  <p className="text-body-small text-gray-600">Recipes & Circles</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email to get started" 
                  className="input-field text-center"
                />
                <button className="btn-primary w-full text-lg px-8 py-4">
                  Create Your Free Circle
                </button>
                <p className="text-body-small text-gray-600">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
