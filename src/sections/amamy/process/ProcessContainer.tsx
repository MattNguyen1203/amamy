import React from 'react'
import Image from 'next/image'

const ProcessContainer = ({
  number,
  icon,
  label,
  description,
  shortDesc,
}: {
  number: number
  icon: string
  label: string
  description: string
  shortDesc?: string
}) => {
  return (
    <div className='relative flex h-auto w-[25.625rem] items-center xsm:w-[17.813rem]'>
      <div className='left absolute top-[2.5rem] flex size-20 items-center justify-center rounded-full border border-Blue-Primary bg-white xsm:size-[4.438rem]'>
        <Image
          src={icon}
          alt=''
          width={40}
          height={40}
          className='size-10 object-cover xsm:size-9'
        />
      </div>
      <div className='ml-auto max-h-[15.813rem] max-w-[23.125rem] rounded-[1.25rem] border border-[#E3DBD8] bg-white py-8 pl-16 pr-10 xsm:max-h-[20.438rem] xsm:max-w-[15.563rem] xsm:py-7 xsm:pl-12 xsm:pr-5'>
        <p className='pb-[0.313rem] text-[1.125rem] font-semibold leading-[1.75rem] text-[#727272] xsm:text-base'>
          0{number}
        </p>
        <p className='text-[1.375rem] font-bold leading-[1.875rem] text-Blue-Primary xsm:text-base'>
          {label}
        </p>
        <p className='text-sm leading-[1.875rem] text-[#727272] xsm:hidden'>
          {description}
        </p>
        <p className='text-sm leading-[1.875rem] text-[#727272] sm:hidden'>
          {shortDesc}
        </p>
      </div>
    </div>
  )
}

export default ProcessContainer
