'use client';

import Image from 'next/image';

export default function DebugLogoPage() {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const constructedUrl = storageUrl 
    ? `${storageUrl}/website-assets/circle-dish-logo.png`
    : 'NOT SET';
  
  const directUrl = 'https://myivpinnellmyezhrqiq.supabase.co/storage/v1/object/public/website-assets/circle-dish-logo.png';

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container-max space-y-8">
        <h1 className="text-3xl font-bold">Logo Debug Page</h1>
        
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <strong>NEXT_PUBLIC_STORAGE_URL:</strong>
                <div className="bg-gray-100 p-2 rounded mt-1 break-all">
                  {storageUrl || '❌ NOT SET'}
                </div>
              </div>
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
                <div className="bg-gray-100 p-2 rounded mt-1 break-all">
                  {supabaseUrl || '❌ NOT SET'}
                </div>
              </div>
              <div>
                <strong>Constructed Logo URL:</strong>
                <div className="bg-gray-100 p-2 rounded mt-1 break-all">
                  {constructedUrl}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Test 1: Direct URL (hardcoded)</h2>
            <p className="text-sm text-gray-600 mb-4">Using the exact Supabase URL:</p>
            <div className="bg-gray-100 p-2 rounded mb-4 text-xs break-all">
              {directUrl}
            </div>
            <div className="border-2 border-blue-500 p-4 rounded">
              <Image
                src={directUrl}
                alt="Circle Dish Logo - Direct URL"
                width={400}
                height={120}
                className="w-auto h-24"
                unoptimized
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Test 2: Using Environment Variable</h2>
            <p className="text-sm text-gray-600 mb-4">Using NEXT_PUBLIC_STORAGE_URL:</p>
            {storageUrl ? (
              <div className="border-2 border-green-500 p-4 rounded">
                <Image
                  src={constructedUrl}
                  alt="Circle Dish Logo - Env Var"
                  width={400}
                  height={120}
                  className="w-auto h-24"
                  unoptimized
                />
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700">
                ❌ NEXT_PUBLIC_STORAGE_URL is not set in Vercel environment variables
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Test 3: Regular img tag</h2>
            <div className="border-2 border-purple-500 p-4 rounded">
              <img 
                src={directUrl}
                alt="Circle Dish Logo - img tag"
                className="h-24 w-auto"
              />
            </div>
          </div>

          <div className="card bg-blue-50 border border-blue-200">
            <h2 className="text-xl font-semibold mb-4">✅ Expected Vercel Environment Variables</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <strong>NEXT_PUBLIC_STORAGE_URL</strong>
                <div className="bg-white p-2 rounded mt-1 break-all">
                  https://myivpinnellmyezhrqiq.supabase.co/storage/v1/object/public
                </div>
              </div>
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_URL</strong>
                <div className="bg-white p-2 rounded mt-1 break-all">
                  https://myivpinnellmyezhrqiq.supabase.co
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 border border-yellow-200">
            <h2 className="text-xl font-semibold mb-4">🔍 Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Check if all three test images above load correctly</li>
              <li>If Test 1 works but Test 2 doesn't, the environment variable is not set</li>
              <li>Go to Vercel → Settings → Environment Variables</li>
              <li>Ensure NEXT_PUBLIC_STORAGE_URL is set for Production, Preview, and Development</li>
              <li>After adding/updating variables, trigger a new deployment</li>
              <li>Environment variables are only loaded at build time, not runtime</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
