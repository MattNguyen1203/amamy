'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import {Control} from 'react-hook-form'

interface RHFTextFieldProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  description?: string
  required?: boolean
  icon?: string
}

export default function RHFTextField({
  control,
  name,
  label,
  placeholder,
  description,
  required = false,
  icon,
}: RHFTextFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <FormItem className='flex flex-col gap-y-[0.5rem] space-y-0'>
          <FormLabel
            htmlFor={name}
            className='space-x-[0.125rem] px-[1rem] text-[0.75rem] font-semibold tracking-[-0.015rem] text-black/80 xsm:px-[0.75rem]'
          >
            <span>{label}</span>
            {required && <span>*</span>}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              {icon && (
                <Image
                  src={icon}
                  alt=''
                  width={48}
                  height={48}
                  className='pointer-events-none absolute left-[1rem] top-1/2 size-[1.5rem] -translate-y-1/2 object-contain xsm:size-[1rem]'
                />
              )}
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                className={cn(
                  'h-[3rem] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white px-[1rem] py-0 text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] placeholder:text-black/30 xsm:h-[2.5rem] xsm:px-[0.75rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]',
                  fieldState.error && 'border-destructive',
                  icon && 'pl-[3rem] xsm:pl-[2.25rem]',
                )}
              />
            </div>
          </FormControl>
          {description && (
            <FormDescription
              dangerouslySetInnerHTML={{__html: description || ''}}
              className='px-[1rem] text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem] text-black/60 xsm:px-[0.75rem] [&_strong]:font-semibold [&_strong]:tracking-[-0.015rem] [&_strong]:text-[rgba(0,0,0,0.92)]'
            />
          )}
          <FormMessage className='px-[1rem] text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem] xsm:px-[0.75rem]' />
        </FormItem>
      )}
    />
  )
}
