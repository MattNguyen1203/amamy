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
    let val = e.target.value

    if (type === 'number') {
      // Chuyển dấu phẩy thành dấu chấm (iOS thường nhập dấu phẩy)
      val = val.replace(',', '.')
      // Chỉ giữ lại số và dấu chấm
      val = val.replace(/[^0-9.]/g, '')

      // Cho phép nhiều trường hợp trung gian như "1." hoặc "1.0"
      onChange(name, val)
      return
    }
    onChange(name, val)
  }
  return (
    <Label className='flex flex-col space-y-[0.3125rem] relative xsm:space-y-[0.375rem]'>
      <span className='text-[0.75rem] text-black/80 font-semibold tracking-[-0.015rem] leading-normal xsm:leading-[140%]'>
        {label}
      </span>

      <Input
        name={name}
        type={type === 'number' ? 'text' : type} // Dùng text để iOS hiện keypad số
        inputMode='decimal' // hoặc "numeric" nếu chỉ số nguyên
        pattern={type === 'number' ? '[0-9.]*' : undefined}
        step={type === 'number' ? 0.5 : undefined}
        min={type === 'number' ? 0 : undefined}
        placeholder={placeholder}
        className='rounded-[1.25rem] bg-white border border-solid border-[#DCDFE4] h-[3rem] px-[1rem] py-[0.75rem] placeholder:text-black/30  text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] shadow-none outline-none! focus-visible:ring-0 text-[rgba(0,0,0,0.92)] xsm:h-[2.5rem] xsm:border-[0.6px] xsm:px-[0.75rem] xsm:text-[0.8125rem]'
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
