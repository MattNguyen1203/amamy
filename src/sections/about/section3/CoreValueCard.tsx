'use client'

interface CoreValueCardProps {
  imageSrc: string
  imageAlt: string
  label: string
  title: string
  description: string
}

import Image from 'next/image'

const CoreValueCard = ({
  imageSrc,
  imageAlt,
  label,
  title,
  description,
}: CoreValueCardProps) => {
  return (
    <section className='container mx-auto px-0 py-16 xsm:p-0 xsm:pb-[1rem]'>
      <div className='max-w-4xl xsm:max-w-[20rem] mx-auto'>
        <div className='rounded-[1.25rem] overflow-hidden bg-white shadow-lg'>
          {/* Image container */}
          <div className='relative w-full h-[15.9975rem] md:h-[15.9975rem] xsm:h-[13.3125rem]'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className='object-cover xsm:h-[13.3125rem]'
              sizes='(max-width: 28.6875rem) 100vw, 15.9975rem'
              priority
            />
          </div>

          {/* Content container */}
          <div className='px-[1.25rem] py-[1.5rem]'>
            <span className='mb-[0.5rem] font-montserrat font-semibold text-[0.875rem] xsm:text-[0.75rem] leading-[1.5] tracking-[-0.02em] text-[rgba(0,0,0,0.8)] flex items-center'>
              {label}
            </span>

            <h2 className='line-clamp-2 mb-[0.75rem] font-montserrat font-semibold text-[1.5rem] xsm:text-[1rem] leading-[1.3] tracking-[-0.045rem] text-[rgba(0,0,0,0.8)] self-stretch'>
              {title}
            </h2>

            <p className='font-montserrat font-normal text-[0.875rem] leading-[1.5] xsm:text-[0.75rem] tracking-[-0.03em] text-[rgba(0,0,0,0.8)] self-stretch max-h-[6.5625rem] line-clamp-5 xsm:line-clamp-4 xsm:max-h-[5rem]'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreValueCard
