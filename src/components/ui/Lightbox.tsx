import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-4 max-w-5xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar: counter + close */}
        <div className="flex justify-between items-center w-full px-1">
          <span className="text-secondary text-sm font-mono">{index + 1} / {total}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
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
                className={`rounded-full transition-all duration-200 ${
                  i === index ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-secondary/40 hover:bg-secondary/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
