/* eslint-disable no-unused-vars */
'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-v2'
import {Label} from '@/components/ui/label'
import {cn} from '@/lib/utils'
import Image from 'next/image'

type SelectFieldVariant = 'primary' | 'secondary'

interface SelectFieldProps {
  name: string
  label: string
  placeholder: string
  options: {name: string; value: string; icon?: string}[]
  variant: SelectFieldVariant
  hasPrefix?: boolean
  value: string
  onChange: (name: string, value: string | number) => void
}

export default function SelectField({
  name,
  label,
  placeholder,
  variant,
  options,
  hasPrefix,
  value,
  onChange,
}: SelectFieldProps) {
  const variantSelectFieldClassnames: Record<SelectFieldVariant, string> = {
    primary:
      'text-[rgba(0,0,0,0.92)] font-medium data-[placeholder]:text-[rgba(0,0,0,0.92)]',
    secondary:
      'text-[#38B6FF] font-semibold uppercase data-[placeholder]:normal-case data-[placeholder]:text-[rgba(0,0,0,0.3)]',
  }

  const handleValueChange = (value: string) => {
    if (!onChange) return
    onChange(name, value)
  }

  return (
    <div className='flex flex-col space-y-[0.3125rem] font-montserrat'>
      {label && (
        <Label className='text-[0.75rem] text-black/80 font-semibold tracking-[-0.015rem] leading-normal'>
          {label}
        </Label>
      )}
      <Select
        name={name}
        value={value}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          className={cn(
            'relative w-full rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white px-[1rem] py-[0.75rem] h-[3rem] outline-none! shadow-none! focus:ring-0 leading-[150%] tracking-[-0.02625rem] text-[0.875rem]',
            variantSelectFieldClassnames[variant],
            {'pl-[3rem]': hasPrefix && value},
          )}
        >
          <SelectValue
            placeholder={placeholder}
            className='rounded-[1.25rem]'
          />
        </SelectTrigger>
        <SelectContent className='w-[41.875rem] shadow-[0_4px_32px_0_rgba(0,39,97,0.08)] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white'>
          <SelectGroup>
            {options?.map(({name, value, icon}, index) => (
              <SelectItem
                key={index}
                value={value}
                className={cn(
                  'p-[0.75rem] h-[3rem] rounded-[1.25rem] bg-white cursor-pointer',
                  {
                    'pl-[3rem]': hasPrefix,
                  },
                )}
              >
                {hasPrefix && icon && (
                  <Image
                    alt=''
                    width={24}
                    height={24}
                    src={icon}
                    className='absolute top-1/2 left-[0.75rem] -translate-y-1/2 w-[1.5rem] h-auto'
                  />
                )}
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
