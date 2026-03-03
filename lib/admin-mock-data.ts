// TODO: Replace with real data provider (database / API calls)

export const visitorData = [
  { date: "Dec 3", visitors: 420, unique: 310 },
  { date: "Dec 4", visitors: 380, unique: 280 },
  { date: "Dec 5", visitors: 510, unique: 390 },
  { date: "Dec 6", visitors: 490, unique: 360 },
  { date: "Dec 7", visitors: 620, unique: 470 },
  { date: "Dec 8", visitors: 580, unique: 430 },
  { date: "Dec 9", visitors: 540, unique: 400 },
  { date: "Dec 10", visitors: 710, unique: 530 },
  { date: "Dec 11", visitors: 690, unique: 510 },
  { date: "Dec 12", visitors: 760, unique: 570 },
  { date: "Dec 13", visitors: 820, unique: 640 },
  { date: "Dec 14", visitors: 780, unique: 590 },
  { date: "Dec 15", visitors: 900, unique: 680 },
  { date: "Dec 16", visitors: 860, unique: 650 },
  { date: "Dec 17", visitors: 940, unique: 710 },
  { date: "Dec 18", visitors: 1020, unique: 780 },
  { date: "Dec 19", visitors: 970, unique: 730 },
  { date: "Dec 20", visitors: 1100, unique: 840 },
  { date: "Dec 21", visitors: 1050, unique: 800 },
  { date: "Dec 22", visitors: 1180, unique: 890 },
  { date: "Dec 23", visitors: 1240, unique: 940 },
  { date: "Dec 24", visitors: 980, unique: 740 },
  { date: "Dec 25", visitors: 860, unique: 650 },
  { date: "Dec 26", visitors: 920, unique: 700 },
  { date: "Dec 27", visitors: 1080, unique: 820 },
  { date: "Dec 28", visitors: 1150, unique: 870 },
  { date: "Dec 29", visitors: 1320, unique: 1010 },
  { date: "Dec 30", visitors: 1280, unique: 970 },
  { date: "Dec 31", visitors: 1190, unique: 900 },
  { date: "Jan 1", visitors: 1400, unique: 1060 },
]

export const recentMessages = [
  { id: 1, name: "Ahmet Yılmaz", subject: "Web sitesi tasarımı hakkında", time: "5 dk önce", read: false },
  { id: 2, name: "Selin Kaya", subject: "SEO paketi fiyatları", time: "23 dk önce", read: false },
  { id: 3, name: "Mert Demir", subject: "E-ticaret projesi teklif", time: "1 saat önce", read: true },
  { id: 4, name: "Ayşe Çelik", subject: "Logo tasarımı revizyonu", time: "3 saat önce", read: true },
  { id: 5, name: "Burak Aydın", subject: "Mobil uygulama geliştirme", time: "5 saat önce", read: true },
]

export const recentContent = [
  { id: 1, title: "2024 Web Tasarım Trendleri", type: "blog", status: "published", time: "2 saat önce" },
  { id: 2, title: "Kurumsal Web Tasarım", type: "service", status: "published", time: "1 gün önce" },
  { id: 3, title: "E-Ticaret Projesi — TeknoMarket", type: "portfolio", status: "published", time: "2 gün önce" },
  { id: 4, title: "SEO Optimizasyon Rehberi", type: "blog", status: "draft", time: "3 gün önce" },
  { id: 5, title: "Dijital Pazarlama Paketi", type: "service", status: "published", time: "4 gün önce" },
]

export const pages = [
  { id: 1, title: "Ana Sayfa", slug: "/", status: "published", updated: "01.01.2025" },
  { id: 2, title: "Hizmetler", slug: "/hizmetler", status: "published", updated: "28.12.2024" },
  { id: 3, title: "Portfolio", slug: "/portfolio", status: "published", updated: "27.12.2024" },
  { id: 4, title: "Blog", slug: "/blog", status: "published", updated: "26.12.2024" },
  { id: 5, title: "Hakkımızda", slug: "/hakkimizda", status: "draft", updated: "20.12.2024" },
  { id: 6, title: "İletişim", slug: "/iletisim", status: "published", updated: "15.12.2024" },
  { id: 7, title: "Üyelik", slug: "/uyelik", status: "archived", updated: "10.12.2024" },
]

