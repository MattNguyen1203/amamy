/* eslint-disable no-unused-vars */
'use client'

import React, {useEffect, useMemo, useState} from 'react'
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
import useIsMobile from '@/hooks/useIsMobile'

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
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()

  const variantSelectFieldClassnames: Record<SelectFieldVariant, string> = {
    primary:
      'text-[rgba(0,0,0,0.92)] font-medium data-[placeholder]:text-[rgba(0,0,0,0.92)] placeholder:text-[rgba(0,0,0,0.92)]',
    secondary:
      'text-[#38B6FF] font-semibold uppercase data-[placeholder]:normal-case data-[placeholder]:text-[rgba(0,0,0,0.3)] placeholder:text-[rgba(0,0,0,0.3)]',
  }

  const activeItem = useMemo(() => {
    return options?.find((opt) => opt.value === value) || null
  }, [value, options])

  const handleValueChange = (value: string) => {
    if (!onChange) return
    onChange(name, value)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className='flex flex-col space-y-[0.3125rem] font-montserrat'>
        {label && (
          <Label className='text-[0.75rem] text-black/80 font-semibold tracking-[-0.015rem] leading-normal'>
            {label}
          </Label>
        )}
        <div className='w-full xsm:block hidden '>
          <button
            disabled={!options?.length}
            onClick={() => setOpen(true)}
            className='w-full relative'
          >
            <p
              className={cn(
                'relative w-full rounded-[1.25rem] border border-solid border-[#DCDFE4] px-[0.75rem] outline-none! shadow-none! focus:ring-0 leading-[1rem] tracking-[-0.02438rem] text-[0.8125rem] font-montserrat text-left hidden h-[2.5rem] bg-white focus-visible:ring-0 xsm:flex items-center space-x-[0.75rem] line-clamp-1',
                variantSelectFieldClassnames[variant],
                {
                  'xsm:text-[rgba(0,0,0,0.3)]':
                    !value && variant === 'secondary',
                  'opacity-50 cursor-not-allowed pointer-events-none':
                    !options?.length,
                  'xsm:font-medium xsm:normal-case': !activeItem,
                },
              )}
            >
              {hasPrefix && activeItem?.icon && (
                <Image
                  alt=''
                  width={24}
                  height={24}
                  src={activeItem?.icon}
                  className='w-[1.5rem] h-auto shrink-0'
                />
              )}
              <span>{activeItem ? activeItem?.name : placeholder}</span>
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={20}
              height={20}
              viewBox='0 0 20 20'
              fill='none'
              className='absolute top-1/2 right-[0.625rem] -translate-y-1/2 size-[1.25rem]'
            >
              <path
                d='M13.3334 8.33337L10.0001 11.6667L6.66675 8.33337'
                stroke='#1F648C'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <Select
          name={name}
          value={value}
          disabled={!options?.length}
          onValueChange={handleValueChange}
        >
          <SelectTrigger
            className={cn(
              'relative w-full rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white px-[1rem] py-[0.75rem] h-[3rem] outline-none! shadow-none! focus:ring-0 leading-[150%] tracking-[-0.02625rem] text-[0.875rem] font-montserrat xsm:hidden',
              variantSelectFieldClassnames[variant],
              {'pl-[3rem]': hasPrefix && value},
            )}
          >
            <SelectValue
              placeholder={placeholder}
              className='rounded-[1.25rem]'
            />
          </SelectTrigger>
          <SelectContent className='w-[min(41.875rem,100%)] shadow-[0_4px_32px_0_rgba(0,39,97,0.08)] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white xsm:hidden'>
            <SelectGroup className='xsm:hidden'>
              {options?.map(({name, value, icon}, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  className={cn(
                    'p-[0.75rem] h-[3rem] rounded-[1.25rem] bg-white cursor-pointer font-montserrat',
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

      {isMobile && (
        <>
          <div
            onClick={() => setOpen(false)}
            className={cn(
              'fixed top-0 left-0 w-full h-full z-[9998] bg-[rgba(0,0,0,0.5)] opacity-0 invisible transition-all duration-700 ease-in-out',
              {'opacity-100 visible': open},
            )}
          ></div>
          <div
            className={cn(
              'bg-white rounded-t-[1.25rem] overflow-hidden fixed bottom-0 left-0 w-full z-[9999] translate-y-full hidden xsm:block transition-transform duration-700 ease-in-out',
              {
                'translate-y-0': open,
              },
            )}
          >
            <div className='p-[0.5rem] flex items-center justify-between border-b border-solid border-[#DCDFE4] sticky top-0 bg-white'>
              <div className='size-[1.5rem]'></div>
              <p className='text-[rgba(0,0,0,0.92)] font-semibold text-[0.75rem] tracking-[-0.015rem] '>
                Chọn dịch vụ gửi hàng
              </p>
              <div
                onClick={() => setOpen(false)}
                className='size-[1.5rem]'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  className='size-full'
                >
                  <path
                    d='M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16'
                    stroke='black'
                    strokeOpacity='0.6'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
            <div className='max-h-[70vh] overflow-y-auto bg-white'>
              {options.map(({name: optName, value: optValue, icon}, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleValueChange(optValue)
                    setOpen(false)
                  }}
                  className={cn(
                    'p-[0.75rem] flex items-center space-x-[0.75rem] border-y border-solid border-[#F8F8F8] w-full',
                    value === optValue && 'bg-blue-100',
                  )}
                >
                  {hasPrefix && icon && (
                    <Image
                      alt=''
                      width={24}
                      height={24}
                      src={icon}
                      className='mr-2'
                    />
                  )}
                  <p className='text-[0.875rem] font-medium tracking-[-0.02625rem] leading-[150%] text-[rgba(0,0,0,0.92)] line-clamp-1'>
                    {optName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
