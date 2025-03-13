'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'

import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'p-[1.25rem_1.25rem_1.25rem_1.5rem] bg-white rounded-[1.25rem]',
      className,
    )}
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
        'group flex flex-1 items-start space-x-4 text-left justify-between text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] xsm:text-[0.75rem] xsm:leading-[1.4] xsm:tracking-[-0.015rem] font-montserrat [&[data-state=closed]>img]:-rotate-90 ',
        className,
      )}
      {...props}
    >
      <div>{children}</div>

      <ImageV2
        src='/tracking-bill/icon-down.svg'
        width={40}
        height={40}
        alt=''
        className='size-6 object-contain transition-all duration-200'
      />
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
    className='accordion-content overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div
      className={cn(
        'pt-5 text-[0.875rem] leading-[1.5] tracking-[-0.02625rem] font-montserrat text-black/80 xsm:text-[0.75rem] xsm:tracking-[-0.0225rem] xsm:text-black',
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}
