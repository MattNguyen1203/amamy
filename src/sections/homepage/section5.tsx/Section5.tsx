'use client'
import FAQItem from '@/sections/homepage/section5.tsx/FAQItem'
import {IFaq, IFaqs} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

type Props = {
  faqs: IFaqs
}

const Section5 = ({faqs}: Props) => {
  useGSAP(() => {
    gsap.from('.fade-in-faq', {
      scrollTrigger: {
        trigger: '.faq-wrap',
        start: 'top center',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      className='xsm:pb-[2rem] faq-wrap flex relative flex-row w-full p-24 items-start justify-between overflow-hidden gap-1.5 self-stretch 
    rounded-tl-[3rem] rounded-br-[0rem] rounded-tr-[3rem] rounded-bl-[0rem] bg-white xsm:flex-col xsm:py-[1rem] xsm:px-0 xsm:rounded-t-[1.25rem]'
    >
      <h2 className='text-[2.875rem] xsm:px-[1rem] not-italic font-bold leading-[120%] max-w-[28.625rem] xsm:text-[1.375rem] xsm:mb-[1rem] xsm:mt-[1.5rem]'>
        {faqs?.title}
      </h2>
      <Image
        src={'/homepage/icon/section-4-background.png'}
        alt=''
        width={1000}
        height={1000}
        className='opacity-[0.16] w-[66.25794rem] h-[33.91225rem] 
        rotate-[2.828deg] absolute left-[-6rem] -bottom-[2rem] overflow-hidden xsm:hidden'
      />
      <div className='flex flex-col static'>
        {Array.isArray(faqs?.faqs) &&
          faqs?.faqs?.map((item: IFaq, index: number) => (
            <div
              key={index}
              className='fade-in-faq'
            >
              <FAQItem
                content={item?.question}
                detail={item?.answer}
                index={index}
                length={faqs?.faqs?.length}
              />
            </div>
          ))}
      </div>
    </section>
  )
}

export default Section5
