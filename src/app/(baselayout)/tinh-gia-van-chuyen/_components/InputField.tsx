'use client'

import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import React from 'react'

type InputFieldType = 'text' | 'number'

interface InputFieldProps {
  name: string
  type: InputFieldType
  label: string
  description?: string
  placeholder: string
  value: string | number
  // eslint-disable-next-line no-unused-vars
  onChange: (name: string, value: string | number) => void
}

export default function InputField({
  name,
  label,
  placeholder,
  type,
  description,
  value,
  onChange,
}: InputFieldProps) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (type === 'number') {
      if (val === '') {
        onChange(name, '')
        return
      }

      const num = Number(val)
      if (!isNaN(num) && num >= 0) {
        onChange(name, num)
      }
      return
    }

    onChange(name, val)
  }
  return (
    <Label className='flex flex-col space-y-[0.3125rem] '>
      <span className='text-[0.75rem] text-black/80 font-semibold tracking-[-0.015rem] leading-normal'>
        {label}
      </span>

      <Input
        name={name}
        type={type}
        step={0.5}
        min={0}
        placeholder={placeholder}
        className='rounded-[1.25rem] bg-white border border-solid border-[#DCDFE4] h-[3rem] px-[1rem] py-[0.75rem] placeholder:text-black/30 text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] shadow-none! outline-none! focus-visible:ring-0'
        value={value}
        onChange={handleValueChange}
      />
      {description && (
        <p className='mt-[0.25rem] text-black/60 text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem]'>
          {description}
        </p>
      )}
    </Label>
  )
}
