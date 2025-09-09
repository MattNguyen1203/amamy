import React from 'react'
import Image from 'next/image'

const ImageContainerDesktop = ({
  img,
  label,
  description,
}: {
  img: string
  label: string
  description: string
}) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='h-[28.125rem] w-[25.625rem] overflow-hidden rounded-[1.5rem]'>
        <Image
          src={img}
          alt={label}
          width={410}
          height={450}
          className='size-full object-cover'
        />
      </div>
      <div className='mt-4'>
        <p className='text-[2.5rem] font-bold text-Blue-Primary'>{label}</p>
        <p className='mt-2 text-base'>{description}</p>
      </div>
    </div>
  )
}

export default ImageContainerDesktop
