import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const CATEGORIES = ['All', 'Pre-wedding', 'Wedding', 'Portraits', 'Events'];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        
        const snap = await getDocs(collection(db, 'portfolio'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPhotos(data);
      } catch (e) {
        // fallback to empty if Firestore not ready
        setPhotos([]);
      }
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  const filtered = active === 'All' ? photos : photos.filter(i => i.category === active);

  return (
    <section id="portfolio" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest2 uppercase text-muted font-body mb-3">— Work</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ink">Portfolio</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 font-body
                  ${active === c ? 'bg-ink text-cream border-ink' : 'border-stone text-muted hover:border-ink hover:text-ink'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xs tracking-widest uppercase text-muted font-body animate-pulse">Loading portfolio...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-stone/30">
            <p className="font-display text-3xl text-stone font-light italic mb-2">Coming soon</p>
            <p className="text-xs tracking-widest uppercase text-muted font-body">Photos will appear here once added</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map(item => (
              <div key={item.id}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden"
                onClick={() => setLightbox(item)}>
                <img src={item.img} alt={item.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-400 flex items-end p-5">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-display text-xl text-cream italic">{item.title}</p>
                    <p className="text-xs tracking-widest uppercase text-stone font-body mt-1">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-cream text-3xl leading-none hover:text-stone transition-colors"
            onClick={() => setLightbox(null)}>×</button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[80vh] object-contain" />
            <div className="mt-4 text-center">
              <p className="font-display text-2xl text-cream italic">{lightbox.title}</p>
              <p className="text-xs tracking-widest uppercase text-stone font-body mt-1">{lightbox.category} · {lightbox.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
