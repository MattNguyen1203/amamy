'use client'
import React from 'react'
import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'

interface RadioFieldProps {
  name: string
  value: string
  options: {name: string; value: string}[]
  // eslint-disable-next-line no-unused-vars
  onChange: (name: string, value: string | number) => void
}

export default function RadioField({
  name,
  value,
  options,
  onChange,
}: RadioFieldProps) {
  const handleValueChange = (value: string | number) => {
    if (!onChange) return
    onChange(name, value)
  }
  if (!Array.isArray(options) || !options.length) {
    return null
  }
  return (
    <RadioGroup
      name={name}
      value={value}
      onValueChange={handleValueChange}
      className='py-[0.75rem] h-[3rem] relative flex items-center space-x-[2.5rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1rem] xsm:items-start xsm:h-auto gap-0 font-montserrat'
    >
      {options?.map(({name, value}, index) => (
        <div
          key={index}
          className='flex items-center space-x-2 cursor-pointer'
        >
          <Label className='flex items-center gap-[0.5rem] cursor-pointer'>
            <RadioGroupItem
              value={value}
              className='xsm:size-[1.125rem] size-[1.25rem] data-[state="checked"]:border-[#38B6FF]'
            />
            <span className='text-[0.75rem] font-semibold tracking-[-0.015rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'>
              {name}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
