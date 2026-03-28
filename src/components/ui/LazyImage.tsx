import { useLazyImage } from '../../hooks/useLazyImage'

interface Props {
  src:         string
  alt:         string
  className?:  string
  placeholder?: string
  style?:      React.CSSProperties
}

export function LazyImage({ src, alt, className = '', placeholder = '', style }: Props) {
  const [imgRef, loadedSrc] = useLazyImage(src, placeholder)

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loadedSrc && (
        <div
          className="absolute inset-0 bg-shimmer bg-shimmer animate-shimmer bg-[length:200%_100%]"
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={loadedSrc || undefined}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loadedSrc ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
