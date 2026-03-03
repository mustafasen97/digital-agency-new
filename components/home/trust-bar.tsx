const technologies = [
  'WordPress',
  'WooCommerce',
  'Elementor',
  'cPanel',
  'DIVI',
  'GeneratePress',
  'Yoast SEO',
  'Cloudflare',
  'WordPress',
  'WooCommerce',
  'Elementor',
  'cPanel',
  'DIVI',
  'GeneratePress',
  'Yoast SEO',
  'Cloudflare',
]

export default function TrustBar() {
  return (
    <div className="bg-[#1A1A2E] py-4 overflow-hidden" aria-label="Desteklenen teknolojiler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-0">
          <span className="shrink-0 text-[13px] text-white/70 font-medium hidden lg:block mr-8">
            Desteklenen Teknolojiler:
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex animate-marquee gap-8 whitespace-nowrap" aria-hidden="true">
              {technologies.map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="text-[15px] font-bold text-white/60 hover:text-white/100 transition-opacity cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
