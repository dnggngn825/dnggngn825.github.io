import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  size?: 'sm' | 'md'
}

export function TechTag({ label, size = 'sm' }: Props) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'bg-surface-tag text-primary border-outline-variant/20 rounded-full font-mono whitespace-nowrap h-auto',
        size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs',
      )}
    >
      {label}
    </Badge>
  )
}
