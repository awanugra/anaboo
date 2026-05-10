import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import Icon from '../components/Icon'

export default function ForgotPassword({ navigate }) {
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)

  if (sent) {
    return (
      <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
        <div className="bg-white flex items-center justify-between px-5 py-3.5 flex-shrink-0 border-b border-slate-100">
          <button
            onClick={() => navigate('login')}
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Icon name="back" size={18} />
          </button>
          <p className="font-display text-[16px] font-extrabold text-slate-700 tracking-wide">Lupa Password</p>
          <div className="w-7 h-7" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-yellow/20 flex items-center justify-center">
            <Icon name="bell" size={36} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-display text-[22px] font-extrabold text-slate-700">Cek emailmu!</p>
            <p className="text-[14px] font-semibold text-slate-500 leading-relaxed">
              Link reset password sudah dikirim ke{' '}
              <span className="font-bold text-slate-700">{email}</span>.
              Cek folder spam jika tidak muncul.
            </p>
          </div>
          <Button onClick={() => navigate('login')} variant="ghost">Kembali ke Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-5 py-3.5 flex-shrink-0 border-b border-slate-100">
        <button
          onClick={() => navigate('login')}
          className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Icon name="back" size={18} />
        </button>
        <p className="font-display text-[16px] font-extrabold text-slate-700 tracking-wide">Lupa Password</p>
        <div className="w-7 h-7" />
      </div>

      <div className="flex-1 px-6 pt-10 pb-8 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="w-16 h-16 rounded-full bg-brand-yellow/20 flex items-center justify-center">
            <Icon name="info" size={30} />
          </div>
          <p className="font-display text-[22px] font-extrabold text-slate-700">Reset Password</p>
          <p className="text-[14px] font-semibold text-slate-500 text-center leading-relaxed">
            Masukkan emailmu dan kami akan kirimkan link untuk reset password.
          </p>
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

        <Button onClick={() => email && setSent(true)} disabled={!email}>
          Kirim Link Reset
        </Button>

        <button
          onClick={() => navigate('login')}
          className="text-center text-[14px] font-bold text-slate-500 active:opacity-70 mt-1"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  )
}
