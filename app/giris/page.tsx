'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import {
  Eye, EyeOff, Mail, Lock, User, AtSign, ArrowRight,
  CheckCircle2, AlertCircle, Loader2, ShieldCheck,
} from 'lucide-react'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#1877F2" />
      <path d="M16.5 12H14V10.5C14 9.95 14.45 9.5 15 9.5H16.5V7H14C12.34 7 11 8.34 11 10V12H9V14.5H11V21H13.5V14.5H15.5L16.5 12Z" fill="white" />
    </svg>
  )
}

type Tab = 'login' | 'register'

export default function AuthPage() {
  const router = useRouter()
  const params = useSearchParams()
  const { user, login, register, loginWithProvider, loading } = useAuth()

  const [tab, setTab] = useState<Tab>((params.get('tab') as Tab) || 'login')
  const [showPass, setShowPass] = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [providerLoading, setProviderLoading] = useState<'google' | 'facebook' | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [regFirstName, setRegFirstName] = useState('')
  const [regLastName, setRegLastName] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('')

  const redirectTo = params.get('redirect') || '/hesabim'

  useEffect(() => {
    if (!loading && user) router.replace(redirectTo)
  }, [user, loading, router, redirectTo])

  function switchTab(t: Tab) {
    setTab(t)
    setError('')
    setSuccess('')
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const res = await login(loginEmail, loginPassword)
    setSubmitting(false)
    if (!res.success) { setError(res.error || 'Bir hata oluştu.'); return }
    router.replace(redirectTo)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!regFirstName.trim() || !regLastName.trim()) { setError('Ad ve soyad zorunludur.'); return }
    if (!regUsername.trim()) { setError('Kullanıcı adı zorunludur.'); return }
    if (!/^[a-z0-9_]{3,20}$/.test(regUsername)) {
      setError('Kullanıcı adı 3-20 karakter, yalnızca küçük harf, rakam ve alt çizgi içerebilir.')
      return
    }
    if (regPassword !== regPasswordConfirm) { setError('Şifreler eşleşmiyor.'); return }
    if (regPassword.length < 6) { setError('Şifre en az 6 karakter olmalıdır.'); return }
    setSubmitting(true)
    const res = await register(regFirstName.trim(), regLastName.trim(), regUsername.trim(), regEmail, regPassword)
    setSubmitting(false)
    if (!res.success) { setError(res.error || 'Bir hata oluştu.'); return }
    setSuccess('Hesabınız oluşturuldu! Yönlendiriliyorsunuz...')
    setTimeout(() => router.replace(redirectTo), 1200)
  }

  async function handleProvider(provider: 'google' | 'facebook') {
    setError('')
    setProviderLoading(provider)
    const res = await loginWithProvider(provider)
    setProviderLoading(null)
    if (!res.success) { setError(res.error || 'Bir hata oluştu.'); return }
    router.replace(redirectTo)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#FF6B35]" />
      </div>
    )
  }

  return (
    <section className="min-h-[calc(100vh-140px)] bg-[#F8F9FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-[#1A1A2E] px-8 py-7">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[#FF6B35] font-mono text-xl font-black" aria-hidden="true">{'</>'}</span>
              <span className="text-white text-[17px] font-extrabold">
                Web<span className="text-[#FF6B35]">Tasarım</span>Evi
              </span>
            </div>
            <p className="text-white/60 text-[13px] mt-1 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#FF6B35]" aria-hidden="true" />
              Güvenli hesap girişi
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex border-b border-gray-100" role="tablist">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                role="tab"
                aria-selected={tab === t}
                className={`flex-1 py-3.5 text-[14px] font-semibold transition-colors focus:outline-none ${
                  tab === t
                    ? 'text-[#FF6B35] border-b-2 border-[#FF6B35] bg-[#FFF3EE]'
                    : 'text-[#6B7280] hover:text-[#1A1A2E]'
                }`}
              >
                {t === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            ))}
          </div>

          <div className="px-8 py-7">
            {/* Social buttons */}
            <div className="flex flex-col gap-2.5 mb-6">
              <button
                onClick={() => handleProvider('google')}
                disabled={!!providerLoading || submitting}
                className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-200 rounded-xl text-[14px] font-medium text-[#374151] hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                {providerLoading === 'google'
                  ? <Loader2 size={18} className="animate-spin" />
                  : <GoogleIcon />}
                Google ile {tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
              <button
                onClick={() => handleProvider('facebook')}
                disabled={!!providerLoading || submitting}
                className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-200 rounded-xl text-[14px] font-medium text-[#374151] hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                {providerLoading === 'facebook'
                  ? <Loader2 size={18} className="animate-spin" />
                  : <FacebookIcon />}
                Facebook ile {tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] text-[#9CA3AF] font-medium">veya e-posta ile</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Alerts */}
            {error && (
              <div className="flex items-start gap-2.5 mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">
                <AlertCircle size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-start gap-2.5 mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-[13px] text-green-700">
                <CheckCircle2 size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
                {success}
              </div>
            )}

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} noValidate>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="login-email" className="block text-[13px] font-semibold text-[#374151] mb-1.5">E-posta</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <Mail size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="login-password" className="text-[13px] font-semibold text-[#374151]">Şifre</label>
                      <button type="button" className="text-[12px] text-[#FF6B35] hover:underline focus:outline-none">
                        Şifremi Unuttum
                      </button>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <Lock size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="login-password"
                        type={showPass ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        aria-label={showPass ? 'Şifreyi gizle' : 'Şifreyi göster'}
                        className="text-[#9CA3AF] hover:text-[#FF6B35] transition-colors focus:outline-none"
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#e55a2b] transition-all disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    {submitting ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} />}
                    {submitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </button>
                </div>
                <p className="mt-4 text-center text-[13px] text-[#6B7280]">
                  Demo: <span className="font-mono text-[#1A1A2E]">demo@webtasarimevi.com</span> / <span className="font-mono text-[#1A1A2E]">demo1234</span>
                </p>
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} noValidate>
                <div className="flex flex-col gap-4">
                  {/* First + Last name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="reg-firstname" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Ad</label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                        <User size={14} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                        <input
                          id="reg-firstname"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          placeholder="Adınız"
                          className="flex-1 min-w-0 bg-transparent text-[13px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="reg-lastname" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Soyad</label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                        <User size={14} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                        <input
                          id="reg-lastname"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          placeholder="Soyadınız"
                          className="flex-1 min-w-0 bg-transparent text-[13px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label htmlFor="reg-username" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                      Kullanıcı Adı
                    </label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <AtSign size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="reg-username"
                        type="text"
                        autoComplete="username"
                        required
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="kullanici_adi"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-[#9CA3AF]">3-20 karakter, küçük harf, rakam ve alt çizgi</p>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reg-email" className="block text-[13px] font-semibold text-[#374151] mb-1.5">E-posta</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <Mail size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="reg-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="reg-password" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Şifre</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <Lock size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="reg-password"
                        type={showPass ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="En az 6 karakter"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        aria-label={showPass ? 'Şifreyi gizle' : 'Şifreyi göster'}
                        className="text-[#9CA3AF] hover:text-[#FF6B35] transition-colors focus:outline-none"
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Password confirm */}
                  <div>
                    <label htmlFor="reg-password-confirm" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Şifre Tekrar</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all bg-[#F8F9FA]">
                      <Lock size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        id="reg-password-confirm"
                        type={showPassConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={regPasswordConfirm}
                        onChange={(e) => setRegPasswordConfirm(e.target.value)}
                        placeholder="Şifrenizi tekrar girin"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassConfirm(!showPassConfirm)}
                        aria-label={showPassConfirm ? 'Şifreyi gizle' : 'Şifreyi göster'}
                        className="text-[#9CA3AF] hover:text-[#FF6B35] transition-colors focus:outline-none"
                      >
                        {showPassConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#e55a2b] transition-all disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    {submitting ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} />}
                    {submitting ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
                  </button>

                  <p className="text-[12px] text-[#9CA3AF] text-center leading-relaxed">
                    Kayıt olarak{' '}
                    <Link href="/gizlilik" className="text-[#FF6B35] hover:underline">Gizlilik Politikası</Link>{' '}
                    ve{' '}
                    <Link href="/kullanim-kosullari" className="text-[#FF6B35] hover:underline">Kullanım Koşulları</Link>
                    {'\'nı kabul etmiş olursunuz.'}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-[13px] text-[#6B7280]">
          {tab === 'login' ? (
            <>Hesabınız yok mu?{' '}
              <button onClick={() => switchTab('register')} className="text-[#FF6B35] font-semibold hover:underline focus:outline-none">
                Kayıt Olun
              </button>
            </>
          ) : (
            <>Zaten hesabınız var mı?{' '}
              <button onClick={() => switchTab('login')} className="text-[#FF6B35] font-semibold hover:underline focus:outline-none">
                Giriş Yapın
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  )
}
