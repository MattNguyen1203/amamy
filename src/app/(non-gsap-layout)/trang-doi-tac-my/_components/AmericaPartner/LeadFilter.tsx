'use client'
import {Calendar} from '@/components/ui/calendar-customize-range'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import {useMemo, useState} from 'react'
import {type DateRange} from 'react-day-picker'

interface LeadFilterProps {
  className?: string
}

export default function LeadFilter({className}: LeadFilterProps) {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const [confirmedDateRange, setConfirmedDateRange] = useState<
    DateRange | undefined
  >()
  const [selectedFilterText, setSelectedFilterText] = useState<string>('')

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

  // Get display text for filter
  const getFilterDisplayText = (): string => {
    if (selectedFilterText) {
      return selectedFilterText
    }
    if (confirmedDateRange) {
      return formatDateRange(confirmedDateRange)
    }
    return 'Hôm nay'
  }

  return (
    <>
      <DropdownMenu
        open={openFilter}
        onOpenChange={setOpenFilter}
      >
        <DropdownMenuTrigger
          asChild
          className={cn(
            'h-[3rem] w-[21.25rem] shrink-0 rounded-[1.25rem] !border-none bg-[#F8F8F8] !outline-none !ring-0 xsm:hidden xsm:size-[3rem]',
            className,
          )}
        >
          <button>
            <p className='flex w-full items-center space-x-[0.5rem] px-[1rem] text-left text-[0.875rem] leading-[1.5] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]'>
              <span className='font-bold'>Bộ lọc:</span>
              <span className='flex-1 font-medium opacity-60'>
                {getFilterDisplayText()}
              </span>
              <span>
                <Image
                  alt=''
                  width={40}
                  height={40}
                  src='/icons/icon-chevrondown.svg'
                  className='size-[1.5rem] object-contain'
                />
              </span>
            </p>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-[21.25rem] rounded-[0.75rem] border border-solid border-[#DCDFE4] bg-white p-0'
        >
          <DropdownMenuGroup className='w-full rounded-none p-0 text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)]/60'>
            <DropdownMenuItem
              data-filter='today'
              onClick={() => handleFilterClick('today')}
              className='h-auto cursor-pointer rounded-none !border-none bg-white p-[0.75rem] !outline-none !ring-0'
            >
              Hôm nay
            </DropdownMenuItem>
            <DropdownMenuItem
              data-filter='this_week'
              onClick={() => handleFilterClick('this_week')}
              className='h-auto cursor-pointer rounded-none !border-none bg-white p-[0.75rem] !outline-none !ring-0'
            >
              Tuần này
            </DropdownMenuItem>
            <DropdownMenuItem
              data-filter='this_month'
              onClick={() => handleFilterClick('this_month')}
              className='h-auto cursor-pointer rounded-none !border-none bg-white p-[0.75rem] !outline-none !ring-0'
            >
              Tháng này
            </DropdownMenuItem>
            <DropdownMenuItem
              data-filter='prev_month'
              onClick={() => handleFilterClick('prev_month')}
              className='h-auto cursor-pointer rounded-none !border-none bg-white p-[0.75rem] !outline-none !ring-0'
            >
              Tháng trước
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleOpenDatePicker}
              className='h-auto cursor-pointer rounded-none !border-none bg-white p-[0.75rem] !outline-none !ring-0'
            >
              Chọn thời gian
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDatePicker}
        onOpenChange={setOpenDatePicker}
      >
        <DialogContent className='w-[48.9375rem] max-w-[unset] gap-0 overflow-hidden !rounded-[1.75rem] border-0 bg-white p-0 [&_.button-close]:size-[1.5rem] [&_.button-close]:text-white'>
          <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className='flex h-[3.1875rem] items-center justify-center bg-[#38B6FF]'>
            <p className='text-[1.125rem] font-semibold leading-[1.5] tracking-[-0.03375rem] text-white'>
              {formatDateRange(dateRange) || 'Chọn thời gian'}
            </p>
          </div>
          <div className='px-[1.25rem] pb-[1.25rem] pt-[0.75rem]'>
            <div className='mb-[1.25rem] flex space-x-[0.625rem]'>
              <Calendar
                mode='range'
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className='w-full bg-white'
                classNames={{nav: 'hidden'}}
                showOutsideDays={false}
                disabled={{before: today}}
              />
            </div>
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
        </DialogContent>
      </Dialog>
    </>
  )
}
