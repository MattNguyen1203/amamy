'use client'

import * as React from 'react'
import {cn} from '@/lib/utils'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import ICPlus from '@/components/icon/ICPlus'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center relative !duration-300 justify-between border-none text-sm font-medium transition-all text-left [&[data-state=open]>svg]:rotate-45 ',
        className,
      )}
      {...props}
    >
      {children}
      <ICPlus className='sm:h-6 sm:w-6 h-[0.875rem] w-[0.875rem] transform text-[var(--greyscaletext-80,rgba(0,0,0,0.80))] transition-transform duration-300 icon-plus absolute top-[1.375rem] right-[1.25rem] xsm:right-[1rem] xsm:top-[1.0625rem]' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden !duration-300 border-none text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}
