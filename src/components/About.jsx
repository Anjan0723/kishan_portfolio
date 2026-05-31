export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&q=80"
                alt="Kishan Kumar T G — Photographer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone/40 -z-10" />
          </div>

          {/* Text side */}
          <div>
            <p className="text-xs tracking-widest2 uppercase text-muted font-body mb-6">— Behind the lens</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-8 leading-tight">
              Hi, I'm<br />
              <em className="italic">Kishan.</em>
            </h2>

            <div className="space-y-4 font-body text-sm text-muted leading-relaxed">
              <p>
                I'm a photographer and videographer based in Davangere, Karnataka, with a passion for capturing
                genuine moments — the ones that make you feel something long after the day has passed.
              </p>
              <p>
                Under the brand <strong className="text-ink font-medium">shot Flicks</strong>, I work across
                pre-wedding shoots, weddings, portraits, and events. My approach is relaxed and personal — I
                believe the best photos happen when people forget there's a camera around.
              </p>
              <p>
                From the golden light of a garden shoot to the energy of a late-night reception, I bring the
                same focus to every frame: tell the real story.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone/30 pt-10">
              {[['50+', 'Weddings'], ['200+', 'Photo shoots'], ['100+', 'Video projects']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl font-light text-ink">{n}</div>
                  <div className="text-xs tracking-widest uppercase text-muted font-body mt-1">{l}</div>
                </div>
              ))}
            </div>

            {/* Gear */}
            <div className="mt-10">
              <p className="text-xs tracking-widest uppercase text-muted font-body mb-3">Gear</p>
              <div className="flex flex-wrap gap-2">
                {['Sony A7 III', '24–70mm f/2.8', '50mm f/1.8', 'DJI Drone', 'Godox Flash', 'Adobe Premiere'].map(g => (
                  <span key={g} className="text-xs border border-stone/50 px-3 py-1.5 text-muted font-body">{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
