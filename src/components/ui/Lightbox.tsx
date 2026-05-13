import { useEffect, useCallback } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import type { ProjectImage } from '../../data/projects'

interface Props {
  images:   ProjectImage[]
  index:    number
  onClose:  () => void
  onChange: (i: number) => void
}

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const total = images.length
  const img   = images[index]

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange])
  const next = useCallback(() => onChange((index + 1) % total),         [index, total, onChange])

  // Dialog handles Escape + scroll lock; we only need arrow keys
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <DialogPrimitive.Root open onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogPrimitive.Portal>
        {/* Dark overlay — Dialog manages scroll-lock and focus-trap */}
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[9998] bg-black/90" />

        <DialogPrimitive.Popup className="fixed inset-0 z-[9999] flex items-center justify-center outline-none">
          <div className="relative flex flex-col items-center gap-4 max-w-5xl w-full mx-4">
            {/* Top bar: counter + close */}
            <div className="flex justify-between items-center w-full px-1">
              <span className="text-secondary text-sm font-mono">{index + 1} / {total}</span>
              <DialogPrimitive.Close
                aria-label="Close"
                className="text-secondary hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </DialogPrimitive.Close>
            </div>

            {/* Image + nav arrows */}
            <div className="relative w-full flex items-center justify-center">
              {total > 1 && (
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-2 z-10 bg-bg/60 hover:bg-bg/90 text-on-surface p-2 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
              )}

              <img
                src={img.src}
                alt={img.alt}
                className="max-h-[75vh] max-w-full object-contain rounded-xl"
              />

              {total > 1 && (
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-2 z-10 bg-bg/60 hover:bg-bg/90 text-on-surface p-2 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              )}
            </div>

            {/* Caption */}
            {img.caption && (
              <p className="text-secondary text-sm text-center">{img.caption}</p>
            )}

            {/* Dot indicators */}
            {total > 1 && (
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onChange(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={cn(
                      'rounded-full transition-all duration-200',
                      i === index ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-secondary/40 hover:bg-secondary/70',
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
