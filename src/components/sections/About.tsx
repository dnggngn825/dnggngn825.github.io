import { owner } from '../../data/owner'
import { education } from '../../data/education'
import { skillGroups } from '../../data/skills'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GitHubIcon } from '../ui/GitHubIcon'
import profileImg from '../../assets/images/profile.jpg'

export function About() {
  return (
    <section id="about" className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-5 gap-16 items-start">
        {/* Text */}
        <div className="md:col-span-3 space-y-8">
          <AnimatedSection>
            <div className="flex items-center gap-4">
              <span className="text-gradient font-mono text-sm">01.</span>
              <h2 className="text-on-surface text-3xl font-bold tracking-tight">About Me</h2>
              <div className="h-px bg-outline-variant/30 flex-grow" />
            </div>
          </AnimatedSection>

          <div className="space-y-4 text-secondary leading-relaxed">
            {owner.bio.map((para, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <p>{para}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Links */}
          <AnimatedSection delay={200}>
            <div className="flex gap-6 pt-2">
              <a
                href={owner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-[#b7e0c6] transition-colors duration-200 text-sm font-medium"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-[#b7e0c6] transition-colors duration-200 text-sm font-medium"
              >
                <span className="material-symbols-outlined text-base">link</span>
                LinkedIn
              </a>
            </div>
          </AnimatedSection>

          {/* Technical Skills */}
          <AnimatedSection delay={250}>
            <div className="space-y-3 pt-4">
              <h3 className="text-on-surface text-sm font-bold uppercase tracking-widest">Technical Skills</h3>
              {skillGroups.map(group => (
                <div key={group.category} className="flex gap-4 items-baseline py-2 border-b border-outline-variant/20">
                  <p className="text-on-surface text-sm font-semibold w-28 shrink-0">{group.category}</p>
                  <p className="text-secondary text-sm">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection delay={350}>
            <div className="space-y-3 pt-4">
              <h3 className="text-on-surface text-sm font-bold uppercase tracking-widest">Education</h3>
              {education.map(edu => (
                <div key={edu.degree} className="flex justify-between items-start gap-4 py-2 border-b border-outline-variant/20">
                  <div>
                    <p className="text-on-surface text-sm font-semibold">{edu.degree}</p>
                    <p className="text-secondary text-xs">{edu.institution}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-primary text-xs font-mono">WAM {edu.wam}</p>
                    <p className="text-secondary text-xs">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Photo */}
        <AnimatedSection className="md:col-span-2" animation="fade-in" delay={200}>
          <div className="relative group max-w-xs mx-auto md:mx-0">
            <div className="aspect-square rounded-full overflow-hidden border-2 border-primary/30 p-2 grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src={profileImg}
                alt="Danny Nguyen"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-full -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 pointer-events-none" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
