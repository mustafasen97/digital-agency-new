'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, type License, type SupportTicket } from '@/lib/auth-context'
import {
  User, ShieldCheck, Key, Download, LogOut, Copy,
  CheckCircle2, XCircle, Clock, AlertTriangle, Search,
  Loader2, ChevronRight, Package, Calendar, Globe,
  Settings, Bell, Lock, Mail, AtSign, Phone,
  MessageSquare, Plus, ChevronDown, Send, Pencil, X,
  Check, LifeBuoy,
} from 'lucide-react'

// ─── Icons ────────────────────────────────────────────────────────────────────
function GoogleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#1877F2" />
      <path d="M16.5 12H14V10.5C14 9.95 14.45 9.5 15 9.5H16.5V7H14C12.34 7 11 8.34 11 10V12H9V14.5H11V21H13.5V14.5H15.5L16.5 12Z" fill="white" />
    </svg>
  )
}

// ─── Configs ──────────────────────────────────────────────────────────────────
const statusConfig: Record<License['status'], { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  active:    { label: 'Aktif',           color: '#059669', bg: '#ECFDF5', icon: CheckCircle2 },
  expired:   { label: 'Süresi Doldu',    color: '#DC2626', bg: '#FEF2F2', icon: XCircle },
  suspended: { label: 'Askıya Alındı',   color: '#D97706', bg: '#FFFBEB', icon: AlertTriangle },
}

const typeConfig: Record<License['type'], { color: string; bg: string }> = {
  Standart:    { color: '#3B82F6', bg: '#EFF6FF' },
  Profesyonel: { color: '#FF6B35', bg: '#FFF3EE' },
  Kurumsal:    { color: '#7C3AED', bg: '#F5F3FF' },
}

const ticketStatusConfig: Record<SupportTicket['status'], { label: string; color: string; bg: string }> = {
  open:        { label: 'Açık',         color: '#2563EB', bg: '#EFF6FF' },
  'in-progress': { label: 'İşlemde',    color: '#D97706', bg: '#FFFBEB' },
  closed:      { label: 'Kapatıldı',   color: '#6B7280', bg: '#F3F4F6' },
}

const priorityConfig: Record<SupportTicket['priority'], { label: string; color: string }> = {
  low:    { label: 'Düşük',   color: '#6B7280' },
  medium: { label: 'Orta',    color: '#D97706' },
  high:   { label: 'Yüksek',  color: '#DC2626' },
}

type SidebarTab = 'overview' | 'licenses' | 'verify' | 'support' | 'settings'

// ─── License Card ─────────────────────────────────────────────────────────────
function LicenseCard({ lic }: { lic: License }) {
  const st = statusConfig[lic.status]
  const ty = typeConfig[lic.type]
  const StatusIcon = st.icon
  const [copied, setCopied] = useState(false)

  function copyKey() {
    navigator.clipboard.writeText(lic.key).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF3EE] flex items-center justify-center shrink-0">
            <Package size={18} className="text-[#FF6B35]" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#1A1A2E] leading-tight">{lic.product}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ color: ty.color, backgroundColor: ty.bg }}>{lic.type}</span>
              <span className="text-[11px] text-[#9CA3AF]">v{lic.version}</span>
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ color: st.color, backgroundColor: st.bg }}>
          <StatusIcon size={12} aria-hidden="true" />
          {st.label}
        </span>
      </div>
      <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-3 mb-4">
        <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1.5">Lisans Anahtarı</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-[12px] font-mono text-[#1A1A2E] break-all">{lic.key}</code>
          <button onClick={copyKey} aria-label="Lisans anahtarını kopyala" className="shrink-0 p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-[#6B7280] hover:text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
            {copied ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[12px] mb-4">
        <div className="flex items-center gap-1.5 text-[#6B7280]">
          <Calendar size={12} className="text-[#FF6B35]" aria-hidden="true" />
          <span>Satın Alma: <span className="text-[#1A1A2E] font-medium">{lic.purchasedAt}</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#6B7280]">
          <Clock size={12} className="text-[#FF6B35]" aria-hidden="true" />
          <span>Bitiş: <span className="text-[#1A1A2E] font-medium">{lic.expiresAt}</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#6B7280] col-span-2">
          <Globe size={12} className="text-[#FF6B35]" aria-hidden="true" />
          <span>Domain: <span className="text-[#1A1A2E] font-medium">{lic.domain}</span></span>
        </div>
      </div>
      {lic.status === 'active' && (
        <a href={lic.downloadUrl} className="flex items-center justify-center gap-2 w-full py-2 bg-[#FF6B35] text-white rounded-xl text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
          <Download size={13} aria-hidden="true" />
          İndir
        </a>
      )}
    </div>
  )
}

