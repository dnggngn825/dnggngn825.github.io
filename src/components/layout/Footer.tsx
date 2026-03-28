import { owner } from '../../data/owner'

export function Footer() {
  return (
    <footer className="w-full py-10 border-t border-surface-highest/20 bg-surface-lowest">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs tracking-widest uppercase text-secondary/60">
          © {new Date().getFullYear()} {owner.name} — Built with React + Vite
        </p>
        <div className="flex gap-8">
          <a
            href={owner.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-secondary/60 hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-secondary/60 hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${owner.email}`}
            className="text-xs tracking-widest uppercase text-secondary/60 hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
