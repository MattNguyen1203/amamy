import React from 'react'
import Image from 'next/image'

const ImageContainer = ({
  img,
  label,
  description,
}: {
  img: string
  label: string
  description: string
}) => {
  return (
    <div className='flex flex-col items-center text-center xsm:items-start xsm:text-start'>
      <div className='h-[28.125rem] w-[25.625rem] overflow-hidden rounded-[1.5rem] xsm:h-[18.054rem] xsm:w-[16.283rem]'>
        <Image
          src={img}
          alt={label}
          width={410}
          height={450}
          className='size-full object-cover'
        />
      </div>
      <div className='mt-4 xsm:mt-2'>
        <p className='text-[2.5rem] font-bold text-Blue-Primary xsm:text-[1.5rem]'>
          {label}
        </p>
        <p className='mt-2 text-base xsm:mt-1 xsm:max-w-[16.283rem] xsm:text-sm'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ImageContainer
