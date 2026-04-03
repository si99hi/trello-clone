'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.forgotPassword(email);
      setMessage(res.message || 'OTP sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Could not send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Forgot password</h1>
        <p className="text-sm text-[#5E6C84] mb-6">Enter your email and we will send an OTP.</p>

        {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">{message}</p>}
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C66E4] hover:bg-[#0052CC] text-white rounded p-2.5 font-semibold disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Send reset OTP'}
          </button>
        </form>

        <div className="mt-5 text-sm flex justify-between">
          <Link href="/reset-password" className="text-[#0C66E4] hover:underline">
            Already have OTP?
          </Link>
          <Link href="/signin" className="text-[#0C66E4] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
