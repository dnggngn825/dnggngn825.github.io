import { useState } from 'react'
import { experiences } from '../../data/experience'
import { AnimatedSection } from '../ui/AnimatedSection'

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null)
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
        {/* Mobile accordion */}
        <div className="md:hidden space-y-2">
          {experiences.map((e, i) => (
            <div key={e.company} className="border border-outline-variant/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileOpenIdx(mobileOpenIdx === i ? null : i)}
                className={`w-full px-5 py-4 text-sm font-mono text-left flex items-center justify-between transition-all duration-200 ${
                  mobileOpenIdx === i
                    ? 'text-primary bg-primary/5'
                    : 'text-secondary hover:text-primary hover:bg-primary/5'
                }`}
              >
                {e.company}
                <span
                  className="material-symbols-outlined transition-transform duration-200"
                  style={{ fontSize: '1.1rem', transform: mobileOpenIdx === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {mobileOpenIdx === i && (
                <div className="px-5 pb-5 border-t border-outline-variant/30 space-y-2">
                  <div className="pt-4 flex flex-wrap items-baseline gap-2">
                    <h3 className="text-on-surface text-lg font-bold">{e.title}</h3>
                    {e.type && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{e.type}</span>
                    )}
                    <span className="text-gradient font-bold">@ {e.company}</span>
                  </div>
                  <p className="text-secondary text-sm font-mono">{e.period}</p>
                  <ul className="text-secondary space-y-3 pt-2">
                    {e.bullets.map(bullet => (
                      <li key={bullet} className="flex gap-3">
                        <span className="material-symbols-outlined text-primary mt-0.5 shrink-0" style={{ fontSize: '1rem' }}>
                          arrow_right
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop tab layout */}
        <div className="hidden md:flex gap-0 min-h-[300px]">
          {/* Tab list */}
          <div className="flex flex-col border-l border-outline-variant/30 shrink-0">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className={`px-6 py-3 text-sm font-mono text-left whitespace-nowrap transition-all duration-200 border-l-2 -ml-px cursor-pointer ${
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
          <div className="flex-1 px-8 space-y-2">
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
