'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signInWithGoogle } from '@/actions/auth';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const result = await signInWithGoogle();
    if (result.url) window.location.href = result.url;
    else if (result.error) setError(result.error);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Image src="/logo-flag.png" alt="Pristine Detailers" width={48} height={48} style={{ marginBottom: 16 }} />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0A0A0A', margin: '0 0 8px' }}>Welcome back</h1>
          <p style={{ fontSize: 15, color: '#6B6B6B', margin: 0 }}>Sign in to your Pristine portal</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0EDE8' }}>
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAF8' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAF8' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#9B7A28' : '#C89B37', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E5E0D8' }} />
            <span style={{ fontSize: 13, color: '#9CA3AF' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#E5E0D8' }} />
          </div>

          <button
            onClick={handleGoogle}
            style={{ width: '100%', padding: '11px', background: '#fff', border: '1.5px solid #E5E0D8', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#374151' }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.4 5.6-5 7.3v6h8c4.8-4.4 7.3-10.9 7.3-17.4z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8-6c-2.1 1.4-4.8 2.2-7.9 2.2-6.1 0-11.2-4.1-13.1-9.6H2.7v6.2C6.7 42.6 14.8 48 24 48z"/><path fill="#FBBC05" d="M10.9 28.8A14.3 14.3 0 0 1 10.9 24v-.1a14.3 14.3 0 0 1 0-4.7v-6.2H2.7A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.9l8.2-6.1z"/><path fill="#EA4335" d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.7-6.7C35.9 2.4 30.5 0 24 0 14.8 0 6.7 5.4 2.7 13.1l8.2 6.1C12.8 13.6 17.9 9.5 24 9.5z"/></svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6B6B6B' }}>
          {"Don't have an account? "}
          <Link href="/signup" style={{ color: '#C89B37', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
