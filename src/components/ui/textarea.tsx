import * as React from 'react'

import {cn} from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({className, ...props}, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot='textarea'
      className={cn(
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content shadow-xs md:text-sm flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export {Textarea}
