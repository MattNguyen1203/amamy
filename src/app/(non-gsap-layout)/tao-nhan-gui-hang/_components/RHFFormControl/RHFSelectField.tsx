import React, {useEffect, useMemo, useRef, useState} from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-v2'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {ControllerRenderProps, FieldValues, FieldPath} from 'react-hook-form'
import {Drawer, DrawerContent} from '@/components/ui/drawer-v2'
import ICChevronDown from '@/components/icon/ICChevronDown'

interface RHFSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  label: string
  placeholder: string
  options: {name: string; value: string; icon?: string}[]
  hasPrefix?: boolean
  field: ControllerRenderProps<TFieldValues, TName>
}

export default function RHFSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  placeholder,
  options,
  hasPrefix,
  field,
}: RHFSelectFieldProps<TFieldValues, TName>) {
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()
  const {value, onChange, name} = field
  const selectTriggerRef = useRef<HTMLButtonElement>(null)

  const activeItem = useMemo(() => {
    return options?.find((opt) => opt.value === value) || null
  }, [value, options])

  const handleValueChange = (newValue: string) => {
    onChange(newValue)
  }

  const handleButtonClick = () => {
    if (!isMobile) {
      // Trigger SelectTrigger programmatically on desktop
      selectTriggerRef.current?.click()
    } else {
      // Open drawer on mobile
      setOpen(true)
    }
  }

  return (
    <FormItem>
      {label && (
        <FormLabel className='font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.8)]'>
          {label}
        </FormLabel>
      )}
      <div className='flex flex-col space-y-[0.3125rem] font-montserrat'>
        <div className='w-full'>
          <button
            type='button'
            disabled={!options?.length}
            onClick={handleButtonClick}
            ref={field.ref}
            className='relative flex h-[3rem] w-full items-center space-x-[0.5rem] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white px-[1rem]'
          >
            {hasPrefix && activeItem?.icon && (
              <Image
                alt=''
                width={24}
                height={24}
                src={activeItem.icon}
                className='size-[1.5rem] shrink-0 object-contain'
              />
            )}
            <p className='flex-1 text-left text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]'>
              {activeItem ? activeItem.name : placeholder}
            </p>
            <ICChevronDown className='size-[1.5rem] shrink-0' />
          </button>
        </div>
        <FormControl>
          <Select
            name={name}
            value={value}
            open={open}
            onOpenChange={setOpen}
            disabled={!options?.length}
            onValueChange={handleValueChange}
          >
            <SelectTrigger
              ref={selectTriggerRef}
              className='sr-only xsm:hidden'
              aria-hidden='true'
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              sideOffset={10}
              className='w-[min(41.875rem,100%)] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white shadow-[0_4px_32px_0_rgba(0,39,97,0.08)] xsm:hidden'
            >
              <SelectGroup className='xsm:hidden'>
                {options?.map(({name, value, icon}, index) => (
                  <SelectItem
                    key={index}
                    value={value}
                    className={cn(
                      'h-[3rem] cursor-pointer rounded-[1.25rem] bg-white p-[0.75rem] font-montserrat',
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
                        className='absolute left-[0.75rem] top-1/2 h-auto w-[1.5rem] -translate-y-1/2'
                      />
                    )}
                    <span className='text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]'>
                      {name}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </div>
      <FormMessage className='text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem]' />

      {isMobile && (
        <Drawer
          open={open}
          onOpenChange={setOpen}
        >
          <DrawerContent className='rounded-t-[1.25rem] bg-white'>
            <div className='sticky top-0 flex items-center justify-between rounded-t-[inherit] border-b border-solid border-[#DCDFE4] bg-white p-[0.5rem]'>
              <div className='size-[1.5rem]'></div>
              <p className='text-[0.75rem] font-semibold tracking-[-0.015rem] text-[rgba(0,0,0,0.92)]'>
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
            <div className='h-[50vh] overflow-y-auto bg-white'>
              {options.map(({name: optName, value: optValue, icon}, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleValueChange(optValue)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center space-x-[0.75rem] border-y border-solid border-[#F8F8F8] p-[0.75rem]',
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
                  <p className='line-clamp-1 text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]'>
                    {optName}
                  </p>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </FormItem>
  )
}
