'use client';

import { useState, useEffect } from 'react';
import { healthCheck } from '@/lib/api';

export default function TestApiPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setStatus('loading');
    setError(null);
    
    const result = await healthCheck();
    
    if (result.error) {
      setStatus('error');
      setError(result.error);
    } else {
      setStatus('success');
      setResponse(result.data);
    }
  };

  return (
    <main className="min-h-screen bg-background section-padding">
      <div className="container-medium">
        <h1 className="text-section mb-8">API Connection Test</h1>
        
        <div className="card space-y-6">
          <div>
            <h2 className="text-card mb-4">Backend Health Check</h2>
            <p className="text-body text-gray-600 mb-4">
              Testing connection to: <code className="bg-surface-light px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}</code>
            </p>
          </div>

          <div className="space-y-4">
            {status === 'loading' && (
              <div className="bg-surface-light p-4 rounded-xl">
                <p className="text-body">⏳ Connecting to backend...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2">✅ Connection Successful!</h3>
                <pre className="bg-white p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">❌ Connection Failed</h3>
                <p className="text-body text-red-700 mb-3">{error}</p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold mb-2">Troubleshooting:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Ensure backend is running on port 5001</li>
                    <li>Check CORS configuration in backend</li>
                    <li>Verify NEXT_PUBLIC_API_URL in .env.local</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={testConnection}
            className="btn-primary"
          >
            Test Connection Again
          </button>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Setup Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-body text-gray-600">
              <li>Install backend dependencies: <code className="bg-surface-light px-2 py-1 rounded text-sm">cd backend && pip install -r requirements.txt</code></li>
              <li>Start backend server: <code className="bg-surface-light px-2 py-1 rounded text-sm">python app.py</code></li>
              <li>Backend should be running at: <code className="bg-surface-light px-2 py-1 rounded text-sm">http://localhost:5001</code></li>
              <li>Refresh this page to test the connection</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
