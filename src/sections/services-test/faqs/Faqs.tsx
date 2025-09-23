'use client'

import React, {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import ICMessage from '@/components/icon/ICMessage'
import ICPlus from '@/components/icon/ICPlus'
import ICQuestion from '@/components/icon/ICQuestion'

const Faqs = ({faqsData}: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const contentRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLDivElement[]>([])
  const tlRefs = useRef<gsap.core.Timeline[]>([])

  useEffect(() => {
    // Create a GSAP timeline for each FAQ item
    faqsData?.questions?.forEach((_, i) => {
      const tl = gsap.timeline({paused: true})
      tl.fromTo(
        contentRefs.current[i],
        {x: 50, autoAlpha: 0},
        {x: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out'},
        0,
      )
      tl.fromTo(
        iconRefs.current[i],
        {opacity: 0, rotate: 180, scale: 0.8},
        {opacity: 1, rotate: 0, scale: 1, duration: 0.5, ease: 'power2.out'},
        0.05,
      )
      tlRefs.current[i] = tl

      // Ensure hidden initially
      gsap.set([contentRefs.current[i], iconRefs.current[i]], {display: 'none'})
    })
  }, [faqsData])

  useEffect(() => {
    // Handle open/close animations
    faqsData?.questions?.forEach((_, i) => {
      const tl = tlRefs.current[i]
      if (!tl) return

      if (openIndex === i) {
        gsap.set([contentRefs.current[i], iconRefs.current[i]], {
          display: 'flex',
        })
        tl.play()
      } else {
        tl.reverse().then(() => {
          gsap.set([contentRefs.current[i], iconRefs.current[i]], {
            display: 'none',
          })
        })
      }
    })
  }, [openIndex, faqsData])

  return (
    <div className='flex w-[full] flex-col items-start gap-[0.625rem] bg-white px-4 py-10 sm:p-[5rem_6rem]'>
      <div className='flex w-full flex-col items-center gap-[1.5rem] sm:w-[88rem] sm:gap-[2.5rem]'>
        <h2 className='text-center font-montserrat text-[1.25rem] font-bold not-italic leading-[120%] tracking-[-0.105rem] text-[color:var(--greyscaletext-92,rgba(0,0,0,0.92))] sm:text-[2.625rem]'>
          {faqsData?.title}
        </h2>
        <div className='flex w-full flex-col items-start gap-4 sm:w-[62.5rem] sm:gap-6'>
          {faqsData?.questions?.map((item, index) => (
            <div
              key={index}
              className='w-full'
            >
              <div className='mb-2 flex w-full items-center justify-between gap-2'>
                <div className='flex h-[3rem] w-[3rem] items-center gap-2.5 self-stretch rounded-[3.125rem] bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem] sm:p-[0.8125rem]'>
                  <ICQuestion className='h-8 w-8 sm:h-[2.5rem] sm:w-[2.5rem]' />
                </div>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className='flex w-full flex-[1_0_0] items-start justify-between gap-4 rounded-[0_0.75rem_0.75rem_0.75rem] bg-white px-4 py-3 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:gap-6 sm:rounded-[0_1.25rem_1.25rem_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'
                >
                  <span className='flex items-start justify-start text-start font-montserrat text-[0.75rem] font-semibold not-italic leading-[1.05rem] tracking-[-0.05rem] text-[var(--greyscaletext-92,#292F36)] sm:text-xl sm:leading-[1.75rem]'>
                    {item.question}
                  </span>
                  <ICPlus
                    className={`h-6 w-6 transform text-[var(--greyscaletext-80,rgba(0,0,0,0.80))] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : 'rotate-0'
                    }`}
                  />
                </button>
              </div>

              <div className='flex w-full gap-2'>
                <div
                  ref={(el) => {
                    if (el) contentRefs.current[index] = el
                  }}
                  className='flex w-full items-end justify-between gap-2'
                >
                  <div className='flex flex-[1_0_0] flex-col items-start gap-6 rounded-[0.75rem_0.75rem_0_0.75rem] bg-white px-4 py-3 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:rounded-[1.25rem_1.25rem_0_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'>
                    <p
                      dangerouslySetInnerHTML={{__html: item.answer}}
                      className='font-montserrat text-[0.75rem] font-normal not-italic leading-5 tracking-[-0.03rem] text-[var(--greyscaletext-92,#292F36)] sm:text-base sm:leading-6'
                    ></p>
                  </div>
                  <div
                    ref={(el) => {
                      if (el) iconRefs.current[index] = el
                    }}
                    className='flex h-[3rem] w-[3rem] items-center rounded-full bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem]'
                  >
                    <ICMessage className='h-8 w-8 sm:h-10 sm:w-10' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faqs
