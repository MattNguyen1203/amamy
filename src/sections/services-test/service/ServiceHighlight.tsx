import React from 'react'
import Link from 'next/link'
import ICArrowCircle from '@/components/icon/ICArrowCircle'
import ImageV2 from '@/components/image/ImageV2'

const ServiceHighlight = ({
  backgroundUrl,
  title,
  href,
}: {
  title: string
  backgroundUrl: string
  href?: string
}) => (
  <Link
    href={href || ''}
    className='fade-in-box-card-service-2 relative h-[20.625rem] w-[30.75rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white xsm:h-[14.40181rem] xsm:w-[20.75rem] xsm:min-w-max'
  >
    <div
      className='relative h-full bg-cover bg-center'
      style={{backgroundImage: `url(${backgroundUrl})`}}
    >
      <div className='flex h-full w-full flex-col items-center justify-end gap-5 p-4 xsm:px-[0.5rem] xsm:py-[0.625rem]'>
        <div className='flex w-full items-center gap-4 rounded-[1.25rem] bg-background-elevation5 px-4 py-2.5 xsm:rounded-full'>
          <div className='mr-auto text-[1.375rem] font-bold text-[#38B6FF] xsm:text-[0.875rem]'>
            {title}
          </div>
          <ICArrowCircle className='rotate-90 fill-Blue-Primary' />
        </div>
      </div>
      <ImageV2
        alt=''
        width={519}
        height={336}
        src={backgroundUrl}
        className='absolute inset-0 z-[-1] size-full object-cover'
      />
    </div>
  </Link>
)

export default ServiceHighlight
