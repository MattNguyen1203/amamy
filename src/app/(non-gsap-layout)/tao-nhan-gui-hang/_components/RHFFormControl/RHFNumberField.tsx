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
import React from 'react'
import {Control} from 'react-hook-form'

interface RHFNumberFieldProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  description?: string
  required?: boolean
  labelClassName?: string
}

export default function RHFNumberField({
  control,
  name,
  label,
  placeholder,
  description,
  required = false,
  labelClassName,
}: RHFNumberFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field, fieldState}) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          // Allow empty string for clearing the field
          if (value === '') {
            // Set to 0 but display as empty string
            // This ensures schema validation works (expects number, not null)
            // Validation will fail with proper message: "phải lớn hơn 0"
            field.onChange(0, {shouldValidate: true})
            return
          }
          // Remove any non-digit characters (only allow digits 0-9)
          const integerValue = value.replace(/[^\d]/g, '')
          // If after removing non-digits, value is empty, set to 0
          if (integerValue === '') {
            field.onChange(0, {shouldValidate: true})
            return
          }
          const numValue = parseInt(integerValue, 10)

          // Only update if it's a valid number
          if (!isNaN(numValue)) {
            field.onChange(numValue, {shouldValidate: true})
          }
        }

        const handleBlur = () => {
          // Ensure value is an integer on blur
          // If value is already 0, keep it (validation will show error if required)
          if (
            field.value === '' ||
            field.value === undefined ||
            field.value === null
          ) {
            field.onChange(0, {shouldValidate: true})
          } else {
            const intValue = Math.floor(Math.abs(Number(field.value)))
            if (!isNaN(intValue)) {
              field.onChange(intValue, {shouldValidate: true})
            }
          }
          field.onBlur()
        }

        // Display empty string if value is 0, undefined, null, or empty string
        // This ensures empty field shows empty, not default value or 0
        const displayValue =
          field.value === 0 ||
          field.value === undefined ||
          field.value === null ||
          field.value === ''
            ? ''
            : String(field.value)

        return (
          <FormItem className='flex flex-col gap-y-[0.5rem] space-y-0'>
            <FormLabel
              className={cn(
                'space-x-[0.125rem] px-[1rem] text-[0.75rem] font-semibold tracking-[-0.015rem] text-black/80 xsm:px-[0.75rem]',
                labelClassName,
              )}
            >
              <span>{label}</span>
              {required && <span>*</span>}
            </FormLabel>
            <FormControl>
              <Input
                type='text'
                inputMode='numeric'
                placeholder={placeholder}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={field.ref}
                name={field.name}
                id={field.name}
                aria-invalid={fieldState.error ? 'true' : 'false'}
                aria-describedby={
                  fieldState.error
                    ? `${field.name}-error`
                    : description
                      ? `${field.name}-description`
                      : undefined
                }
                className={cn(
                  'h-[3rem] rounded-[1.25rem] border border-solid border-[#DCDFE4] bg-white px-[1rem] py-0 text-[0.875rem] font-medium leading-[150%] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] placeholder:text-black/30 xsm:h-[2.5rem] xsm:px-[0.75rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]',
                  fieldState.error && 'border-destructive',
                )}
              />
            </FormControl>
            {description && (
              <FormDescription
                dangerouslySetInnerHTML={{__html: description || ''}}
                className='px-[1rem] text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem] text-black/60 xsm:px-[0.75rem] [&_strong]:font-semibold [&_strong]:tracking-[-0.015rem] [&_strong]:text-[rgba(0,0,0,0.92)]'
              />
            )}
            <FormMessage className='px-[1rem] text-[0.75rem] font-medium leading-[140%] tracking-[-0.0225rem] xsm:px-[0.75rem]' />
          </FormItem>
        )
      }}
    />
  )
}
