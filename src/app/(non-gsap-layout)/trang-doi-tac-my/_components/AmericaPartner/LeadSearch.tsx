'use client'

import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import React, {useState} from 'react'

interface LeadSearchProps {
  className?: string
}

export default function LeadSearch({className}: LeadSearchProps) {
  const isMobile = useIsMobile()
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <label
      className={cn(
        'flex h-[3rem] w-[28.125rem] shrink-0 items-center space-x-[0.5rem] rounded-[1.25rem] bg-[#F8F8F8] px-[1rem] xsm:w-[17.9375rem]',
        className,
      )}
    >
      <Image
        alt=''
        width={40}
        height={40}
        src='/icons/icon-search.svg'
        className='size-[1.25rem] object-contain'
      />
      <input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={
          isMobile
            ? 'Nhập từ khoá tìm kiếm'
            : 'Nhập tên, email, sđt hoặc mã KH bạn muốn tìm'
        }
        className='h-full flex-1 bg-transparent text-[0.875rem] leading-[1.3] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] outline-none placeholder:text-black/60'
      />
    </label>
  )
}
