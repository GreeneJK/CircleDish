export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-hero text-primary">
                Your Family's Living Cookbook
              </h1>
              <p className="text-body-large text-gray-600">
                Stop losing recipes to scattered texts and forgotten recipe cards. 
                Circle Dish brings your family's culinary heritage into one private, 
                beautiful space where traditions live and grow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="section-padding bg-surface-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-section">
                The Recipe Sharing Problem
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-terracotta rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Fragmented Sharing</h3>
                    <p className="text-body text-gray-600">Recipes scattered across emails, texts, and social media</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-terracotta rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Lost Heritage</h3>
                    <p className="text-body text-gray-600">Grandma's handwritten recipes fading away in drawers</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-terracotta rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">No Context</h3>
                    <p className="text-body text-gray-600">Missing stories, variations, and family memories</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-section">
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

      {/* Features Showcase */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-section">
              Built for How Families Actually Cook
            </h2>
            <p className="text-body-large text-gray-600 container-medium">
              Every feature designed to preserve culinary heritage and make sharing effortless
            </p>
          </div>
          
          <div className="bento-grid">
            <div className="bento-item">
              <div className="w-12 h-12 bg-accent-sage rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">👥</span>
              </div>
              <h3 className="text-card mb-3">The Circle Model</h3>
              <p className="text-body text-gray-600 mb-4">
                Create unlimited private groups. Family Circle, Friends Circle, Grilling Circle—each with its own curated collection.
              </p>
              <ul className="text-body-small text-gray-600 space-y-2">
                <li>• Invite via email</li>
                <li>• Join multiple circles</li>
                <li>• Circle-specific privacy</li>
              </ul>
            </div>
            
            <div className="bento-item bento-item-large">
              <div className="w-12 h-12 bg-accent-terracotta rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">📸</span>
              </div>
              <h3 className="text-card mb-3">Effortless Upload</h3>
              <p className="text-body text-gray-600 mb-4">
                Snap a photo of recipe cards or type directly. Our risk-first approach means getting recipes into the system is frictionless.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Photo Upload</h4>
                  <p className="text-body-small text-gray-600">Capture handwritten cards instantly</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Smart Entry</h4>
                  <p className="text-body-small text-gray-600">Structured fields for perfect organization</p>
                </div>
              </div>
            </div>
            
            <div className="bento-item">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className="text-card mb-3">Living Conversations</h3>
              <p className="text-body text-gray-600 mb-4">
                Nested comments with photos. Share variations, ask questions, and celebrate successes together.
              </p>
              <ul className="text-body-small text-gray-600 space-y-2">
                <li>• Threaded discussions</li>
                <li>• Photo comments</li>
                <li>• Circle-only visibility</li>
              </ul>
            </div>
            
            <div className="bento-item">
              <div className="w-12 h-12 bg-surface-blue rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🏷️</span>
              </div>
              <h3 className="text-card mb-3">Smart Organization</h3>
              <p className="text-body text-gray-600 mb-4">
                Label recipes across circles. AI auto-tagging makes finding the perfect dish effortless.
              </p>
              <ul className="text-body-small text-gray-600 space-y-2">
                <li>• Custom categories</li>
                <li>• AI-powered tags</li>
                <li>• Cross-circle search</li>
              </ul>
            </div>
            
            <div className="bento-item bento-item-large">
              <div className="w-12 h-12 bg-accent-slate rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🖨️</span>
              </div>
              <h3 className="text-card mb-3">Kitchen-Ready Printing</h3>
              <p className="text-body text-gray-600 mb-4">
                Clean, standardized recipe format perfect for cooking. No more phones in the kitchen—just printed recipes that work.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Clean Layout</div>
                  <p className="text-body-small text-gray-600">Easy-to-read format</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">One-Page</div>
                  <p className="text-body-small text-gray-600">No flipping pages</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Notes Space</div>
                  <p className="text-body-small text-gray-600">Room for adjustments</p>
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
