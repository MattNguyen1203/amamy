'use client'

import Close from '@/components/svg/Close'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer-v2'
import {cn, formatWeekday} from '@/lib/utils'
import {
  CreateLabelFormValues,
  SHIPPING_METHOD_OPTIONS,
} from '@/schema/create-label.schema'
import {LoaderCircle} from 'lucide-react'
import {Control, useWatch} from 'react-hook-form'

interface OverviewMobileProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  control: Control<CreateLabelFormValues>
  isPending: boolean
}

export default function OverviewMobile({
  open,
  setOpen,
  control,
  isPending,
}: OverviewMobileProps) {
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
    <div className='hidden xsm:block'>
      <div className='fixed bottom-0 left-0 right-0 z-50 space-y-[0.75rem] border-t border-solid border-[#38B6FF] bg-white p-[1rem]'>
        <div className='flex items-center justify-between space-x-[0.5rem]'>
          <p className='text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]'>
            Giá Label dự tính:
          </p>
          <p className='text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem] text-[#38B6FF]'>
            100 USD
          </p>
        </div>
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='h-[2.625rem] w-full rounded-[1.25rem] bg-[#38B6FF] text-white'
        >
          <span className='text-[0.875rem] font-semibold leading-[1.3] tracking-[-0.02625rem]'>
            Xem tổng quan label
          </span>
        </button>
      </div>

      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerContent className='rounded-t-[2rem] bg-white'>
          <DrawerHeader className='hidden'>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className='space-y-[1rem] rounded-t-[inherit] bg-white pb-[1.5rem] pt-[1.25rem]'>
            <div className='space-y-[1.25rem]'>
              <div className='space-y-[0.75rem] px-[1rem] xsm:sticky'>
                <div className='flex items-center justify-between'>
                  <p className='text-[1.125rem] font-semibold leading-[1.5] tracking-[-0.03375rem] text-black xsm:text-[1rem] xsm:tracking-[-0.03rem]'>
                    Tổng quan Label
                  </p>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='size-[1.25rem] flex-center'
                  >
                    <Close className='size-full stroke-black' />
                  </button>
                </div>
                <div className='h-[0.0375rem] w-full bg-black/20'></div>
              </div>
              <div className='max-h-[75vh] space-y-[1rem] overflow-y-auto px-[1rem]'>
                <div className='space-y-[1rem] xsm:space-y-[0.875rem]'>
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
                  <p className='flex-1 text-[1.125rem] font-semibold leading-[1rem] tracking-[-0.03375rem] text-[rgba(0,0,0,0.92)] xsm:text-[1rem] xsm:tracking-[-0.03rem]'>
                    DỰ TÍNH GIÁ LABEL:
                  </p>
                  <p className='shrink-0 text-[1.25rem] font-semibold leading-[1rem] tracking-[-0.0375rem] text-[#38B6FF] xsm:text-[1.125rem] xsm:tracking-[-0.03375rem]'>
                    100 USD
                  </p>
                </div>
                <div className='hidden pt-[0.75rem] xsm:block'>
                  <button
                    type='submit'
                    form='create-label-form'
                    disabled={isPending}
                    className='h-[2.625rem] w-full rounded-full bg-[#38B6FF] ring-1 ring-white/50 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <span
                      className={cn(
                        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0',
                        isPending && 'opacity-100',
                      )}
                    >
                      <LoaderCircle className='size-[1.25rem] animate-spin text-white' />
                    </span>
                    <span
                      className={cn(
                        'text-[0.875rem] font-medium leading-[1.3] tracking-[-0.02625rem] text-white',
                        isPending && 'opacity-0',
                      )}
                    >
                      Gửi thông tin
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
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
          'text-[1rem] font-medium leading-[1.5] tracking-[-0.01rem] text-[rgba(26,26,26,0.75)] xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]',
          labelClassName,
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'max-w-[12.375rem] break-words text-right text-[1rem] font-semibold leading-[1.4] tracking-[-0.03rem] text-[#1A1A1A] xsm:text-[0.875rem] xsm:tracking-[0.02625rem]',
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  )
}