export const blogPosts = [
  { id: 1, title: "2024 Web Tasarım Trendleri", author: "Admin", category: "Tasarım", tags: ["ui", "ux"], date: "01.01.2025", views: 1240, status: "published" },
  { id: 2, title: "SEO Rehberi: Başlangıç Kılavuzu", author: "Admin", category: "SEO", tags: ["seo", "google"], date: "28.12.2024", views: 980, status: "published" },
  { id: 3, title: "Next.js 15 ile Performans İpuçları", author: "Admin", category: "Geliştirme", tags: ["nextjs", "react"], date: "20.12.2024", views: 760, status: "published" },
  { id: 4, title: "Mobil Uygulama Tasarımında Dikkat Edilmesi Gerekenler", author: "Admin", category: "Tasarım", tags: ["mobile", "ux"], date: "15.12.2024", views: 540, status: "draft" },
  { id: 5, title: "E-Ticaret Sitelerinde Dönüşüm Optimizasyonu", author: "Admin", category: "Pazarlama", tags: ["ecommerce", "cro"], date: "10.12.2024", views: 430, status: "published" },
]

export const services = [
  { id: 1, title: "Kurumsal Web Tasarım", category: "Web", icon: "Globe", featured: true, status: "published", order: 1 },
  { id: 2, title: "E-Ticaret Çözümleri", category: "Web", icon: "ShoppingCart", featured: true, status: "published", order: 2 },
  { id: 3, title: "SEO Optimizasyonu", category: "SEO", icon: "Search", featured: true, status: "published", order: 3 },
  { id: 4, title: "Mobil Uygulama", category: "Uygulama", icon: "Smartphone", featured: false, status: "published", order: 4 },
  { id: 5, title: "Dijital Pazarlama", category: "Pazarlama", icon: "BarChart", featured: false, status: "draft", order: 5 },
]

export const portfolioProjects = [
  { id: 1, title: "TeknoMarket E-Ticaret", client: "TeknoMarket A.Ş.", category: "E-Ticaret", year: 2024, featured: true, status: "published" },
  { id: 2, title: "LegalPro Hukuk Bürosu", client: "LegalPro", category: "Kurumsal", year: 2024, featured: true, status: "published" },
  { id: 3, title: "FitLife Mobil Uygulaması", client: "FitLife", category: "Mobil", year: 2023, featured: false, status: "published" },
  { id: 4, title: "OtelVista Rezervasyon", client: "OtelVista", category: "Turizm", year: 2023, featured: false, status: "published" },
  { id: 5, title: "MedPharma Web Sitesi", client: "MedPharma", category: "Sağlık", year: 2023, featured: false, status: "draft" },
]

export const teamMembers = [
  { id: 1, name: "Mustafa Şen", position: "Genel Müdür & Kurucu", active: true, order: 1 },
  { id: 2, name: "Zeynep Arslan", position: "Baş Tasarımcı", active: true, order: 2 },
  { id: 3, name: "Emre Koç", position: "Full-Stack Geliştirici", active: true, order: 3 },
  { id: 4, name: "Deniz Yıldız", position: "SEO Uzmanı", active: true, order: 4 },
  { id: 5, name: "Berk Şahin", position: "Mobil Geliştirici", active: false, order: 5 },
]

