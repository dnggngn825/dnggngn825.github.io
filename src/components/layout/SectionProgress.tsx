import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const sections = [
  { id: 'hero',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
]

export function SectionProgress() {
  const [active, setActive] = useState('hero')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return

    function onScroll() {
      const mid = window.scrollY + window.innerHeight * 0.4
      let current = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) current = id
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (!isHome) return null

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      {sections.map((section, i) => (
        <div key={section.id} className="flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger
              onClick={() => scrollTo(section.id)}
              className="flex items-center justify-center p-1"
              aria-label={section.label}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  active === section.id
                    ? 'w-2.5 h-2.5 bg-primary shadow-[0_0_8px_rgba(148,201,169,0.8)]'
                    : 'w-2 h-2 bg-outline-variant/40 hover:bg-primary/60'
                }`}
              />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={12}
              className="bg-surface-low border border-outline-variant/20 text-secondary"
            >
              {section.label}
            </TooltipContent>
          </Tooltip>

          {i < sections.length - 1 && (
            <div className="w-px h-6 bg-outline-variant/25" />
          )}
        </div>
      ))}
    </div>
  )
}
