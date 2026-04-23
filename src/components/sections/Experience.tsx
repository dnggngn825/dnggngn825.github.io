import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { experiences } from '../../data/experience'
import { AnimatedSection } from '../ui/AnimatedSection'

type Project = NonNullable<(typeof experiences)[number]['projects']>[number]

function ProjectsBlock({ projects, collapsible = false }: { projects: Project[], collapsible?: boolean }) {
  const [open, setOpen] = useState(true)

  if (collapsible) {
    return (
      <li className="flex flex-col rounded-lg border border-outline-variant/80 bg-surface-card transition-all duration-200 [box-shadow:var(--shadow-pill)] hover:[box-shadow:var(--shadow-pill-hover)] mt-1">
        {/* Toggle pill header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between w-full px-4 py-2 text-md font-semibold text-on-surface transition-all duration-200 active:translate-y-px"
        >
          <span className="flex gap-2 items-center">Projects</span>
          <span
            className="material-symbols-outlined text-secondary transition-transform duration-200"
            style={{
              fontSize: "1.1rem",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            expand_more
          </span>
        </button>

        {/* Expanded project list — inside the pill */}
        {open && (
          <ul className="space-y-4 px-4 pb-6 pt-3 border-t border-outline-variant/30">
            {projects.map((project) => (
              <li
                key={project.name}
                className="flex flex-col gap-1 border-l-2 border-primary/30 pl-3"
              >
                <span className="text-on-surface font-medium text-md">
                  {project.name}
                </span>
                {project.techStack.length > 0 && (
                  <p className="text-sm text-muted/55 italic mb-1.5">
                    {project.techStack.join(", ")}
                  </p>
                )}
                <ul className="space-y-1">
                  {project.description.map((desc) => (
                    <li
                      key={desc}
                      className="flex gap-2 text-on-surface/90 text-sm"
                    >
                      <span className="text-muted shrink-0">–</span>
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span>{children}</span>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">{children}</a>
                          ),
                          strong: ({ children }) => <strong className="text-on-surface font-semibold">{children}</strong>,
                          code: ({ children }) => <code className="font-mono text-xs bg-surface-high px-1 py-0.5 rounded">{children}</code>,
                        }}
                      >{desc}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-2">
      {/* "Projects" top-level bullet */}
      <span className="flex gap-3 items-center">
        <span
          className="material-symbols-outlined text-primary mt-0.5 shrink-0"
          style={{ fontSize: "1rem" }}
        >
          arrow_right
        </span>
        <span className="text-on-surface font-semibold">Projects</span>
      </span>

      {/* Each project as an indented sub-item */}
      <ul className="ml-7 space-y-4">
        {projects.map((project) => (
          <li key={project.name} className="flex flex-col gap-1.5">
            <span className="flex gap-2 items-center">
              <span
                className="material-symbols-outlined text-primary/70 shrink-0"
                style={{ fontSize: "0.9rem" }}
              >
                chevron_right
              </span>
              <span className="text-on-surface font-medium">
                {project.name}
              </span>
            </span>
            {project.techStack.length > 0 && (
              <p className="ml-5 text-xs text-muted/55 italic">
                {project.techStack.join(', ')}
              </p>
            )}
            <ul className="ml-5 space-y-1">
              {project.description.map((desc) => (
                <li key={desc} className="flex gap-2 text-on-surface/75 text-sm">
                  <span className="text-muted shrink-0 mt-0.5">–</span>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <span>{children}</span>,
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">{children}</a>
                      ),
                      strong: ({ children }) => <strong className="text-on-surface font-semibold">{children}</strong>,
                      code: ({ children }) => <code className="font-mono text-xs bg-surface-high px-1 py-0.5 rounded">{children}</code>,
                    }}
                  >{desc}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null)
  const accordionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const exp = experiences[activeIdx]

  function handleAccordionToggle(i: number) {
    const next = mobileOpenIdx === i ? null : i
    setMobileOpenIdx(next)
    if (next !== null) {
      // Wait one tick for the DOM to reflect the new open item, then scroll it into view
      setTimeout(() => {
        accordionRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 0)
    }
  }

  return (
    <section id="experience" className="py-16 md:py-32 max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-gradient font-mono text-sm">02.</span>
          <h2 className="text-on-surface text-3xl font-bold tracking-tight">
            Experience
          </h2>
          <div className="h-px section-divider flex-grow" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        {/* Mobile accordion */}
        <div className="md:hidden space-y-2">
          {experiences.map((e, i) => (
            <div
              key={e.company}
              className="border border-outline-variant/30 rounded-lg overflow-hidden"
            >
              <button
                ref={(el) => { accordionRefs.current[i] = el }}
                onClick={() => handleAccordionToggle(i)}
                className={`w-full px-5 py-4 text-sm font-mono text-left flex items-center justify-between transition-all duration-200 ${
                  mobileOpenIdx === i
                    ? "text-primary bg-primary/5"
                    : "text-secondary hover:text-primary hover:bg-primary/5"
                }`}
              >
                {e.company}
                <span
                  className="material-symbols-outlined transition-transform duration-200"
                  style={{
                    fontSize: "1.1rem",
                    transform:
                      mobileOpenIdx === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </button>
              {mobileOpenIdx === i && (
                <div className="px-5 pb-5 border-t border-outline-variant/30 space-y-2">
                  <div className="pt-4 flex flex-wrap items-baseline gap-2">
                    <h3 className="text-on-surface text-lg font-bold">
                      {e.title}
                    </h3>
                    <span className="text-gradient font-bold">
                      @ {e.company}
                    </span>
                    {e.type && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full [box-shadow:var(--shadow-pill)]">
                        {e.type}
                      </span>
                    )}
                  </div>
                  <p className="text-secondary text-sm font-mono">{e.period}</p>
                  <ul className="text-secondary space-y-3 pt-2">
                    {e.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                          style={{ fontSize: "1rem" }}
                        >
                          arrow_right
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {e.projects && e.projects.length > 0 && (
                    <ul className="text-secondary pt-3">
                      <ProjectsBlock projects={e.projects} collapsible />
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop tab layout */}
        <div className="hidden md:flex gap-0 min-h-[300px]">
          {/* Tab list */}
          <div className="flex flex-col border-1 border-outline-variant/30 shrink-0">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className={`px-6 py-3 text-sm font-mono text-left whitespace-nowrap transition-all duration-200 border-l-2 -ml-px cursor-pointer ${
                  activeIdx === i
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-secondary hover:text-primary hover:bg-primary/5"
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
              <span className="text-gradient font-bold">@ {exp.company}</span>
              {exp.type && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full [box-shadow:var(--shadow-pill)]">
                  {exp.type}
                </span>
              )}
            </div>
            <p className="text-secondary text-sm font-mono">{exp.period}</p>
            <ul className="text-secondary space-y-3 pt-4 max-w-4xl">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                    style={{ fontSize: "1rem" }}
                  >
                    arrow_right
                  </span>
                  {bullet}
                </li>
              ))}
              {exp.projects && exp.projects.length > 0 && (
                <ProjectsBlock projects={exp.projects} collapsible />
              )}
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
