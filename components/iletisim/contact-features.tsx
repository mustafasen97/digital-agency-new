import { Zap, Users, Gift } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Hızlı Yanıt',
    desc: 'Mesajınıza 24 saat, genellikle çok daha kısa sürede yanıt veriyoruz.',
    color: '#FF6B35',
    bg: '#FFF3EE',
  },
  {
    icon: Users,
    title: 'Uzman Ekip',
    desc: '5+ yıllık deneyimli WordPress ve web tasarım uzmanları ile çalışın.',
    color: '#1A1A2E',
    bg: '#F0F0F5',
  },
  {
    icon: Gift,
    title: 'Ücretsiz Danışmanlık',
    desc: 'İlk görüşme tamamen ücretsiz. Projenizi değerlendirip size özel plan hazırlıyoruz.',
    color: '#10B981',
    bg: '#F0FDF4',
  },
]

export default function ContactFeatures() {
  return (
    <section className="bg-white py-14" aria-label="Neden bizi tercih etmelisiniz">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: f.bg }}
              >
                <f.icon size={22} style={{ color: f.color }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#1A1A2E] mb-1">{f.title}</h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
