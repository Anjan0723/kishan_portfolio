import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError('Invalid email or password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="font-display text-3xl font-light tracking-widest2 text-ink uppercase mb-1">shot Flicks</div>
          <div className="text-xs tracking-widest text-muted font-body uppercase">Admin Panel</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-[10px] tracking-widest uppercase text-muted font-body block mb-2">Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-stone/40 focus:border-ink outline-none py-3 text-sm font-body text-ink placeholder:text-stone transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-muted font-body block mb-2">Password</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-stone/40 focus:border-ink outline-none py-3 text-sm font-body text-ink placeholder:text-stone transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-body">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-ink text-cream text-xs tracking-widest uppercase font-body hover:bg-muted transition-colors duration-300 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs tracking-widest uppercase text-muted font-body hover:text-ink border-b border-stone/40 pb-0.5 transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
