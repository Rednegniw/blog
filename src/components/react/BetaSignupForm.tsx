import { useState } from 'react';
import { actions } from 'astro:actions';
import { Button } from '@/components/ui/button';

export default function BetaSignupForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({ error: 'Please enter your email address' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await actions.betaSignup({ email: email.trim() });
      
      if (response.error) {
        setResult({ error: response.error.message });
      } else {
        setResult({ 
          success: true, 
          message: 'Thank you for signing up!' 
        });
        setEmail('');
      }
    } catch (error) {
      setResult({ error: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg border mt-12 flex flex-col gap-4">
        <h3 className="text-lg font-semibold mt-0 mb-0">
          🧪 Join the Beta
        </h3>

      {result?.success ? (
        <div className="text-center py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            I'll send you an email when the beta is ready to test.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isLoading}
            required
          />
          
          {result?.error && (
            <p className="text-red-600 dark:text-red-400 text-sm">
              {result.error}
            </p>
          )}
          
          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign up for beta'
            )}
          </Button>
        </form>
      )}
    </div>
  );
} 