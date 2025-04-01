'use client'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import {IServicePage} from '@/utils/type'
import type React from 'react'

interface Prop {
  data: IServicePage
}
const ShippingHero: React.FC<Prop> = ({data}) => {
  return (
    <section className='fade-section w-full bg-[#38b6ff] pb-20 xsm:py-8 text-white'>
      <div className='w-full mx-auto px-[6rem] xsm:px-[1rem]'>
        {/* Breadcrumbs */}
        <Breadcrumb
          type='blue'
          data={[{title: 'Dịch vụ', slug: ''}]}
          className='xsm:hidden pb-16'
        />

        {/* Main content */}
        <div className='text-center'>
          <h1
            dangerouslySetInnerHTML={{__html: data?.banner?.title || ''}}
            className='fade-item sm:[&_br]:hidden text-[2.625rem] xsm:text-[1.125rem] font-bold leading-[1.2] tracking-[-0.105rem]'
          ></h1>
          <p className='fade-item mt-4 mx-auto max-w-[41.25rem] text-[1rem] xsm:text-[0.875rem] leading-relaxed'>
            {data?.banner?.sub_title || ''}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ShippingHero
