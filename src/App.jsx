import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const isAdminRoute = window.location.pathname === '/admin';

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
      setAuthChecked(true);
    });
    return unsub;
  }, []);

  if (isAdminRoute) {
    if (!authChecked) return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-xs tracking-widest uppercase text-muted font-body animate-pulse">Loading...</p>
      </div>
    );
    if (!isAdmin) return <AdminLogin onLogin={() => setIsAdmin(true)} />;
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