// ─── Verify License Panel ─────────────────────────────────────────────────────
function VerifyLicensePanel({ verifyLicense }: { verifyLicense: (key: string) => License | null }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<License | null | 'not-found' | 'idle'>('idle')
  const [loading, setLoading] = useState(false)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResult('idle')
    await new Promise((r) => setTimeout(r, 700))
    const found = verifyLicense(query)
    setResult(found ?? 'not-found')
    setLoading(false)
  }

  const st = result && result !== 'idle' && result !== 'not-found' ? statusConfig[(result as License).status] : null
  const StatusIcon = st?.icon

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-1">Lisans Doğrulama</h2>
      <p className="text-[14px] text-[#6B7280] mb-6 leading-relaxed">Lisans anahtarınızı girerek durumunu ve geçerliliğini anında sorgulayabilirsiniz.</p>
      <form onSubmit={handleVerify} className="mb-6">
        <label htmlFor="license-key" className="block text-[13px] font-semibold text-[#374151] mb-2">Lisans Anahtarı</label>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-[#F8F9FA] focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
            <Key size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
            <input id="license-key" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="WTE-2024-XXXX-XXXX-XXXX" className="flex-1 bg-transparent text-[14px] font-mono text-[#1A1A2E] placeholder:text-[#9CA3AF] placeholder:font-sans focus:outline-none" />
          </div>
          <button type="submit" disabled={loading || !query.trim()} className="flex items-center gap-2 px-5 py-3 bg-[#1A1A2E] text-white rounded-xl text-[14px] font-semibold hover:bg-[#252540] transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] shrink-0">
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
            {loading ? 'Sorgulanıyor...' : 'Sorgula'}
          </button>
        </div>
      </form>

      {result === 'not-found' && (
        <div className="flex items-start gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl">
          <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-[15px] font-bold text-red-700">Lisans Bulunamadı</p>
            <p className="text-[13px] text-red-600 mt-0.5">Girdiğiniz anahtar sistemde kayıtlı değil.</p>
          </div>
        </div>
      )}

      {result && result !== 'idle' && result !== 'not-found' && st && StatusIcon && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="bg-[#1A1A2E] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-[16px]">{(result as License).product}</p>
              <p className="text-white/60 text-[12px] mt-0.5">{(result as License).type} Lisans</p>
            </div>
            <span className="flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full" style={{ color: st.color, backgroundColor: st.bg }}>
              <StatusIcon size={13} aria-hidden="true" />
              {st.label}
            </span>
          </div>
          <div className="p-5 bg-white">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Lisans Anahtarı', value: (result as License).key, mono: true },
                { label: 'Versiyon', value: `v${(result as License).version}` },
                { label: 'Satın Alma Tarihi', value: (result as License).purchasedAt },
                { label: 'Bitiş Tarihi', value: (result as License).expiresAt },
                { label: 'Domain', value: (result as License).domain },
                { label: 'Lisans Türü', value: (result as License).type },
              ].map(({ label, value, mono }) => (
                <div key={label} className={label === 'Lisans Anahtarı' ? 'col-span-2' : ''}>
                  <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{label}</p>
                  <p className={`text-[13px] text-[#1A1A2E] font-medium break-all ${mono ? 'font-mono' : ''}`}>{value}</p>
                </div>
              ))}
            </div>
            {(result as License).status === 'active' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-xl text-[13px] text-green-700 font-medium">
                <CheckCircle2 size={14} aria-hidden="true" />
                Bu lisans geçerli ve aktif olarak kullanılabilir.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-[#FFF3EE] border border-[#FFD4BF] rounded-xl">
        <p className="text-[12px] font-bold text-[#FF6B35] mb-1">Demo Lisans Anahtarları</p>
        <div className="flex flex-col gap-1">
          {['WTE-2024-THEME-A1B2-C3D4', 'WTE-2024-PLUG-E5F6-G7H8', 'WTE-2023-SCRP-I9J0-K1L2'].map((k) => (
            <button key={k} type="button" onClick={() => setQuery(k)} className="text-left font-mono text-[12px] text-[#1A1A2E] hover:text-[#FF6B35] transition-colors">
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Support Panel ────────────────────────────────────────────────────────────
function SupportPanel({ tickets, onCreate }: { tickets: SupportTicket[]; onCreate: (s: string, m: string, p: SupportTicket['priority']) => Promise<{ success: boolean; error?: string }> }) {
  const [creating, setCreating] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState<SupportTicket['priority']>('medium')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [openTicket, setOpenTicket] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!subject.trim() || !message.trim()) { setError('Konu ve mesaj zorunludur.'); return }
    setSubmitting(true)
    const res = await onCreate(subject.trim(), message.trim(), priority)
    setSubmitting(false)
    if (!res.success) { setError(res.error || 'Bir hata oluştu.'); return }
    setSuccess('Destek talebiniz oluşturuldu.')
    setCreating(false)
    setSubject(''); setMessage(''); setPriority('medium')
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-[#1A1A2E]">Destek Talepleri</h2>
          <p className="text-[14px] text-[#6B7280] mt-0.5">Sorularınız için destek talebi oluşturun.</p>
        </div>
        <button
          onClick={() => { setCreating(true); setError(''); setSuccess('') }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white rounded-xl text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
        >
          <Plus size={15} aria-hidden="true" />
          Yeni Talep
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-[13px] text-green-700">
          <CheckCircle2 size={15} aria-hidden="true" />
          {success}
        </div>
      )}

      {/* Create form */}
      {creating && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold text-[#1A1A2E]">Yeni Destek Talebi</h3>
            <button onClick={() => setCreating(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280] focus:outline-none" aria-label="Kapat">
              <X size={16} />
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">
              <AlertTriangle size={14} aria-hidden="true" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="ticket-subject" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Konu</label>
              <input
                id="ticket-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Talebinizin konusunu kısaca belirtin"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-[#1A1A2E] bg-[#F8F9FA] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="ticket-priority" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Öncelik</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as SupportTicket['priority'][]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-semibold border transition-all focus:outline-none ${
                      priority === p
                        ? 'border-[#FF6B35] bg-[#FFF3EE] text-[#FF6B35]'
                        : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                    }`}
                    style={priority === p ? {} : { color: priorityConfig[p].color }}
                  >
                    {priorityConfig[p].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="ticket-message" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Mesajınız</label>
              <textarea
                id="ticket-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Sorununuzu veya talebinizi detaylı olarak açıklayın..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-[#1A1A2E] bg-[#F8F9FA] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setCreating(false)} className="px-4 py-2 rounded-xl border border-gray-200 text-[13px] font-medium text-[#6B7280] hover:bg-gray-50 focus:outline-none">
                Vazgeç
              </button>
              <button type="submit" disabled={submitting} className="flex items-center gap-2 px-5 py-2 bg-[#FF6B35] text-white rounded-xl text-[13px] font-semibold hover:bg-[#e55a2b] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {submitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ticket list */}
      {tickets.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
          <LifeBuoy size={40} className="text-gray-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-[16px] font-bold text-[#1A1A2E] mb-1">Henüz destek talebiniz yok</p>
          <p className="text-[14px] text-[#6B7280]">Bir sorunuzla mı karşılaştınız? Yeni talep oluşturun.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => {
            const tst = ticketStatusConfig[ticket.status]
            const pri = priorityConfig[ticket.priority]
            const isOpen = openTicket === ticket.id
            return (
              <div key={ticket.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenTicket(isOpen ? null : ticket.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#F8F9FA] transition-colors focus:outline-none"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[14px] font-bold text-[#1A1A2E] truncate">{ticket.subject}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ color: tst.color, backgroundColor: tst.bg }}>{tst.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#9CA3AF]">
                      <span>{ticket.createdAt}</span>
                      <span style={{ color: pri.color }} className="font-semibold">{pri.label} Öncelik</span>
                      {ticket.replies.length > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare size={11} />
                          {ticket.replies.length} yanıt
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-[#9CA3AF] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5">
                    {/* Original message */}
                    <div className="mt-4 p-4 bg-[#F8F9FA] rounded-xl text-[13px] text-[#374151] leading-relaxed">
                      {ticket.message}
                    </div>
                    {/* Replies */}
                    {ticket.replies.map((reply, i) => (
                      <div key={i} className={`mt-3 p-4 rounded-xl text-[13px] leading-relaxed ${reply.from === 'support' ? 'bg-[#FFF3EE] border border-[#FFD4BF]' : 'bg-[#F8F9FA]'}`}>
                        <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: reply.from === 'support' ? '#FF6B35' : '#6B7280' }}>
                          {reply.from === 'support' ? 'Destek Ekibi' : 'Siz'} · {reply.createdAt}
                        </p>
                        <p className="text-[#374151]">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Settings Panel ───────────────────────────────────────────────────────────
function SettingsPanel() {
  const { user, updateUser, logout, sendPhoneVerification, verifyPhone } = useAuth()
  if (!user) return null

  // Editable fields
  const [firstName, setFirstName] = useState(user.firstName ?? '')
  const [lastName, setLastName] = useState(user.lastName ?? '')
  const [username, setUsername] = useState(user.username ?? '')
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone ?? '')

  // Phone verification flow
  const [phoneStep, setPhoneStep] = useState<'idle' | 'code'>('idle')
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [phoneMsg, setPhoneMsg] = useState('')

  // Profile save
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [editMode, setEditMode] = useState(false)

  // Notification toggles
  const [notifs, setNotifs] = useState([true, true, false])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg(null)
    const res = await updateUser({ firstName, lastName, username, email })
    setSaving(false)
    if (res.success) {
      setSaveMsg({ type: 'success', text: 'Bilgileriniz güncellendi.' })
      setEditMode(false)
    } else {
      setSaveMsg({ type: 'error', text: res.error ?? 'Bir hata oluştu.' })
    }
  }

  async function handleSendCode() {
    if (!phone.trim()) { setPhoneMsg('Telefon numarası girin.'); return }
    setPhoneLoading(true)
    setPhoneMsg('')
    const res = await sendPhoneVerification(phone.trim())
    setPhoneLoading(false)
    if (res.success) { setPhoneStep('code'); setPhoneMsg('Doğrulama kodu gönderildi. (Demo: 123456)') }
    else setPhoneMsg(res.error ?? 'Bir hata oluştu.')
  }

  async function handleVerifyCode() {
    setPhoneLoading(true)
    setPhoneMsg('')
    const res = await verifyPhone(phoneCode)
    setPhoneLoading(false)
    if (res.success) { setPhoneStep('idle'); setPhoneMsg('Telefon numaranız doğrulandı.'); setPhone(user.phone ?? phone) }
    else setPhoneMsg(res.error ?? 'Bir hata oluştu.')
  }

  const providerLabel = user.provider === 'google' ? 'Google' : user.provider === 'facebook' ? 'Facebook' : 'E-posta'

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[20px] font-bold text-[#1A1A2E]">Hesap Ayarları</h2>

      {/* Personal Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-[#1A1A2E] flex items-center gap-2">
            <User size={16} className="text-[#FF6B35]" aria-hidden="true" />
            Kişisel Bilgiler
          </h3>
          {!editMode && (
            <button onClick={() => { setEditMode(true); setSaveMsg(null) }} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#FF6B35] hover:underline focus:outline-none">
              <Pencil size={13} />
              Düzenle
            </button>
          )}
        </div>

        {saveMsg && (
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl text-[13px] ${saveMsg.type === 'success' ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-red-50 border border-red-100 text-red-600'}`}>
            {saveMsg.type === 'success' ? <Check size={14} /> : <X size={14} />}
            {saveMsg.text}
          </div>
        )}

        {editMode ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="s-firstname" className="block text-[12px] font-semibold text-[#6B7280] mb-1">Ad</label>
                <input id="s-firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[14px] bg-[#F8F9FA] text-[#1A1A2E] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all" />
              </div>
              <div>
                <label htmlFor="s-lastname" className="block text-[12px] font-semibold text-[#6B7280] mb-1">Soyad</label>
                <input id="s-lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[14px] bg-[#F8F9FA] text-[#1A1A2E] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="s-username" className="block text-[12px] font-semibold text-[#6B7280] mb-1">Kullanıcı Adı</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#F8F9FA] focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
                <AtSign size={14} className="text-[#9CA3AF] shrink-0" />
                <input id="s-username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] focus:outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="s-email" className="block text-[12px] font-semibold text-[#6B7280] mb-1">E-posta</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#F8F9FA] focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
                <Mail size={14} className="text-[#9CA3AF] shrink-0" />
                <input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button type="button" onClick={() => { setEditMode(false); setFirstName(user.firstName ?? ''); setLastName(user.lastName ?? ''); setUsername(user.username ?? ''); setEmail(user.email) }} className="px-4 py-2 rounded-xl border border-gray-200 text-[13px] font-medium text-[#6B7280] hover:bg-gray-50 focus:outline-none">
                Vazgeç
              </button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#FF6B35] text-white rounded-xl text-[13px] font-semibold hover:bg-[#e55a2b] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Ad', value: user.firstName ?? '—', icon: User },
              { label: 'Soyad', value: user.lastName ?? '—', icon: User },
              { label: 'Kullanıcı Adı', value: user.username ? `@${user.username}` : '—', icon: AtSign },
              { label: 'E-posta', value: user.email, icon: Mail },
              { label: 'Üyelik Tarihi', value: user.joinedAt, icon: Calendar },
              { label: 'Giriş Yöntemi', value: providerLabel, icon: Lock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-[#F8F9FA] rounded-xl p-3.5">
                <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Icon size={11} aria-hidden="true" />
                  {label}
                </p>
                <p className="text-[14px] font-medium text-[#1A1A2E]">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phone Verification */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-1 flex items-center gap-2">
          <Phone size={16} className="text-[#FF6B35]" aria-hidden="true" />
          Telefon Numarası
          {user.phoneVerified && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-1">
              <CheckCircle2 size={10} />
              Doğrulanmış
            </span>
          )}
        </h3>
        <p className="text-[13px] text-[#6B7280] mb-4">
          {user.phoneVerified ? 'Telefon numaranız doğrulandı.' : 'Hesabınızı güvence altına almak için telefon numaranızı ekleyin.'}
        </p>

        {phoneMsg && (
          <div className={`flex items-center gap-2 mb-3 p-3 rounded-xl text-[13px] ${phoneMsg.includes('doğrulandı') || phoneMsg.includes('gönderildi') ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-red-50 border border-red-100 text-red-600'}`}>
            {phoneMsg.includes('doğrulandı') || phoneMsg.includes('gönderildi') ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
            {phoneMsg}
          </div>
        )}

        {!user.phoneVerified && (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#F8F9FA] focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
              <Phone size={14} className="text-[#9CA3AF] shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                disabled={phoneStep === 'code'}
                className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none disabled:opacity-60"
              />
            </div>
            {phoneStep === 'idle' ? (
              <button onClick={handleSendCode} disabled={phoneLoading} className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A2E] text-white rounded-xl text-[13px] font-semibold hover:bg-[#252540] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] shrink-0">
                {phoneLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {phoneLoading ? 'Gönderiliyor...' : 'Kod Gönder'}
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-24 border border-gray-200 rounded-xl px-3 py-2.5 text-[14px] font-mono text-center bg-[#F8F9FA] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
                />
                <button onClick={handleVerifyCode} disabled={phoneLoading || phoneCode.length < 4} className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-xl text-[13px] font-semibold hover:bg-green-700 disabled:opacity-60 focus:outline-none">
                  {phoneLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  Doğrula
                </button>
              </div>
            )}
          </div>
        )}

        {user.phoneVerified && user.phone && (
          <p className="text-[14px] font-medium text-[#1A1A2E]">{user.phone}</p>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
          <Bell size={16} className="text-[#FF6B35]" aria-hidden="true" />
          Bildirim Tercihleri
        </h3>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Lisans bitiş hatırlatıcıları', desc: 'Lisansınız bitmeden 30 gün önce e-posta alın' },
            { label: 'Ürün güncellemeleri', desc: 'Satın aldığınız ürünlerde güncelleme olduğunda haberdar olun' },
            { label: 'Kampanya bildirimleri', desc: 'İndirim ve kampanyalardan haberdar olun' },
          ].map(({ label, desc }, i) => (
            <div key={label} className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#F8F9FA] transition-colors">
              <div>
                <p className="text-[14px] font-medium text-[#1A1A2E]">{label}</p>
                <p className="text-[12px] text-[#9CA3AF]">{desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifs[i]}
                onClick={() => setNotifs((prev) => { const n = [...prev]; n[i] = !n[i]; return n })}
                className={`w-10 h-5 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${notifs[i] ? 'bg-[#FF6B35]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifs[i] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-[15px] font-bold text-red-600 mb-3 flex items-center gap-2">
          <AlertTriangle size={16} aria-hidden="true" />
          Hesap İşlemleri
        </h3>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-[14px] font-semibold hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400">
          <LogOut size={15} aria-hidden="true" />
          Oturumu Kapat
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const { user, loading, logout, verifyLicense, createSupportTicket } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SidebarTab>('overview')

  useEffect(() => {
    if (!loading && !user) router.replace('/giris?redirect=/hesabim')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#FF6B35]" />
      </div>
    )
  }

  const activeLicenses = user.licenses.filter((l) => l.status === 'active').length
  const totalLicenses = user.licenses.length
  const openTickets = (user.supportTickets ?? []).filter((t) => t.status !== 'closed').length

  const providerIcon = user.provider === 'google'
    ? <GoogleIcon size={13} />
    : user.provider === 'facebook'
    ? <FacebookIcon size={13} />
    : null

  const sidebarItems: { id: SidebarTab; label: string; icon: typeof User; badge?: number }[] = [
    { id: 'overview',  label: 'Genel Bakış',       icon: User },
    { id: 'licenses',  label: 'Lisanslarım',        icon: ShieldCheck },
    { id: 'verify',    label: 'Lisans Sorgula',     icon: Key },
    { id: 'support',   label: 'Destek Talepleri',   icon: LifeBuoy, badge: openTickets },
    { id: 'settings',  label: 'Hesap Ayarları',     icon: Settings },
  ]

  return (
    <section className="bg-[#F8F9FA] min-h-[calc(100vh-140px)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[13px] text-[#6B7280]">
          <span>Ana Sayfa</span>
          <ChevronRight size={13} aria-hidden="true" />
          <span className="text-[#1A1A2E] font-medium">Hesabım</span>
        </div>

        {/* Phone warning banner */}
        {!user.phoneVerified && (
          <div className="mb-5 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Phone size={17} className="text-amber-600" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-amber-800">Telefon numaranızı ekleyin</p>
              <p className="text-[13px] text-amber-700 mt-0.5">Hesabınızı güvence altına almak ve önemli bildirimleri almak için bir telefon numarası ekleyin.</p>
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className="shrink-0 px-4 py-2 bg-amber-500 text-white rounded-xl text-[13px] font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Ekle
            </button>
          </div>
        )}

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A2E] flex items-center justify-center text-white text-[18px] font-bold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#1A1A2E] truncate">{user.name}</p>
                  {user.username && <p className="text-[12px] text-[#9CA3AF] truncate">@{user.username}</p>}
                  <p className="text-[12px] text-[#6B7280] truncate">{user.email}</p>
                  {user.provider && user.provider !== 'email' && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded-full">
                      {providerIcon}
                      {user.provider === 'google' ? 'Google' : 'Facebook'} ile bağlı
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#FFF3EE] rounded-xl p-2.5 text-center">
                  <p className="text-[18px] font-black text-[#FF6B35]">{activeLicenses}</p>
                  <p className="text-[11px] text-[#6B7280] font-medium">Aktif</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-2.5 text-center">
                  <p className="text-[18px] font-black text-[#1A1A2E]">{totalLicenses}</p>
                  <p className="text-[11px] text-[#6B7280] font-medium">Toplam</p>
                </div>
              </div>
            </div>

            <nav className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm" aria-label="Hesap navigasyonu">
              {sidebarItems.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  aria-current={activeTab === id ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                    activeTab === id ? 'bg-[#FFF3EE] text-[#FF6B35]' : 'text-[#374151] hover:bg-gray-50 hover:text-[#1A1A2E]'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                  {typeof badge === 'number' && badge > 0 && (
                    <span className="ml-auto bg-[#FF6B35] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                  {activeTab === id && !badge && <ChevronRight size={13} className="ml-auto" aria-hidden="true" />}
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#DC2626] hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-400">
                  <LogOut size={16} aria-hidden="true" />
                  Çıkış Yap
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div>
                <h1 className="text-[22px] font-black text-[#1A1A2E] mb-1">Merhaba, {user.firstName ?? user.name.split(' ')[0]}</h1>
                <p className="text-[14px] text-[#6B7280] mb-6 leading-relaxed">Hesabınıza hoş geldiniz. Lisanslarınızı ve hesap bilgilerinizi buradan yönetebilirsiniz.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Toplam Lisans',  value: totalLicenses, color: '#1A1A2E', bg: '#F8F9FA' },
                    { label: 'Aktif Lisans',   value: activeLicenses, color: '#FF6B35', bg: '#FFF3EE' },
                    { label: 'Süresi Dolan',   value: user.licenses.filter((l) => l.status === 'expired').length, color: '#DC2626', bg: '#FEF2F2' },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className="rounded-2xl border border-gray-100 p-5 text-center bg-white shadow-sm">
                      <p className="text-[30px] font-black" style={{ color }}>{value}</p>
                      <p className="text-[13px] text-[#6B7280] font-medium mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {user.licenses.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-[16px] font-bold text-[#1A1A2E]">Son Lisanslar</h2>
                      <button onClick={() => setActiveTab('licenses')} className="text-[13px] text-[#FF6B35] font-semibold hover:underline focus:outline-none">Tümünü Gör</button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {user.licenses.slice(0, 2).map((lic) => {
                        const st = statusConfig[lic.status]
                        const StatusIcon = st.icon
                        return (
                          <div key={lic.key} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-[#FFF3EE] flex items-center justify-center shrink-0">
                              <Package size={18} className="text-[#FF6B35]" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-bold text-[#1A1A2E] truncate">{lic.product}</p>
                              <p className="text-[12px] font-mono text-[#9CA3AF] truncate">{lic.key}</p>
                            </div>
                            <span className="flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ color: st.color, backgroundColor: st.bg }}>
                              <StatusIcon size={11} aria-hidden="true" />
                              {st.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
                    <ShieldCheck size={36} className="text-gray-300 mx-auto mb-3" aria-hidden="true" />
                    <p className="text-[15px] font-bold text-[#1A1A2E] mb-1">Henüz lisansınız yok</p>
                    <p className="text-[13px] text-[#6B7280]">Ürünlerimizi inceleyerek lisans edinebilirsiniz.</p>
                  </div>
                )}

                <div className="mt-6 bg-[#1A1A2E] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <p className="text-white font-bold text-[15px]">Lisans Anahtarınızı Sorgulayın</p>
                    <p className="text-white/60 text-[13px] mt-0.5">Satın aldığınız ürünün lisansını anında doğrulayın.</p>
                  </div>
                  <button onClick={() => setActiveTab('verify')} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35] text-white rounded-xl text-[14px] font-semibold hover:bg-[#e55a2b] transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                    <Key size={14} aria-hidden="true" />
                    Lisans Sorgula
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'licenses' && (
              <div>
                <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-1">Lisanslarım</h2>
                <p className="text-[14px] text-[#6B7280] mb-6">Satın aldığınız tüm ürünlerin lisans bilgileri.</p>
                {user.licenses.length === 0 ? (
                  <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                    <ShieldCheck size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-[16px] font-bold text-[#1A1A2E] mb-2">Henüz lisansınız bulunmuyor</p>
                    <p className="text-[14px] text-[#6B7280]">Ürünlerimizi satın alarak lisans edinebilirsiniz.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {user.licenses.map((lic) => <LicenseCard key={lic.key} lic={lic} />)}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'verify' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <VerifyLicensePanel verifyLicense={verifyLicense} />
              </div>
            )}

            {activeTab === 'support' && (
              <SupportPanel tickets={user.supportTickets ?? []} onCreate={createSupportTicket} />
            )}

            {activeTab === 'settings' && <SettingsPanel />}
          </main>
        </div>
      </div>
    </section>
  )
}
