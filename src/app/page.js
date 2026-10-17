
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen  bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 sm:p-12">
      
      {/* Navigation */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <span className="text-xl font-bold tracking-tight text-white">
          Thread<span className="text-indigo-400">ly</span>
        </span>
        <Link 
          href="/customize" 
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Customize →
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl w-full mx-auto my-auto py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Minimal Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-950/60 rounded-full border border-indigo-800/40">
            3D SHIRT STUDIO
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Design your shirt in 3D.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto md:mx-0">
            Pick a color, upload your logo, and view your custom 3D model in real time. Simple and fast.
          </p>
          <div className="pt-2">
            <Link 
              href="/customize" 
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
            >
              Start Designing
            </Link>
          </div>
        </div>

        {/* Right: Minimal 2D/3D Preview Box */}
        <div className="flex-1 w-full max-w-sm aspect-square bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-2xl">
          <div className="w-32 h-32 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-4xl mb-4 animate-pulse">
            👕
          </div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Interactive 3D Preview</p>
        </div>

      </main>

      {/* Minimal Footer / Steps */}
      <footer className="max-w-5xl w-full mx-auto pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-wrap justify-between gap-4">
        <span>01. Pick Base Color</span>
        <span>02. Upload Custom Logo</span>
        <span>03. Export Design</span>
      </footer>

    </div>
  );
}