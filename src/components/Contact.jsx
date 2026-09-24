import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    // In production: connect to Formspree, EmailJS, or any free form backend
    // For now, open WhatsApp with prefilled message
    const msg = `Hi Kishan! I'd like to book a ${form.type || 'shoot'}.\nName: ${form.name}\nDate: ${form.date}\nMessage: ${form.message}`;
    window.open(`https://wa.me/919113579050?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  const inputClass = "w-full bg-transparent border-b border-stone/40 dark:border-stone/20 focus:border-ink dark:focus:border-cream outline-none py-3 text-sm font-body text-ink dark:text-cream placeholder:text-stone dark:placeholder:text-stone/50 transition-colors duration-200";

  return (
    <section id="contact" className="py-24 px-6 bg-warm dark:bg-[#24211C] transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-xs tracking-widest2 uppercase text-muted dark:text-stone font-body mb-3">— Let's Work Together</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ink dark:text-cream mb-8">Book a<br /><em className="italic">Shoot</em></h2>

            <p className="font-body text-sm text-muted dark:text-stone leading-relaxed mb-10 max-w-sm">
              Whether it's an intimate pre-wedding session or a full wedding day — reach out and let's
              create something beautiful together.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                { label: 'WhatsApp / Call', value: '+91 9113579050', href: 'tel:+919113579050' },
                { label: 'Email', value: 'shot.flick06@gmail.com', href: 'mailto:shot.flick06@gmail.com' },
                { label: 'Based in', value: 'Davangere, Karnataka' },
                { label: 'Available', value: 'Pan Karnataka · Destination shoots' },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-widest uppercase text-stone dark:text-stone/70 font-body">{label}</span>
                  {href ? (
                    <a href={href} className="text-sm font-body text-ink dark:text-cream hover:underline transition-all">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-body text-ink dark:text-cream">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 flex gap-4">
              {['Instagram', 'YouTube', 'Facebook'].map(s => (
                <a key={s} href="#" className="text-xs tracking-widest uppercase font-body text-muted dark:text-stone border-b border-stone/40 dark:border-stone/20 pb-0.5 hover:text-ink hover:border-ink dark:hover:text-cream dark:hover:border-cream transition-colors duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="font-display text-6xl text-stone/30 dark:text-stone/10 mb-6">✓</div>
                <h3 className="font-display text-3xl font-light text-ink dark:text-cream italic mb-3">Message sent!</h3>
                <p className="font-body text-sm text-muted dark:text-stone">Kishan will get back to you soon.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-xs tracking-widest uppercase font-body text-muted dark:text-stone hover:text-ink dark:hover:text-cream border-b border-stone/40 dark:border-stone/20 pb-0.5">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <input name="name" required placeholder="Your name *" value={form.name} onChange={handle} className={inputClass} />
                <input name="email" type="email" placeholder="Email address *" value={form.email} onChange={handle} className={inputClass} />
                <input name="phone" placeholder="Phone / WhatsApp" value={form.phone} onChange={handle} className={inputClass} />
                <input name="date" placeholder="Event / shoot date" value={form.date} onChange={handle} className={inputClass} />
                <select name="type" value={form.type} onChange={handle}
                  className={`${inputClass} bg-warm dark:bg-[#24211C] appearance-none cursor-pointer`}>
                  <option value="" disabled>Type of shoot *</option>
                  <option>Pre-wedding</option>
                  <option>Wedding Photography</option>
                  <option>Videography</option>
                  <option>Portrait Session</option>
                  <option>Event Coverage</option>
                  <option>Video Editing</option>
                  <option>Other</option>
                </select>
                <textarea name="message" placeholder="Tell me about your vision..." value={form.message} onChange={handle}
                  rows={4} className={`${inputClass} resize-none`} />
                <button type="submit"
                  className="w-full py-4 bg-ink dark:bg-cream text-cream dark:text-ink text-xs tracking-widest uppercase font-body hover:bg-muted dark:hover:bg-stone transition-colors duration-300">
                  Send Inquiry
                </button>
                <p className="text-[10px] text-stone dark:text-stone/70 font-body text-center">
                  Or WhatsApp directly — button above will open WhatsApp with your details
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
