import { owner } from '../../data/owner'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 bg-bg overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 20% 40%, rgba(148,201,169,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
        <p className="font-mono text-sm tracking-[1.5px] uppercase text-gradient animate-fade-in">
          Hi, my name is
        </p>
        <h1
          className="text-on-surface text-6xl md:text-8xl font-black tracking-tighter leading-tight animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          {owner.name}.
        </h1>
        <h2
          className="text-secondary text-3xl md:text-5xl font-bold tracking-tight opacity-80 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Software Engineer
        </h2>
        <p
          className="text-secondary max-w-xl leading-relaxed pt-4 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          {owner.bio[0]}
        </p>
        <div
          className="flex flex-wrap gap-4 pt-8 animate-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          <button
            onClick={() => scrollToId('projects')}
            className="bg-gradient-primary text-on-primary px-8 py-4 font-bold tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(148,201,169,0.3)] hover:shadow-[0_0_30px_rgba(148,201,169,0.5)] hover:scale-105 active:scale-95"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToId('contact')}
            className="border border-primary text-primary px-8 py-4 font-bold tracking-wide rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}
