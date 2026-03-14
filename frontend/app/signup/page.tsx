'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Step = 'email' | 'login' | 'signup';

export default function Signup() {
  const router = useRouter();
  
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const res = await api.checkEmail(email);
      if (res.exists) {
        setStep('login');
      } else {
        setStep('signup');
        setMessage(res.message || 'OTP sent to your email.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await api.login({ email, password });
      // In a real app we'd save the token and user to context/storage
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !name || !password) return;

    setLoading(true);
    setError('');
    
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 relative overflow-hidden font-sans">
      
      {/* Decorative Illustrations - Left */}
      <div className="absolute left-0 bottom-0 top-auto xl:block hidden w-1/3 pointer-events-none pb-12">
        <div className="h-64 w-80 absolute bottom-0 -left-10 opacity-90 scale-125 transform translate-y-20">
             <Image
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/default-assets/b9f4e2b027b1376df1733eedf67344de/left-illustration.svg"
                alt="Productivity left illustration"
                fill
                className="object-contain object-bottom"
                priority
            />
        </div>
      </div>

       {/* Decorative Illustrations - Right */}
       <div className="absolute right-0 bottom-0 top-auto xl:block hidden w-1/3 pointer-events-none pb-12">
        <div className="h-64 w-80 absolute bottom-0 -right-10 opacity-90 scale-125 transform translate-y-20">
             <Image
                 src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/default-assets/ebbb3a7f8008266205e468ff8fd8f1af/right-illustration.svg"
                alt="Productivity right illustration"
                fill
                className="object-contain object-bottom"
                priority
            />
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 p-6 md:p-0">
        
        {/* Trello Logo Header */}
        <div className="flex justify-center mb-8 w-full">
            <div className="flex items-center text-[#253858] text-[40px] font-bold tracking-tight">
                <svg className="w-10 h-10 mr-2 text-[#0C66E4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM10 16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V16ZM18 11C18 11.5523 17.5523 12 17 12H15C14.4477 12 14 11.5523 14 11V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V11Z" />
                </svg>
                Trello
            </div>
        </div>

        {/* Login Card */}
        <div className="bg-white py-10 px-8 shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-lg w-full max-w-[400px] mx-auto border border-gray-100">
          
          <h5 className="text-[#5E6C84] text-center text-[16px] font-bold mb-6">
            {step === 'email' ? 'Log in to continue' : step === 'login' ? 'Log in to Trello' : 'Sign up for your account'}
          </h5>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded">
              {message}
            </div>
          )}

          <form 
            className="space-y-4" 
            onSubmit={step === 'email' ? handleEmailCheck : step === 'login' ? handleLogin : handleSignup}
          >
            <div>
              <div className="flex items-center mb-1">
                 <label htmlFor="email" className="block text-[12px] font-bold text-[#5E6C84]">
                    Email <span className="text-red-500">*</span>
                 </label>
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={step !== 'email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`appearance-none block w-full px-3 py-2 border-2 border-[${step === 'email' ? '#0C66E4' : '#DFE1E6'}] rounded outline-none text-[#172B4D] placeholder-gray-400 bg-${step === 'email' ? 'white' : 'gray-50'} shadow-sm text-sm focus:bg-white transition-colors`}
                />
              </div>
            </div>

            {step === 'signup' && (
              <>
                <div>
                  <div className="mt-1">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="appearance-none block w-full px-3 py-2 border-2 border-[#DFE1E6] focus:border-[#0C66E4] rounded outline-none text-[#172B4D] placeholder-gray-400 bg-white shadow-sm text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="appearance-none block w-full px-3 py-2 border-2 border-[#DFE1E6] focus:border-[#0C66E4] rounded outline-none text-[#172B4D] placeholder-gray-400 bg-white shadow-sm text-sm transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {(step === 'login' || step === 'signup') && (
              <div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="appearance-none block w-full px-3 py-2 border-2 border-[#DFE1E6] focus:border-[#0C66E4] rounded outline-none text-[#172B4D] placeholder-gray-400 bg-white shadow-sm text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 'email' && (
              <div className="flex items-center mt-3 mb-6">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#0C66E4] focus:ring-[#0C66E4] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#5E6C84]">
                  Remember me 
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#8777D9] text-white text-[10px] font-bold ml-1 cursor-help leading-none" title="We will remember your login on this device for 30 days">
                      i
                  </span>
                </label>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-[10px] px-4 border border-transparent rounded shadow-sm text-[16px] font-bold text-white bg-[#0C66E4] hover:bg-[#0052CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C66E4] transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Please wait...' : step === 'email' ? 'Continue' : step === 'login' ? 'Log in' : 'Sign up'}
              </button>
            </div>
            
            {(step === 'login' || step === 'signup') && (
              <div className="text-center mt-2">
                 <button 
                  type="button" 
                  onClick={() => { setStep('email'); setPassword(''); setOtp(''); setMessage(''); setError(''); }}
                  className="text-sm text-[#0C66E4] hover:underline"
                 >
                   Use a different email
                 </button>
              </div>
            )}
            
          </form>

          {step === 'email' && (
            <>
              <div className="mt-6 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-transparent" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#5E6C84] text-[14px]">Or continue with:</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                 <SecondaryLoginButton provider="Google" icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                 <div className="flex justify-center mt-4">
                     <Link href="#" className="text-[14px] text-[#0C66E4] hover:underline hover:text-[#0052CC]">Can't log in?</Link>
                 </div>
              </div>
            </>
          )}
          
          <div className="text-center mt-8 space-x-4">
               <span className="text-[12px] text-gray-400 cursor-pointer hover:underline">Privacy Policy</span>
               <span className="text-[12px] text-gray-400 cursor-pointer hover:underline">Terms of Service</span>
          </div>

        </div>
      </div>
    </div>
  );
}

function SecondaryLoginButton({ provider, icon }: { provider: string, icon: string }) {
    return (
        <button
            type="button"
            className="w-full flex justify-center items-center py-2 px-4 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-2 border-[#DFE1E6] rounded text-[14px] font-bold text-[#5E6C84] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C66E4] h-10 transition-colors"
        >
            {icon.includes('svg') ? (
               <img src={icon} alt={`${provider} logo`} className="w-4 h-4 mr-2" />
            ) : null}
            {provider}
        </button>
    );
}
