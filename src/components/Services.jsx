import { services } from '../data/portfolio';

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-warm">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest2 uppercase text-muted font-body mb-3">— What I Offer</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink">Services</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone/20">
          {services.map(s => (
            <div key={s.id} className="bg-warm p-8 hover:bg-cream transition-colors duration-300 group">
              <div className="text-2xl text-stone mb-6 font-light">{s.icon}</div>
              <h3 className="font-display text-2xl font-light text-ink mb-3 group-hover:italic transition-all duration-300">
                {s.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2">
                {s.includes.map((inc, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-body text-muted">
                    <span className="w-3 h-px bg-stone inline-block flex-shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="font-body text-sm text-muted mb-6">Every project is quoted based on scope. Let's talk about yours.</p>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 border border-ink text-ink text-xs tracking-widest uppercase font-body hover:bg-ink hover:text-cream transition-all duration-300">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
