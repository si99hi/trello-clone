'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

type Step = 'requestOtp' | 'verifyAndCreate';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('requestOtp');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.checkEmail(email);
      if (res.exists) {
        setError('Account already exists. Please sign in.');
        return;
      }
      setStep('verifyAndCreate');
      setMessage(res.message || 'OTP sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.signup({ email, otp, name, password });
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Create your account</h1>
        <p className="text-sm text-[#5E6C84] mb-6">Sign up to start managing boards and cards.</p>

        {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">{message}</p>}
        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</p>}

        {step === 'requestOtp' ? (
          <form onSubmit={requestOtp} className="space-y-4">
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
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={createAccount} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              readOnly
              className="w-full border border-[#DFE1E6] rounded p-2.5 bg-gray-50 text-[#5E6C84]"
            />
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full border border-[#DFE1E6] rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0C66E4]"
            />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
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
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
        )}

        <div className="mt-5 text-sm flex justify-between">
          <Link href="/signin" className="text-[#0C66E4] hover:underline">
            Already have an account?
          </Link>
          {step === 'verifyAndCreate' && (
            <button
              type="button"
              onClick={() => setStep('requestOtp')}
              className="text-[#0C66E4] hover:underline"
            >
              Change email
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
