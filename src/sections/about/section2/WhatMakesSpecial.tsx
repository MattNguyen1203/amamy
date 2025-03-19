import {IAmamySpecialAbout} from '@/sections/about/about.interface'
import Image from 'next/image'

interface Prop {
  data: IAmamySpecialAbout
}
export default function WhatMakesSpecial({data}: Prop) {
  return (
    <section className='fade-section w-full mx-auto  p-[6rem] xsm:p-[1rem] bg-[#EDF5FA] xsm:bg-[#f7f7f7]'>
      <div className='rounded-[1.25rem] max-w-[88rem] xsm:max-w-full overflow-hidden '>
        <div className='grid sm:grid-cols-2 items-center bg-[#38b6ff]'>
          {/* Left content */}
          <div className='px-[2.0625rem] py-[2.25rem] xsm:p-[1rem]'>
            <h2 className='fade-item font-montserrat font-bold text-[2.875rem] xsm:text-[1.25rem] xsm:leading-[1.25rem] leading-[3.45rem] tracking-[-0.04em] text-white mb-[7.375rem] xsm:mb-[1rem]'>
              {data?.title}
            </h2>

            <div className='space-y-6 text-white'>
              <div
                className='fade-item font-montserrat font-medium text-[1rem] xsm:text-[0.875rem] xsm:leading-[1.25rem] leading-[1.5rem] tracking-[-0.01em]'
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              ></div>
            </div>
          </div>

          {/* Right image */}
          <div className='relative rounded-[1.25rem] h-full w-[49.625rem] xsm:w-full xsm:min-h-[14.25rem] min-h-[28.875rem] md:min-h-[28.875rem]'>
            <Image
              src={data?.image.url}
              alt={data?.image.alt}
              fill
              className='fade-item object-cover rounded-[1.25rem]'
              sizes='(max-width: 49.625rem) 100vw, 28.875rem'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
