'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Sign in</h1>
        <p className="text-sm text-[#5E6C84] mb-6">Welcome back to your Trello workspace.</p>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-[#DFE1E6] rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0C66E4]"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-[#DFE1E6] rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0C66E4]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C66E4] hover:bg-[#0052CC] text-white rounded p-2.5 font-semibold disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 text-sm flex justify-between">
          <Link href="/forgot-password" className="text-[#0C66E4] hover:underline">
            Forgot password?
          </Link>
          <Link href="/signup" className="text-[#0C66E4] hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
