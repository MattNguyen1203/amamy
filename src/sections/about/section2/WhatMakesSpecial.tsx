import {IAmamySpecialAbout} from '@/sections/about/about.interface'
import Image from 'next/image'

interface Prop {
  data: IAmamySpecialAbout
}
export default function WhatMakesSpecial({data}: Prop) {
  return (
    <section className='fade-section w-full mx-auto p-[6rem] xsm:p-[1rem] bg-[#EDF5FA] xsm:bg-[#f7f7f7]'>
      <div className='rounded-[1.25rem] max-w-[88rem] xsm:max-w-full overflow-hidden '>
        <div className='grid sm:grid-cols-2 items-start bg-[#38b6ff]'>
          {/* Left content */}
          <div className='px-[2.0625rem] py-[2.25rem] xsm:p-[1rem]'>
            <h2 className='fade-item font-montserrat font-bold text-[2.75rem] leading-[1.3] tracking-[-0.075rem] xsm:text-[1.25rem] xsm:leading-[1.2] xsm:tracking-[-0.05rem] text-white mb-[1.25rem] xsm:mb-[1rem]'>
              {data?.title}
            </h2>

            <div className='space-y-6 text-white'>
              <div
                className='fade-item xsm:space-y-[2rem] font-montserrat font-medium text-[1rem] xsm:text-[0.875rem] xsm:leading-[1.25rem] leading-[1.5rem] tracking-[-0.01em]'
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              ></div>
            </div>
          </div>

          {/* Right image */}
          <div className='relative rounded-[1.25rem] h-full w-[49.625rem] xsm:w-full xsm:h-[14.29169rem]'>
            <Image
              src={data?.image.url}
              alt={data?.image.alt}
              width={800 * 2}
              height={500 * 2}
              className='fade-item size-full object-cover rounded-[1.25rem]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
