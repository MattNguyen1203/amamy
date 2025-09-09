import React from 'react'
import Image from 'next/image'

const ImageContainerMobile = ({
  img,
  label,
  description,
}: {
  img: string
  label: string
  description: string
}) => {
  return (
    <div className='flex flex-col items-start text-start'>
      <div className='h-[18.054rem] w-[16.283rem] overflow-hidden rounded-[1.5rem]'>
        <Image
          src={img}
          alt={label}
          width={260}
          height={288}
          className='size-full object-cover'
        />
      </div>
      <div className='mt-2'>
        <p className='text-[1.5rem] font-bold text-Blue-Primary'>{label}</p>
        <p className='mt-1 max-w-[16.283rem] text-sm'>{description}</p>
      </div>
    </div>
  )
}

export default ImageContainerMobile
