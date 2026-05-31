import { testimonials } from '../data/portfolio';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-ink">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest2 uppercase text-stone font-body mb-3">— Kind Words</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Testimonials</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/10">
          {testimonials.map(t => (
            <div key={t.id} className="bg-ink p-8 md:p-10 hover:bg-[#231f1a] transition-colors duration-300 group">
              {/* Quote mark */}
              <div className="font-display text-6xl text-stone/20 leading-none mb-6 select-none">"</div>
              <p className="font-display text-xl md:text-2xl font-light text-cream leading-relaxed italic mb-8 group-hover:text-warm transition-colors duration-300">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone/20 flex items-center justify-center">
                  <span className="text-xs text-stone font-body font-medium">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm text-cream font-body font-medium">{t.name}</p>
                  <p className="text-xs tracking-widest uppercase text-stone font-body mt-0.5">{t.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
