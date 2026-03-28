import React from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

type Animation = 'fade-up' | 'fade-in' | 'slide-left'

interface Props {
  children:   React.ReactNode
  className?: string
  delay?:     number
  animation?: Animation
  threshold?: number
}

const hiddenClass: Record<Animation, string> = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-in':    'opacity-0',
  'slide-left': 'opacity-0 -translate-x-8',
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  threshold = 0.1,
}: Props) {
  const [ref, isVisible] = useIntersectionObserver({ threshold })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : hiddenClass[animation]
      } ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}
