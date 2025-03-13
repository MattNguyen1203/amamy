import {IServicePage} from '@/utils/type'
import Link from 'next/link'
import type React from 'react'

interface Prop {
  data: IServicePage
}
const ShippingHero: React.FC<Prop> = ({data}) => {
  return (
    <section className='w-full bg-[#38b6ff] py-16 text-white'>
      <div className='w-full mx-auto px-[6rem] xsm:px-[1rem]'>
        {/* Breadcrumbs */}
        <div className='mb-16 flex items-center text-sm xsm:hidden'>
          <Link
            href='/'
            className='hover:underline'
          >
            Trang chủ
          </Link>
          <span className='mx-2'>/</span>
          <Link
            href='/dich-vu'
            className='hover:underline'
          >
            Dịch vụ
          </Link>
        </div>

        {/* Main content */}
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 text-[2.625rem] xsm:text-[1.125rem] font-bold leading-tight'>
            {data?.banner?.title || ''}
          </h1>
          <p className='text-[1rem] xsm:text-[0.875rem] leading-relaxed'>
            {data?.banner?.sub_title || ''}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ShippingHero
