"use client"

import { useState } from "react"
import { Code, Save, Copy, RotateCcw } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

type ScriptSection = "head" | "body_open" | "body_close"

const scriptDescriptions = {
  head: "Head scripts run before page content loads. Ideal for: meta tags, stylesheets, Google Analytics, fonts, and third-party tracking code.",
  body_open: "Body opening scripts run immediately after <body> opens. Use for: early tracking pixels, session managers, or analytics initialization.",
  body_close: "Footer scripts run before </body> closes. Perfect for: chat widgets, analytics scripts, social media pixels, and interaction tracking.",
}

export default function ScriptsPage() {
  const [activeTab, setActiveTab] = useState<ScriptSection>("head")
  const [scripts, setScripts] = useState({
    head: `<!-- Google Analytics -->
<!-- Paste your Google Analytics code here -->

<!-- Other head scripts -->`,
    body_open: `<!-- Tracking pixel -->
<!-- Paste any body opening scripts here -->`,
    body_close: `<!-- Footer tracking and widgets -->
<!-- Paste footer scripts here: chat, analytics, social pixels, etc -->`,
  })
  const [saved, setSaved] = useState(false)

  const handleScriptChange = (section: ScriptSection, value: string) => {
    setScripts((prev) => ({
      ...prev,
      [section]: value,
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // In production, this would save to a database
  }

  const handleCopy = (section: ScriptSection) => {
    navigator.clipboard.writeText(scripts[section])
  }

  const handleReset = (section: ScriptSection) => {
    const defaults = {
      head: `<!-- Google Analytics -->
<!-- Paste your Google Analytics code here -->

<!-- Other head scripts -->`,
      body_open: `<!-- Tracking pixel -->
<!-- Paste any body opening scripts here -->`,
      body_close: `<!-- Footer tracking and widgets -->
<!-- Paste footer scripts here: chat, analytics, social pixels, etc -->`,
    }
    setScripts((prev) => ({
      ...prev,
      [section]: defaults[section],
    }))
  }

  return (
    <div className="min-h-screen bg-[var(--admin-bg-primary)]">
      <AdminPageHeader
        title="Script Yönetimi"
        description="Sitenizin <head>, açılış <body> ve kapanış </body> bölümlerine özel kod ekleyin."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(["head", "body_open", "body_close"] as const).map((section) => (
            <div
              key={section}
              className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Code className="w-5 h-5 text-[var(--admin-accent)] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--admin-text-primary)] mb-1">
                    {section === "head" && "<head> Bölümü"}
                    {section === "body_open" && "<body> Açılışı"}
                    {section === "body_close" && "</body> Kapanışı"}
                  </h3>
                  <p className="text-xs text-[var(--admin-text-muted)] leading-relaxed">
                    {scriptDescriptions[section]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg overflow-hidden">
          <div className="flex border-b border-[var(--admin-border)]">
            {(["head", "body_open", "body_close"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[var(--admin-accent)] text-white border-b-2 border-[var(--admin-accent)]"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)]"
                }`}
              >
                {tab === "head" && "<head>"}
                {tab === "body_open" && "<body> open"}
                {tab === "body_close" && "</body> close"}
              </button>
            ))}
          </div>

          {/* Script Editor */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                {activeTab === "head" && "<head> Bölümü Kodları"}
                {activeTab === "body_open" && "<body> Açılış Kodları"}
                {activeTab === "body_close" && "</body> Kapanış Kodları"}
              </label>
              <textarea
                value={scripts[activeTab]}
                onChange={(e) => handleScriptChange(activeTab, e.target.value)}
                placeholder="Özel kodunuzu buraya yapıştırın..."
                className="w-full h-96 px-4 py-3 bg-[var(--admin-bg-primary)] border border-[var(--admin-border)] rounded-lg text-[var(--admin-text-primary)] text-sm font-mono placeholder:text-[var(--admin-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]/50 focus:border-[var(--admin-accent)]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-[var(--admin-border)]">
              <button
                onClick={() => handleReset(activeTab)}
                className="flex items-center gap-2 px-4 py-2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] rounded-lg transition-colors text-sm font-medium"
              >
                <RotateCcw size={16} />
                Sıfırla
              </button>
              <button
                onClick={() => handleCopy(activeTab)}
                className="flex items-center gap-2 px-4 py-2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] rounded-lg transition-colors text-sm font-medium"
              >
                <Copy size={16} />
                Kopyala
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Save size={16} />
                {saved ? "Kaydedildi" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-8 bg-[var(--admin-accent-subtle)] border border-[var(--admin-accent)]/20 rounded-lg p-6">
          <h3 className="font-semibold text-[var(--admin-text-primary)] mb-3">Nasıl Kullanılır?</h3>
          <div className="space-y-2 text-sm text-[var(--admin-text-muted)]">
            <p>
              <strong className="text-[var(--admin-text-primary)]">Google Analytics:</strong> Analytics kod snippet'ini &lt;head&gt; bölümüne yapıştırın.
            </p>
            <p>
              <strong className="text-[var(--admin-text-primary)]">Facebook Pixel:</strong> Başlangıç kodu &lt;head&gt;'e, event kodu &lt;/body&gt; kapanışına yapıştırın.
            </p>
            <p>
              <strong className="text-[var(--admin-text-primary)]">Chatbot/Widget:</strong> Genellikle &lt;/body&gt; kapanışına ekler. Widget sağlayıcısından talimatları kontrol edin.
            </p>
            <p>
              <strong className="text-[var(--admin-text-primary)]">Meta/Twitter Tags:</strong> Meta etiketleri &lt;head&gt; bölümüne eklenir.
            </p>
          </div>
        </div>

        {/* Script Injection Point Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--admin-text-primary)] mb-2 text-sm">HTML Yapısı</h4>
            <pre className="text-[10px] bg-[var(--admin-bg-primary)] border border-[var(--admin-border)] rounded p-3 overflow-x-auto text-[var(--admin-text-muted)] font-mono">
{`&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  <!-- HEAD SCRIPTS HERE -->
&lt;/head&gt;
&lt;body&gt;
  <!-- BODY OPEN SCRIPTS -->
  
  <!-- Page content -->
  
  <!-- BODY CLOSE SCRIPTS -->
&lt;/body&gt;
&lt;/html&gt;`}
            </pre>
          </div>

          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--admin-text-primary)] mb-2 text-sm">Yaygın Kodlar</h4>
            <ul className="text-xs space-y-1 text-[var(--admin-text-muted)]">
              <li>• Google Analytics (GA4)</li>
              <li>• Facebook/Meta Pixel</li>
              <li>• LinkedIn Insights Tag</li>
              <li>• Google Tag Manager</li>
              <li>• Hotjar/Heatmaps</li>
              <li>• Live Chat Widgets</li>
              <li>• Email Signup Forms</li>
            </ul>
          </div>

          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--admin-text-primary)] mb-2 text-sm">En İyi Uygulamalar</h4>
            <ul className="text-xs space-y-1 text-[var(--admin-text-muted)]">
              <li>✓ Async scripts kullan</li>
              <li>✓ Analytics &lt;head&gt;'e ekle</li>
              <li>✓ Chat &lt;/body&gt;'e ekle</li>
              <li>✓ Açıklama yorum ekle</li>
              <li>✓ Production'da test et</li>
              <li>✓ Backup al</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
