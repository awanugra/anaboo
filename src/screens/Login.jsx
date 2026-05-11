import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function Login({ navigate, login }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = () => {
    setError('')
    if (!email.includes('@')) return setError('Format email belum benar')
    if (password.length < 6)   return setError('Password minimal 6 karakter')
    login(email, password)
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      {/* Hero — logo only, no cat illustration */}
      <div className="bg-brand-peach-lt flex flex-col items-center pt-20 pb-12 gap-3 relative overflow-hidden">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-brand-orange/20" />
        <div className="absolute -bottom-12 -right-10 w-40 h-40 rounded-full bg-brand-orange/15" />
        <div className="relative flex flex-col items-center gap-3">
        <img src="/anaboo-logo.svg" alt="Anaboo" className="h-10 animate-float" />
        <p className="text-[14px] font-semibold text-slate-700">Teman perawatan anabulmu 🐾</p>
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col gap-4">
        <p className="font-display text-[22px] font-extrabold text-slate-700">Masuk</p>

        {/* Google */}
        <button
          onClick={() => {}}
          className="flex items-center justify-center gap-3 w-full border border-slate-200 rounded-xl py-3 text-[14px] font-bold text-slate-700 bg-white active:bg-slate-50 transition-all active:scale-[0.98]"
        >
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[12px] font-bold text-slate-500">atau</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-slate-500">Email</label>
          <Input
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-slate-500">Password</label>
          <div className="relative">
            <Input
              type={showPass ? 'text' : 'password'}
              placeholder="Masukkan password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 active:text-slate-500"
            >
              <EyeIcon open={showPass} />
            </button>
          </div>
          <button
            onClick={() => navigate('forgot-password')}
            className="self-end text-[12px] font-bold text-brand-orange active:opacity-70"
          >
            Lupa password?
          </button>
        </div>

        {error && (
          <p className="text-[12px] font-semibold text-brand-red text-center animate-fadeUp">{error}</p>
        )}

        <Button onClick={handleSubmit}>Masuk</Button>

        {/* Footer */}
        <p className="text-center text-[14px] font-semibold text-slate-500 mt-1">
          Belum punya akun?{' '}
          <button onClick={() => navigate('register')} className="font-extrabold text-slate-700 active:opacity-70">
            Daftar
          </button>
        </p>
      </div>
    </div>
  )
}
