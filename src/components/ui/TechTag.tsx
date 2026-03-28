interface Props {
  label: string
  size?: 'sm' | 'md'
}

export function TechTag({ label, size = 'sm' }: Props) {
  const sizeClass = size === 'md'
    ? 'px-3 py-1 text-sm'
    : 'px-2.5 py-0.5 text-xs'

  return (
    <span className={`${sizeClass} bg-surface-highest text-primary rounded-full font-mono whitespace-nowrap`}>
      {label}
    </span>
  )
}
