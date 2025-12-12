'use client'
import {cn, formatWeekday} from '@/lib/utils'
import {
  CreateLabelFormValues,
  SHIPPING_METHOD_OPTIONS,
} from '@/schema/create-label.schema'
import {LoaderCircle} from 'lucide-react'
import React from 'react'
import {Control, useWatch} from 'react-hook-form'

interface OverviewProps {
  control: Control<CreateLabelFormValues>
  isPending: boolean
}

export default function Overview({control, isPending}: OverviewProps) {
  const {
    fullName,
    phone,
    email,
    customerCode,
    detailedAddress,
    pickupDate,
    packageWeights,
    shippingMethod,
  } = useWatch({control: control})

  const normalizedPickupDate = (pickupDate: Date) => {
    const weekday = formatWeekday(pickupDate)
    const formattedDate = pickupDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return `${weekday} - ${formattedDate}`
  }

  return (
    <div className='relative w-full space-y-[1rem]'>
      <div className='space-y-[1.25rem] rounded-[3rem] bg-[#F8F8F8] p-[1.75rem]'>
        <div className='space-y-[0.75rem]'>
          <div className='flex items-center justify-between'>
            <p className='text-[1.125rem] font-semibold leading-[1.5] tracking-[-0.03375rem] text-black'>
              Tổng quan Label
            </p>
          </div>
          <div className='h-[0.0375rem] w-full bg-black/20'></div>
        </div>
        <div className='space-y-[1rem]'>
          <OverviewItem
            label='Tên người gửi:'
            value={fullName || ''}
          />
          <OverviewItem
            label='Số điện thoại người gửi:'
            value={phone || ''}
          />
          <OverviewItem
            label='Email:'
            value={email || ''}
          />
          <OverviewItem
            label='Mã khách hàng:'
            value={customerCode || ''}
          />
          <OverviewItem
            label='Địa chỉ nhận hàng:'
            value={detailedAddress || ''}
          />
          {pickupDate &&
            shippingMethod === SHIPPING_METHOD_OPTIONS.UPS_PICKUP && (
              <OverviewItem
                label='Thời gian lấy hàng tại nhà:'
                value={normalizedPickupDate(pickupDate) || '--'}
                valueClassName='text-[#33A6E8]'
              />
            )}
          <div className='space-y-[0.75rem]'>
            {Array.isArray(packageWeights) &&
              packageWeights.map((weight, index) => {
                const weightValue = weight
                  ? weight.toString() + ' LBS'
                  : '0 LBS'
                return (
                  <OverviewItem
                    key={index}
                    label={`Kiện hàng số ${index + 1}`}
                    value={weightValue}
                    valueClassName='text-[#33A6E8]'
                  />
                )
              })}
          </div>
        </div>
        <div className='h-[0.0375rem] w-full bg-black/20'></div>
        <div className='flex items-center justify-between space-x-[0.5rem] py-[0.5rem]'>
          <p className='flex-1 text-[1.125rem] font-semibold leading-[1rem] tracking-[-0.03375rem] text-[rgba(0,0,0,0.92)]'>
            DỰ TÍNH GIÁ LABEL:
          </p>
          <p className='shrink-0 text-[1.25rem] font-semibold leading-[1rem] tracking-[-0.0375rem] text-[#38B6FF]'>
            100 USD
          </p>
        </div>
      </div>
      <button
        type='submit'
        disabled={isPending}
        className='relative h-[2.8125rem] w-full rounded-[1.25rem] border-[1.5px] border-solid border-white/80 bg-[#38B6FF] flex-center disabled:cursor-not-allowed disabled:opacity-50'
      >
        <span
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0',
            isPending && 'opacity-100',
          )}
        >
          <LoaderCircle className='size-[1.5rem] animate-spin text-white' />
        </span>
        <span
          className={cn(
            'text-[1rem] font-medium leading-[1.3] tracking-[-0.03rem] text-white',
            isPending && 'opacity-0',
          )}
        >
          Gửi thông tin
        </span>
      </button>
    </div>
  )
}

function OverviewItem({
  label,
  value,
  labelClassName,
  valueClassName,
}: {
  label: string
  value: string
  labelClassName?: string
  valueClassName?: string
}) {
  return (
    <div className='flex items-start justify-between space-x-[1.25rem]'>
      <p
        className={cn(
          'text-[1rem] font-medium leading-[1.5] tracking-[-0.01rem] text-[rgba(26,26,26,0.75)]',
          labelClassName,
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'flex-1 break-words text-right text-[1rem] font-semibold leading-[1.4] tracking-[-0.03rem] text-[#1A1A1A]',
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  )
}
