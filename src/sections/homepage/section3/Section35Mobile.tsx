import ImageV2 from '@/components/image/ImageV2'
import { ShippingServiceObject } from '@/utils/type'
import React from 'react'

type Props = {
    sectionCountry: ShippingServiceObject
}

const Section35Mobile = ({ sectionCountry }: Props) => {
    console.log(sectionCountry)
  return (
    <div className='xsm:flex hidden flex-col mx-[1rem] mt-[1.5rem] mb-[1rem] '>
      <h2 className='text-center text-[1.125rem] not-italic font-bold leading-[120%] w-[16.5625rem] mx-auto'>Cung cấp dịch vụ gửi hàng qua nhiều quốc gia</h2>
      <div className='grid grid-cols-2  gap-[0.75rem] mt-[1rem]'>
        {sectionCountry.list_country.map((item, index) => {
          return (
            <div
              key={index}
              className='flex pl-2 pr-4 py-2 items-center gap-[0.75rem] bg-[#fff] rounded-[0.5rem]'
            >
              <ImageV2 alt={item.flag_img.alt} src={item.flag_img.url} width={1000} height={1000} className='w-[2.5rem] h-[2.5rem] rounded-full' />
              <p className='text-[0.875rem] not-italic font-semibold leading-[130%]'>{item.country}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Section35Mobile
