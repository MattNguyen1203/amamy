'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {Check} from 'lucide-react'
import * as React from 'react'

import {cn} from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({className, ...props}, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className='h-4 w-4' />
    </CheckboxPrimitive.Indicator>
    <div className='hidden svg-none-check'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='10'
        height='2'
        viewBox='0 0 10 2'
        fill='none'
      >
        <path
          d='M1 1H9'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </div>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export {Checkbox}
