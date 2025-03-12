'use client'

import ICX from '@/sections/tao-don/ICX'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

const CustomBack = () => {
  const router = useRouter()
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  useEffect(() => {
    setHasPreviousPage(window.history.length > 1)
  }, [])

  const handleBack = () => {
    if (hasPreviousPage) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div
      onClick={handleBack}
      className='cursor-pointer size-[1.5rem]'
    >
      <ICX className='size-[1.5rem]' />
    </div>
  )
}

export default CustomBack
