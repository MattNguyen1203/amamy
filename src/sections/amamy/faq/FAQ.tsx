/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ICAngleRight from '@/components/icon/ICAngleRight'
import ContactContainer from './ContactContainer'
import FaqContainer from './FaqContainer'
import ServiceContainer from './ServiceContainer'

const FAQ = ({data, dataServices}: any) => {
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    gsap.from('.fade-in-faq', {
      scrollTrigger: {
        trigger: '.fade-in-faq',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
    })
    gsap.from('.fade-in-service', {
      scrollTrigger: {
        trigger: '.fade-in-service',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
    })
  }, [])

  return (
    <section className='my-12 size-full px-[6rem] xsm:px-[1rem]'>
      <div className='w-full pb-8'>
        {/* Heading */}
        <h3 className='fade-in-faq text-start text-[2.75rem] font-bold leading-[1.3] tracking-[-0.055rem] xsm:text-center xsm:text-[1.5rem] xsm:leading-[1.25rem]'>
          {data?.title}
        </h3>
      </div>

      <div className='grid grid-cols-12 items-stretch gap-8 xsm:my-6'>
        {/* FAQs */}
        <div className='col-span-8 flex h-full flex-col space-y-5 xsm:col-span-12'>
          {Array.isArray(data?.questions) &&
            data?.questions.map((item, index) => (
              <div
                key={index}
                className='fade-in-faq'
              >
                <FaqContainer
                  initOpen={index === 0}
                  question={item?.question}
                  answer={item?.answer}
                />
              </div>
            ))}
        </div>

        {/* Services */}
        <div className='col-span-4 xsm:col-span-12'>
          <div className='sticky top-[5rem]'>
            {/* Desktop */}
            <div className='h-fit rounded-[1.5rem] border border-white bg-[#F4FBFF] px-10 py-8 xsm:hidden'>
              {dataServices?.map((item, index) => (
                <div
                  key={index}
                  className='fade-in-service border-b border-[#E3DBD8] last:border-b-0'
                >
                  <ServiceContainer
                    service={item.title}
                    slug={`/${item.slug ?? ''}`}
                  />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className='h-fit w-full rounded-[1.5rem] border border-white bg-[#F4FBFF] sm:hidden xsm:px-6 xsm:py-2'>
              <button
                className='group flex w-full items-center justify-between py-5 transition-all duration-300 hover:text-Blue-Primary'
                onClick={() => setOpen(!open)}
              >
                <p className='text-start text-[1.25rem] font-bold leading-[100%]'>
                  Dịch vụ gửi hàng
                </p>
                <span>
                  <ICAngleRight
                    className={`fill-black stroke-black transition-all duration-300 ${
                      open ? 'rotate-90' : ''
                    } group-hover:fill-Blue-Primary group-hover:stroke-Blue-Primary`}
                  />
                </span>
              </button>

              {open && (
                <div>
                  {dataServices?.map((item, index) => (
                    <div
                      key={index}
                      className='border-b border-[#E3DBD8] last:border-b-0'
                    >
                      <ServiceContainer
                        service={item.title}
                        slug={`/${item.slug ?? ''}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <div className='mt-5 rounded-[1.5rem] bg-[#F4FBFF]'>
              <ContactContainer number={data?.number} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
