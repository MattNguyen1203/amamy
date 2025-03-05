import {AboutWPResponse} from '@/utils/type'
import Image from 'next/image'

interface Prop {
  data: AboutWPResponse
}
export default function WhatMakesSpecial({data}: Prop) {
  return (
    <section className='w-full mx-auto  p-[6rem] bg-[#EDF5FA]'>
      <div className='rounded-[1.25rem] max-w-[88rem] overflow-hidden '>
        <div className='grid sm:grid-cols-2 items-center bg-[#38b6ff]'>
          {/* Left content */}
          <div className='px-[2.0625rem] py-[2.25rem]'>
            <h2 className='font-montserrat font-bold text-[2.875rem] leading-[3.45rem] tracking-[-0.04em] text-white mb-[7.375rem]'>
              {data?.acf.amamy_special.title}
            </h2>

            <div className='space-y-6 text-white'>
              <p
                className='font-montserrat font-medium text-[1rem] leading-[1.5rem] tracking-[-0.01em]'
                dangerouslySetInnerHTML={{
                  __html: data?.acf.amamy_special.description,
                }}
              ></p>
            </div>
          </div>

          {/* Right image */}
          <div className='relative rounded-[1.25rem] h-full w-[49.625rem] min-h-[28.875rem] md:min-h-[28.875rem]'>
            <Image
              src={data?.acf.amamy_special.image.url}
              alt={data?.acf.amamy_special.image.alt}
              fill
              className='object-cover'
              sizes='(max-width: 49.625rem) 100vw, 28.875rem'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
