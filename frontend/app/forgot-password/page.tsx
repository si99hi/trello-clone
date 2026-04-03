'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

type Step = 'requestOtp' | 'resetPassword';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('requestOtp');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.forgotPassword(email);
      setMessage(res.message || 'OTP sent to your email.');
      setStep('resetPassword');
    } catch (err: any) {
      setError(err.message || 'Could not send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.resetPassword({ email, otp, password });
      setMessage(res.message || 'Password reset successful');
      setTimeout(() => router.push('/signin'), 800);
    } catch (err: any) {
      setError(err.message || 'Could not reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-[#172B4D] mb-2">Forgot password</h1>
        <p className="text-sm text-[#5E6C84] mb-6">
          {step === 'requestOtp'
            ? 'Enter your email and we will send an OTP.'
            : 'Enter OTP and your new password to reset your account.'}
        </p>

        {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">{message}</p>}
        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</p>}

        {step === 'requestOtp' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
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
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
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
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full border border-[#DFE1E6] rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0C66E4]"
            />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-[#DFE1E6] rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0C66E4]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C66E4] hover:bg-[#0052CC] text-white rounded p-2.5 font-semibold disabled:opacity-70"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        )}

        <div className="mt-5 text-sm flex justify-between">
          {step === 'resetPassword' ? (
            <button
              type="button"
              onClick={() => {
                setStep('requestOtp');
                setOtp('');
                setPassword('');
                setConfirmPassword('');
                setMessage('');
                setError('');
              }}
              className="text-[#0C66E4] hover:underline"
            >
              Use different email
            </button>
          ) : (
            <span />
          )}
          <Link href="/signin" className="text-[#0C66E4] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
