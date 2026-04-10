import { useState } from 'react'
import { experiences } from '../../data/experience'
import { AnimatedSection } from '../ui/AnimatedSection'

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const exp = experiences[activeIdx]

  return (
    <section id="experience" className="py-32 max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-gradient font-mono text-sm">02.</span>
          <h2 className="text-on-surface text-3xl font-bold tracking-tight">Experience</h2>
          <div className="h-px section-divider flex-grow" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <div className="flex flex-col md:flex-row gap-0 min-h-[300px]">
          {/* Tab list */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-outline-variant/30 shrink-0">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className={`px-6 py-3 text-sm font-mono text-left whitespace-nowrap transition-all duration-200 border-b-2 md:border-b-0 md:border-l-2 -mb-px md:-mb-0 md:-ml-px ${
                  activeIdx === i
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-secondary hover:text-primary hover:bg-primary/5'
                }`}
              >
                {e.company}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 px-0 md:px-8 pt-6 md:pt-0 space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-on-surface text-xl font-bold">{exp.title}</h3>
              {exp.type && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{exp.type}</span>
              )}
              <span className="text-gradient font-bold">@ {exp.company}</span>
            </div>
            <p className="text-secondary text-sm font-mono">{exp.period}</p>
            <ul className="text-secondary space-y-3 pt-4 max-w-4xl">
              {exp.bullets.map(bullet => (
                <li key={bullet} className="flex gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 shrink-0" style={{ fontSize: '1rem' }}>
                    arrow_right
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
