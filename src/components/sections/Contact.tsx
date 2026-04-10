import { owner } from '../../data/owner'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GitHubIcon } from '../ui/GitHubIcon'
import { LinkedInIcon } from '../ui/LinkedInIcon'

export function Contact() {
  return (
    <section id="contact" className="py-32 max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="text-gradient font-mono text-sm tracking-widest">04. What's Next?</span>
          <h2 className="text-on-surface text-5xl font-bold tracking-tight">Get In Touch</h2>
        </div>

        <p className="text-secondary leading-relaxed">
          I'm currently looking for new opportunities in Robotics and Software Development.
          Whether you have a question, a role you think I'd be a great fit for, or just want
          to say hi — my inbox is always open.
        </p>

        <div className="pt-4">
          <a
            href={`mailto:${owner.email}`}
            className="inline-block border border-primary text-primary px-10 py-4 font-bold tracking-widest rounded-xl hover:bg-primary/10 transition-all duration-300 uppercase text-sm hover:scale-105 active:scale-95"
          >
            Say Hello
          </a>
        </div>

        <div className="flex justify-center gap-8 pt-8">
          <a
            href={owner.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            <GitHubIcon className="w-7 h-7" />
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            <LinkedInIcon className="w-7 h-7" />
          </a>
          <a
            href={`mailto:${owner.email}`}
            aria-label="Email"
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-3xl">mail</span>
          </a>
        </div>
      </AnimatedSection>
    </section>
  )
}
