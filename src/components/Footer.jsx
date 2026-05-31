export default function Footer() {
  return (
    <footer className="bg-ink py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="font-display text-lg font-light tracking-widest2 text-cream uppercase">shot Flicks</div>
          <div className="text-[10px] tracking-widest text-stone font-body uppercase mt-1">Kishan Kumar T G</div>
        </div>
        <div className="text-xs text-stone font-body tracking-wide text-center">
          © {new Date().getFullYear()} shot Flicks · Davangere, Karnataka
        </div>
        <div className="text-xs text-stone/50 font-body">
          Crafted with care ♡
        </div>
      </div>
    </footer>
  );
}
