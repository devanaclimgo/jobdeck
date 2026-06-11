import { Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="size-5" />
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          JobDeck
        </span>
      )}
    </span>
  )
}
