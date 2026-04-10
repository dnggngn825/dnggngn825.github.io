import { skillGroups } from '../../data/skills'
import { AnimatedSection } from '../ui/AnimatedSection'

export function Skills() {
  return (
    <section id="skills" className="py-32 max-w-70xl mx-auto px-6">
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-gradient font-mono text-sm">04.</span>
          <h2 className="text-on-surface text-3xl font-bold tracking-tight">Technical Arsenal</h2>
          <div className="h-px section-divider flex-grow" />
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {skillGroups.map((group, i) => (
          <AnimatedSection key={group.category} delay={i * 100} className="bg-surface-low p-8 rounded-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">{group.icon}</span>
              <h3 className="text-on-surface font-bold uppercase tracking-widest text-sm">{group.category}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {group.items.map(skill => (
                <div key={skill} className="flex items-center gap-2 text-secondary group/skill cursor-default">
                  <span className="material-symbols-outlined text-primary text-sm group-hover/skill:scale-110 transition-transform" style={{ fontSize: '1rem' }}>
                    arrow_right
                  </span>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
