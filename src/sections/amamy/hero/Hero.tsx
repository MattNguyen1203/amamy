/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ICArrowRight from '@/components/icon/ICArrowRight'
import Link from 'next/link'

const Hero = ({data}: {data: any}) => {
  useGSAP(() => {
    gsap.from('.fade-in-hero', {
      scrollTrigger: {
        trigger: '.fade-in-hero',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
    })
  }, [])

  return (
    <section className='size-full bg-Blue-Primary px-[6rem] py-10 xsm:px-[1rem] xsm:py-8'>
      <div className='mx-auto flex flex-col items-center pt-14 text-center text-white xsm:pt-0'>
        {/* Heading */}
        <h1 className='fade-in-hero mb-4 text-center text-[4rem] font-bold leading-[122%] xsm:text-[1.5rem]'>
          {data?.banner}
        </h1>
        <p className='fade-in-hero mb-14 max-w-[41.875rem] text-center text-base leading-[100%] xsm:mb-7 xsm:max-w-[17.938rem] xsm:text-sm'>
          {data?.description}
        </p>

        {/* CTA */}
        <Link
          href={data?.link?.url || '#'}
          target={data?.link?.target || '_self'}
          className='fade-in-hero w-full max-w-sm rounded-[1.5rem] bg-white px-[1.813rem] py-4 text-center text-[1.2rem] font-medium leading-[1.56rem] tracking-[-0.036rem] text-Blue-Primary xsm:max-w-64 xsm:px-3 xsm:py-[0.375rem] xsm:text-sm'
        >
          <span className='flex items-center justify-center gap-x-3'>
            {data?.link?.title}
            <ICArrowRight className='stroke-Blue-Primary xsm:size-3' />
          </span>
        </Link>
      </div>

      <div className='fade-in-hero mx-auto mt-[1.813rem] pb-[3.656rem] xsm:mt-[1.75rem] xsm:pb-0'>
        <div className='grid items-center gap-8 border-t border-white sm:grid-cols-2'>
          {/* Intro */}
          <div className='fade-in-hero mt-[1.406rem] text-white xsm:mt-[0.563rem]'>
            <p className='text-[2.5rem] font-bold leading-[100%] xsm:text-[1.5rem]'>
              Xin chào
            </p>
            <p className='text-[3rem] font-bold leading-[100%] xsm:text-[2rem]'>
              Chúng tôi là Amamy
            </p>
          </div>

          {/* Stats */}
          <div className='mt-[1.406rem] grid grid-cols-3 gap-[4rem] xsm:mt-0 xsm:gap-[1.25rem]'>
            {Array.isArray(data?.hightlights) &&
              data?.hightlights.map((item, index) => (
                <div
                  key={index}
                  className='fade-in-hero text-start text-white'
                >
                  <p className='text-[3.75rem] font-bold leading-[1.2] tracking-[-0.15rem] xsm:text-[1.5rem] xsm:leading-[1.315rem]'>
                    {item?.title}
                  </p>
                  <p className='text-[1.125rem] font-semibold uppercase leading-[1.6] xsm:mb-[0.5rem] xsm:text-[0.6875rem] xsm:leading-[0.8125rem] xsm:tracking-[-0.01375rem]'>
                    {item?.subtitle}
                  </p>

                  {/* Desktop Desc */}
                  <p className='text-[0.875rem] font-medium leading-[1.3] tracking-[-0.02625rem] xsm:hidden xsm:text-[0.75rem] xsm:font-normal xsm:leading-[1.5] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9]'>
                    {item?.content}
                  </p>

                  {/* Mobile Desc */}
                  <p className='text-[0.875rem] font-medium leading-[1.3] tracking-[-0.03em] sm:hidden xsm:text-[0.75rem] xsm:font-normal xsm:leading-[1.5] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9]'>
                    {item?.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
