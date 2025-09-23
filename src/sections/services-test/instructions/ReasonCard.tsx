import React from 'react'
import Image from 'next/image'
import ICArrowCircle from '@/components/icon/ICArrowCircle'

const ReasonCard = ({
  icon,
  label,
  desc,
}: {
  icon: string
  label: string
  desc: string
}) => {
  return (
    <div
      className='min-h-[19.9375rem] w-fit rounded-[1.5rem] xsm:h-fit xsm:min-h-0 xsm:min-w-[17.5rem] xsm:rounded-[0.8955rem] xsm:pb-[0.82rem]'
      style={{
        background: 'linear-gradient(247deg, #73C1FF 2.69%, #38B6FF 100%)',
      }}
    >
      <div className='flex items-start gap-x-[1.37rem] xsm:gap-x-[0.82rem]'>
        {/* Content Container */}
        <div className='ml-[1.81rem] mt-[1.87rem] flex flex-col gap-y-[0.81rem] text-white xsm:ml-[1rem] xsm:mt-[1.5rem]'>
          <p className='max-w-[11rem] text-[1.25rem] font-bold leading-[2.25rem] tracking-[-0.045rem] xsm:max-w-[7.375rem] xsm:text-[0.8955rem] xsm:leading-[1.34331rem] xsm:tracking-[-0.02688rem]'>
            {label}
          </p>
          <p className='max-w-[13rem] text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] xsm:max-w-[7.76119rem] xsm:text-[0.52238rem] xsm:leading-[0.78356rem] xsm:tracking-[-0.01569rem]'>
            {desc}
          </p>
        </div>
        {/* Image Container */}
        <div className='relative mr-[1.75rem] mt-[2.31rem] h-[8.125rem] w-[12.125rem] rounded-[1.4375rem] bg-white xsm:ml-[0.82rem] xsm:mr-[0.67rem] xsm:mt-[1.38rem] xsm:h-[4.85075rem] xsm:w-[7.23881rem] xsm:rounded-[0.85819rem]'>
          <Image
            src={icon}
            alt=''
            width={173}
            height={173}
            className='absolute -top-[4.2rem] object-cover xsm:-top-[3rem]'
          />
        </div>
      </div>

      <button className='ml-[1.81rem] mt-[2.06rem] flex h-[3.125rem] w-[26.375rem] items-center justify-between rounded-[1.25rem] bg-white px-[0.94rem] py-[0.54rem] xsm:ml-[1.08rem] xsm:mr-[0.67rem] xsm:mt-[1.14rem] xsm:h-[1.86569rem] xsm:w-[15.74625rem] xsm:rounded-[0.74625rem] xsm:px-[0.56rem] xsm:py-[0.3rem]'>
        <p className='text-[1.375rem] font-bold leading-[2.0625rem] tracking-[-0.04125rem] text-Blue-Primary xsm:text-[0.82088rem] xsm:leading-[1.23131rem] xsm:tracking-[-0.02463rem]'>
          Đóng gói chuẩn quốc tế
        </p>
        <ICArrowCircle className='size-[2rem] rotate-90 fill-Blue-Primary xsm:size-[1.194rem]' />
      </button>
    </div>
  )
}

export default ReasonCard
