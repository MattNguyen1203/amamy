import React from 'react'
import Link from 'next/link'
import ICAngleRight from '@/components/icon/ICAngleRight'

const ServiceContainer = ({
  service,
  slug,
}: {
  service?: string
  slug?: string
}) => {
  return (
    <div className='size-full'>
      <Link
        href={slug || '#'}
        className='group flex w-full items-center justify-between py-5 transition-all duration-300 hover:text-Blue-Primary'
      >
        <p className='text-start text-[1.25rem] font-medium leading-[100%] xsm:text-base'>
          {service}
        </p>
        <span>
          <ICAngleRight className='fill-black group-hover:fill-Blue-Primary' />
        </span>
      </Link>
    </div>
  )
}

export default ServiceContainer