export const testimonials = [
  { id: 1, name: "Kemal Avcı", company: "TeknoMarket", rating: 5, date: "15.12.2024", published: true },
  { id: 2, name: "Leyla Öztürk", company: "LegalPro", rating: 5, date: "10.12.2024", published: true },
  { id: 3, name: "Tamer Güneş", company: "FitLife", rating: 4, date: "05.12.2024", published: true },
  { id: 4, name: "Suna Doğan", company: "OtelVista", rating: 5, date: "01.12.2024", published: false },
]

export const users = [
  { id: 1, name: "Mustafa Şen", email: "mustafa@webtasarimevi.com", role: "Admin", registered: "01.01.2024", lastLogin: "01.01.2025", status: "active" },
  { id: 2, name: "Zeynep Arslan", email: "zeynep@webtasarimevi.com", role: "Editor", registered: "15.03.2024", lastLogin: "31.12.2024", status: "active" },
  { id: 3, name: "Emre Koç", email: "emre@webtasarimevi.com", role: "Editor", registered: "01.06.2024", lastLogin: "30.12.2024", status: "active" },
  { id: 4, name: "Ahmet Yılmaz", email: "ahmet@gmail.com", role: "Member", registered: "20.11.2024", lastLogin: "28.12.2024", status: "active" },
  { id: 5, name: "Selin Kaya", email: "selin@gmail.com", role: "Member", registered: "05.12.2024", lastLogin: "29.12.2024", status: "suspended" },
]

export const inboxMessages = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@gmail.com", subject: "Web sitesi tasarımı hakkında", service: "Web Tasarım", date: "01.01.2025 14:32", status: "unread" },
  { id: 2, name: "Selin Kaya", email: "selin@gmail.com", subject: "SEO paketi fiyatları", service: "SEO", date: "01.01.2025 11:15", status: "unread" },
  { id: 3, name: "Mert Demir", email: "mert@gmail.com", subject: "E-ticaret projesi teklif", service: "E-Ticaret", date: "31.12.2024 16:45", status: "read" },
  { id: 4, name: "Ayşe Çelik", email: "ayse@gmail.com", subject: "Logo tasarımı revizyonu", service: "Tasarım", date: "31.12.2024 09:22", status: "read" },
  { id: 5, name: "Burak Aydın", email: "burak@gmail.com", subject: "Mobil uygulama geliştirme", service: "Mobil", date: "30.12.2024 17:08", status: "read" },
  { id: 6, name: "Nur Şahin", email: "nur@gmail.com", subject: "Kurumsal kimlik tasarımı", service: "Tasarım", date: "30.12.2024 12:34", status: "read" },
]

export const analyticsData = {
  totalVisitors: 28400,
  uniqueVisitors: 21600,
  bounceRate: "38.2%",
  avgSession: "3m 42s",
  topPosts: [
    { title: "2024 Web Tasarım Trendleri", views: 1240 },
    { title: "SEO Rehberi: Başlangıç Kılavuzu", views: 980 },
    { title: "Next.js 15 ile Performans İpuçları", views: 760 },
    { title: "Mobil Uygulama Tasarımında...", views: 540 },
    { title: "E-Ticaret Dönüşüm Optimizasyonu", views: 430 },
  ],
  trafficSources: [
    { name: "Organik", value: 52, color: "#F59E0B" },
    { name: "Doğrudan", value: 24, color: "#3B82F6" },
    { name: "Sosyal", value: 14, color: "#10B981" },
    { name: "Referans", value: 10, color: "#6B7280" },
  ],
  deviceBreakdown: { desktop: 62, mobile: 31, tablet: 7 },
  pageStats: [
    { url: "/", views: 8420, avgTime: "2m 10s", bounce: "32%" },
    { url: "/hizmetler", views: 5310, avgTime: "3m 45s", bounce: "28%" },
    { url: "/portfolio", views: 4180, avgTime: "4m 22s", bounce: "25%" },
    { url: "/blog", views: 3760, avgTime: "5m 08s", bounce: "22%" },
    { url: "/iletisim", views: 2940, avgTime: "1m 55s", bounce: "45%" },
  ],
}
