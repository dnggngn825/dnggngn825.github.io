import { useNavigate } from 'react-router-dom'
import { projects, ProjectStatus } from '../../data/projects'
import { AnimatedSection } from '../ui/AnimatedSection'
import { TechTag } from '../ui/TechTag'
import { LazyImage } from '../ui/LazyImage'
import { GitHubIcon } from '../ui/GitHubIcon'

export function Projects() {
  const navigate = useNavigate()

  return (
    <section id="projects" className="py-32 max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-gradient font-mono text-sm">03.</span>
          <h2 className="text-on-surface text-3xl font-bold tracking-tight">Some Things I've Built</h2>
          <div className="h-px section-divider flex-grow" />
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div
            key={project.id}
            onClick={() => {
              sessionStorage.setItem('homeScrollY', String(window.scrollY))
              navigate(`/projects/${project.id}`)
            }}
            className="cursor-pointer"
          >
            <AnimatedSection
              delay={(i % 2) * 100}
              className="group bg-surface text-on-surface rounded-xl border border-outline-variant/10 overflow-hidden hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 h-full"
            >
              {/* Thumbnail */}
              {project.thumbnail ? (
                <div className="h-48 overflow-hidden">
                  <LazyImage
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-48 w-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-surface-low to-surface-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/30 text-6xl">precision_manufacturing</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-secondary font-mono">{project.year}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          project.status === ProjectStatus.InProgress
                            ? 'status-in-progress'
                            : 'status-complete'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-on-surface text-xl font-bold group-hover:text-primary transition-colors mt-1">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-3 text-secondary shrink-0 ml-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Source code"
                        className="hover:text-primary transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        <GitHubIcon className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                        className="hover:text-primary transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        <span className="material-symbols-outlined text-xl">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-secondary text-sm leading-relaxed">{project.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => <TechTag key={t} label={t} />)}
                </div>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </section>
  )
}
