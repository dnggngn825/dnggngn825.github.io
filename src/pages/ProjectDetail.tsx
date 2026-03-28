import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { TechTag } from '../components/ui/TechTag'
import { LazyImage } from '../components/ui/LazyImage'
import { YouTubeEmbed } from '../components/ui/YouTubeEmbed'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { GitHubIcon } from '../components/ui/GitHubIcon'
import { Lightbox } from '../components/ui/Lightbox'

// Dynamically import MathJax only when needed
let MathJaxProvider: React.ComponentType<{ children: React.ReactNode }> | undefined
let MathJaxNode:    React.ComponentType<{ formula: string; inline?: boolean }> | undefined

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mjax = require('react-mathjax2') as {
    Context: React.ComponentType<{ input: string; children: React.ReactNode }>
    Node:    React.ComponentType<{ formula: string; inline?: boolean }>
  }
  // react-mathjax2 uses Context + Node
  MathJaxProvider = ({ children }) => <mjax.Context input="tex">{children}</mjax.Context>
  MathJaxNode = mjax.Node
} catch {
  // MathJax unavailable — degrade gracefully
}

function MathOrText({ text, isMath }: { text: string; isMath?: boolean }) {
  if (isMath && MathJaxNode) {
    return <MathJaxNode formula={text} />
  }
  return <span>{text}</span>
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <h2 className="text-on-surface text-xl font-bold">{title}</h2>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-secondary">
          <span className="material-symbols-outlined text-primary shrink-0 mt-0.5" style={{ fontSize: '1rem' }}>
            arrow_right
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find(p => p.id === id)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (!project) return <Navigate to="/" replace />

  const content = (
    <main className="min-h-screen pt-24 pb-32 max-w-4xl mx-auto px-6 space-y-16">
      {/* Back link */}
      <AnimatedSection>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to home
        </Link>
      </AnimatedSection>

      {/* Hero */}
      <AnimatedSection className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono text-secondary bg-surface-low px-3 py-1 rounded-full">{project.year}</span>
          {project.contributors.length > 0 && (
            <span className="text-xs text-secondary/60">
              {project.contributors.length} contributor{project.contributors.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <h1 className="text-on-surface text-4xl md:text-5xl font-black tracking-tight leading-tight">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map(t => <TechTag key={t} label={t} size="md" />)}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2 flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/10 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-outline/40 text-secondary px-4 py-2 rounded-lg text-sm hover:bg-surface-low transition-colors"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Live Demo
            </a>
          )}
        </div>
      </AnimatedSection>

      {/* Divider */}
      <div className="h-px bg-outline-variant/20" />

      {/* Goal */}
      {project.goal && (
        <AnimatedSection className="bg-surface-low rounded-xl p-6 border-l-4 border-primary">
          <SectionHeader icon="flag" title="Goal" />
          <p className="text-secondary leading-relaxed">{project.goal}</p>
        </AnimatedSection>
      )}

      {/* What Was Done */}
      {project.whatWasDone && project.whatWasDone.length > 0 && (
        <AnimatedSection>
          <SectionHeader icon="task_alt" title="What Was Done" />
          <BulletList items={project.whatWasDone} />
        </AnimatedSection>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <AnimatedSection>
          <SectionHeader icon="warning" title="What Didn't Go Well" />
          <BulletList items={project.challenges} />
        </AnimatedSection>
      )}

      {/* Improvements */}
      {project.improvements && project.improvements.length > 0 && (
        <AnimatedSection>
          <SectionHeader icon="lightbulb" title="Areas for Improvement" />
          <BulletList items={project.improvements} />
        </AnimatedSection>
      )}

      {/* Rich sections (extended technical content) */}
      {project.richSections && project.richSections.length > 0 && (
        <AnimatedSection className="space-y-8">
          <h2 className="text-on-surface text-2xl font-bold">Technical Details</h2>
          {project.richSections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-on-surface font-semibold text-lg">{sec.heading}</h3>
              <p className="text-secondary leading-relaxed">
                <MathOrText text={sec.body} isMath={sec.isMath} />
              </p>
            </div>
          ))}
        </AnimatedSection>
      )}

      {/* Video */}
      {project.videoEmbed && (
        <AnimatedSection>
          <h2 className="text-on-surface text-2xl font-bold mb-6">Demo Video</h2>
          <YouTubeEmbed url={project.videoEmbed} title={project.title} />
        </AnimatedSection>
      )}

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <AnimatedSection>
          <h2 className="text-on-surface text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <AnimatedSection key={i} delay={i * 50} className="space-y-2">
                <button
                  onClick={() => setLightboxIdx(i)}
                  className="block w-full group/img cursor-zoom-in"
                  aria-label={`View ${img.alt}`}
                >
                  <LazyImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 rounded-xl group-hover/img:opacity-90 group-hover/img:scale-[1.01] transition-all duration-200"
                  />
                </button>
                {img.caption && (
                  <p className="text-secondary text-xs text-center">{img.caption}</p>
                )}
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && project.images && (
        <Lightbox
          images={project.images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onChange={setLightboxIdx}
        />
      )}

      {/* Contributors */}
      {project.contributors.length > 0 && (
        <AnimatedSection>
          <SectionHeader icon="group" title="Contributors" />
          <ul className="space-y-2">
            {project.contributors.map(c => (
              <li key={c.name} className="flex items-center gap-3 text-secondary text-sm">
                <span className="material-symbols-outlined text-primary/60" style={{ fontSize: '1rem' }}>person</span>
                <span>{c.name}</span>
                {c.email && (
                  <a href={`mailto:${c.email}`} className="text-primary/60 hover:text-primary transition-colors text-xs">
                    {c.email}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      )}
    </main>
  )

  if (project.hasMath && MathJaxProvider) {
    return <MathJaxProvider>{content}</MathJaxProvider>
  }

  return content
}
