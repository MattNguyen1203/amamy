'use client'

import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#242124,#003366)] text-gray-800'>
      <h1 className='mb-8 animate-bounce text-9xl font-bold'>
        <span className='animate-spin-custom inline-block text-white'>4</span>
        <span className='animate-ping-slow inline-block text-white'>0</span>
        <span className='animate-spin-custom inline-block text-white'>4</span>
      </h1>
      <p className='mb-8 animate-pulse text-2xl text-white'>
        Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link
        href='/'
        className=''
      >
        <Button
          variant='outline'
          size='lg'
        >
          Trang Chủ
        </Button>
      </Link>
    </div>
  )
}
