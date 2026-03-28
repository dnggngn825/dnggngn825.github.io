import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display  = 'block'
    ring.style.display = 'block'

    let rx = 0
    let ry = 0

    function onMove(e: MouseEvent) {
      if (!dot || !ring) return
      const { clientX: x, clientY: y } = e
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15
      ring.style.transform = `translate(${rx - 12}px, ${ry - 12}px)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{ display: 'none' }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10001] will-change-transform"
      />
      <div
        ref={ringRef}
        style={{ display: 'none' }}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary/50 pointer-events-none z-[10000] will-change-transform"
      />
    </>
  )
}
