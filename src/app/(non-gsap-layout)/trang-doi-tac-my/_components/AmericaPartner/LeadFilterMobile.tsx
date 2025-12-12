'use client'
import Close from '@/components/svg/Close'
import {Calendar} from '@/components/ui/calendar-customize-range'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer-v2'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {useMemo, useState} from 'react'
import {type DateRange} from 'react-day-picker'

export default function LeadFilter() {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const [confirmedDateRange, setConfirmedDateRange] = useState<
    DateRange | undefined
  >()
  const [selectedFilterText, setSelectedFilterText] =
    useState<string>('Hôm nay')

  // Get today's date at 00:00:00 to disable past dates
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Format date to Vietnamese format (dd/mm/yyyy)
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  // Format date range or single date for display
  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range) return ''
    if (range.from && !range.to) {
      // Single date selected
      return formatDate(range.from)
    }
    if (range.from && range.to) {
      // Check if from and to are the same day
      if (isSameDay(range.from, range.to)) {
        return formatDate(range.from)
      }
      // Range selected
      return `${formatDate(range.from)} - ${formatDate(range.to)}`
    }
    return 'Hôm nay'
  }

  // Check if date range is valid (has at least one date selected)
  const isDateRangeValid = useMemo(() => {
    return dateRange?.from !== undefined
  }, [dateRange])

  // Handle confirm button click
  const handleConfirm = () => {
    if (isDateRangeValid) {
      setConfirmedDateRange(dateRange)
      setSelectedFilterText('') // Clear text filter when custom date is selected
      setOpenDatePicker(false)
      setOpenFilter(false)
    }
  }

  // Initialize dateRange from confirmedDateRange when opening dialog
  const handleOpenDatePicker = () => {
    setDateRange(confirmedDateRange)
    setOpenDatePicker(true)
    setOpenFilter(false)
  }

  // Handle filter option click
  const handleFilterClick = (filterType: string) => {
    let filterText = ''

    switch (filterType) {
      case 'today':
        filterText = 'Hôm nay'
        break
      case 'this_week':
        filterText = 'Tuần này'
        break
      case 'this_month':
        filterText = 'Tháng này'
        break
      case 'prev_month':
        filterText = 'Tháng trước'
        break
      default:
        return
    }

    setSelectedFilterText(filterText)
    setConfirmedDateRange(undefined) // Clear date range when text filter is selected
    setOpenFilter(false)
  }

  // Check if filter is active
  const isFilterActive = (filterText: string): boolean => {
    return selectedFilterText === filterText
  }

  return (
    <>
      <button
        onClick={() => setOpenFilter(true)}
        className='hidden size-[3rem] items-center justify-center rounded-[0.875rem] bg-[#F8F8F8] xsm:flex'
      >
        <Image
          alt=''
          width={40}
          height={40}
          src='/icons/icon-filter.svg'
          className='size-[1.5rem] object-contain'
        />
      </button>
      <Drawer
        open={openFilter}
        onOpenChange={setOpenFilter}
      >
        <DrawerContent className='!rounded-t-[2rem] bg-white pb-[1.5rem] pt-[1.25rem]'>
          <DrawerHeader className='mb-[1rem] flex items-center justify-between rounded-t-[inherit] px-[1rem] py-0'>
            <DrawerTitle className='text-[1rem] font-semibold leading-[1.5] tracking-[-0.03rem] text-black'>
              Bộ lọc
            </DrawerTitle>
            <DrawerClose className='size-[1.25rem]'>
              <Close className='size-full stroke-black' />
            </DrawerClose>
          </DrawerHeader>

          <ul className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]/60'>
            <li
              data-filter='today'
              onClick={() => handleFilterClick('today')}
              className={cn(
                'h-auto cursor-pointer rounded-none p-[0.75rem]',
                isFilterActive('Hôm nay')
                  ? 'bg-[#F1F9FF] text-[#38B6FF]'
                  : 'bg-white',
              )}
            >
              Hôm nay
            </li>
            <li
              data-filter='this_week'
              onClick={() => handleFilterClick('this_week')}
              className={cn(
                'h-auto cursor-pointer rounded-none p-[0.75rem]',
                isFilterActive('Tuần này')
                  ? 'bg-[#F1F9FF] text-[#38B6FF]'
                  : 'bg-white',
              )}
            >
              Tuần này
            </li>
            <li
              data-filter='this_month'
              onClick={() => handleFilterClick('this_month')}
              className={cn(
                'h-auto cursor-pointer rounded-none p-[0.75rem]',
                isFilterActive('Tháng này')
                  ? 'bg-[#F1F9FF] text-[#38B6FF]'
                  : 'bg-white',
              )}
            >
              Tháng này
            </li>
            <li
              data-filter='prev_month'
              onClick={() => handleFilterClick('prev_month')}
              className={cn(
                'h-auto cursor-pointer rounded-none p-[0.75rem]',
                isFilterActive('Tháng trước')
                  ? 'bg-[#F1F9FF] text-[#38B6FF]'
                  : 'bg-white',
              )}
            >
              Tháng trước
            </li>
            <li
              onClick={handleOpenDatePicker}
              className='h-auto cursor-pointer rounded-none bg-white p-[0.75rem]'
            >
              Chọn thời gian
            </li>
          </ul>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={openDatePicker}
        onOpenChange={setOpenDatePicker}
      >
        <DrawerContent className='!rounded-t-[2rem] bg-white pb-[1.5rem] pt-[1.25rem]'>
          <DrawerHeader className='flex items-center justify-between rounded-t-[inherit] bg-white px-[1rem] pb-[1rem] pt-0'>
            <DrawerTitle className='text-[1rem] font-semibold leading-[1.5] tracking-[-0.03rem] text-black'>
              {formatDateRange(dateRange) || 'Chọn thời gian'}
            </DrawerTitle>
            <DrawerClose className='size-[1.25rem]'>
              <Close className='size-full stroke-black' />
            </DrawerClose>
          </DrawerHeader>

          <div className='max-h-[70vh] overflow-y-auto px-[1rem]'>
            <div className='mb-[1.25rem] flex space-x-[0.625rem]'>
              <Calendar
                mode='range'
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className='w-full bg-white xsm:p-0'
                classNames={{nav: 'hidden'}}
                showOutsideDays={false}
                disabled={{before: today}}
              />
            </div>
            <div className='z-5 absolute bottom-0 left-0 right-0 bg-white py-[1rem]'>
              <button
                type='button'
                disabled={!isDateRangeValid}
                onClick={handleConfirm}
                className='h-[2.8125rem] w-full rounded-full border-[0.09375rem] border-solid border-white/80 bg-[#38B6FF] disabled:cursor-not-allowed disabled:bg-[rgba(56,182,255,0.40)]'
              >
                <span className='text-[1rem] font-medium leading-[1.3] tracking-[-0.03rem] text-white'>
                  Xác nhận
                </span>
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
