import React from 'react'
import Image from 'next/image'

const ProcessContainer = ({
  number,
  icon,
  label,
  description,
}: {
  number: number
  icon: string
  label: string
  description: string
}) => {
  return (
    <div className='relative flex h-auto w-[25.625rem] items-center'>
      <div className='left absolute top-[2.5rem] flex size-20 items-center justify-center rounded-full border border-Blue-Primary bg-white'>
        <Image
          src={icon}
          alt=''
          width={40}
          height={40}
          className='size-10 object-cover'
        />
      </div>
      <div className='ml-auto max-h-[15.813rem] max-w-[23.125rem] rounded-[1.25rem] border border-[#E3DBD8] bg-white px-16 py-8'>
        <p className='text-[1.125rem] font-semibold leading-[1.75rem] text-[#727272]'>
          0{number}
        </p>
        <p className='text-[1.375rem] font-bold leading-[1.875rem] text-Blue-Primary'>
          {label}
        </p>
        <p className='text-sm leading-[1.875rem] text-[#727272]'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ProcessContainer
