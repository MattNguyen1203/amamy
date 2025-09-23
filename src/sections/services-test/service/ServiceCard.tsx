import React from 'react'
import Link from 'next/link'
import ImageV2 from '@/components/image/ImageV2'
import {ImageIcon} from '@/utils/type'

const ServiceCard = ({
  icon,
  title,
  description,
  subtitle,
  href,
}: {
  subtitle: string
  icon: ImageIcon
  title: string
  description: string
  href?: string
}) => {
  return (
    <Link
      href={href || ''}
      className='flex min-h-[12.0625rem] w-full min-w-[19.54167rem] flex-col items-start gap-[1.5rem] rounded-[1.5rem] bg-[#F8F9FA] p-[1.5rem] xsm:min-h-0 xsm:gap-[1.25rem] xsm:p-[1.25rem]'
    >
      <div className='flex items-center gap-[0.875rem]'>
        <ImageV2
          alt={icon.alt}
          src={icon.url}
          width={200}
          height={200}
          className='size-[3.25rem] xsm:size-[2rem]'
        />
        <span className='flex flex-col gap-y-[0.25rem]'>
          <p className='text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-greyscale-text60 xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'>
            {subtitle}
          </p>
          <p className='text-[1.25rem] font-bold leading-[1.5rem] tracking-[-0.05rem] text-Blue-Primary xsm:text-[1rem] xsm:leading-[1.2rem] xsm:tracking-[-0.04rem]'>
            {title}
          </p>
        </span>
      </div>
      <p className='text-[rgba(0, 0, 0, 0.80)] text-[1rem] font-medium leading-[1.5rem] tracking-[-0.03rem] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
        {description}
      </p>
    </Link>
  )
}

export default ServiceCard
