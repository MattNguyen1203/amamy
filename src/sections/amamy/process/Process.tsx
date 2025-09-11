'use client'

import {IImage} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import ProcessContainer from './ProcessContainer'

const process = [
  {
    number: 1,
    icon: '/amamy/process/process.svg',
    label: 'Tiếp nhận yêu cầu & tư vấn (miễn phí)',
    description:
      "Lorem Ipsum is simply dummy text th printing and typese Lorem Ipm  been the industry's standard ",
    shortDesc: 'Lorem Ipsum is simply dummy text th printing and typese',
  },
  {
    number: 2,
    icon: '/amamy/process/process1.svg',
    label: 'Tiếp nhận yêu cầu & tư vấn (miễn phí)',
    description:
      "Lorem Ipsum is simply dummy text th printing and typese Lorem Ipm  been the industry's standard ",
    shortDesc: 'Lorem Ipsum is simply dummy text th printing and typese',
  },
  {
    number: 3,
    icon: '/amamy/process/process2.svg',
    label: 'Tiếp nhận yêu cầu & tư vấn (miễn phí)',
    description:
      "Lorem Ipsum is simply dummy text th printing and typese Lorem Ipm  been the industry's standard ",
    shortDesc: 'Lorem Ipsum is simply dummy text th printing and typese',
  },
  {
    number: 4,
    icon: '/amamy/process/process3.svg',
    label: 'Tiếp nhận yêu cầu & tư vấn (miễn phí)',
    description:
      "Lorem Ipsum is simply dummy text th printing and typese Lorem Ipm  been the industry's standard ",
    shortDesc: 'Lorem Ipsum is simply dummy text th printing and typese',
  },
  {
    number: 5,
    icon: '/amamy/process/process4.svg',
    label: 'Tiếp nhận yêu cầu & tư vấn (miễn phí)',
    description:
      "Lorem Ipsum is simply dummy text th printing and typese Lorem Ipm  been the industry's standard ",
    shortDesc: 'Lorem Ipsum is simply dummy text th printing and typese',
  },
]
export interface IProcess {
  title: string
  subtitle: string
  steps: ISteps[]
}
export interface ISteps {
  icon: IImage
  title: string
  description: string
}

const Process = ({data}: {data: IProcess}) => {
  useGSAP(() => {
    gsap.from('.fade-in-process', {
      scrollTrigger: {
        trigger: '.fade-in-process',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    })
  }, [])

  return (
    <section className='relative mt-28 size-full px-[6rem] xsm:mt-8 xsm:px-[1rem]'>
      {/* Background */}
      <div className='pointer-events-none absolute inset-0'>
        <Image
          src='/amamy/process/ellipse.svg'
          alt=''
          width={348}
          height={348}
          className='absolute -left-60 -top-10 size-[70%] object-fill xsm:hidden'
        />
        <Image
          src='/amamy/process/ellipse1.svg'
          alt=''
          width={348}
          height={348}
          className='absolute -right-52 -top-20 size-[70%] object-fill xsm:-bottom-24 xsm:-right-10 xsm:top-auto xsm:size-[90%]'
        />
      </div>
      <div className='rounded-[3.125rem] bg-[#FFFFFFBA] py-14 shadow-[0px_2px_6.4px_-1px_#13102208] backdrop-blur-[12px] xsm:w-screen'>
        {/* Heading */}
        <div className='fade-in-process flex w-full flex-col items-center justify-center'>
          <p className='text-[1.25rem] font-semibold leading-[1.75rem] text-Blue-Primary xsm:text-sm'>
            {data?.title}
          </p>
          <h3 className='mt-2 text-center text-[3.125rem] font-bold leading-[3.75rem] xsm:text-[1.5rem] xsm:leading-[1.875.rem]'>
            {data?.subtitle}
          </h3>
        </div>

        {/* Process Container Desktop */}
        <div className='my-16 flex flex-col gap-y-16 xsm:hidden'>
          <div className='fade-in-process flex justify-center gap-x-8'>
            {data?.steps.slice(0, 3).map((item, index) => (
              <ProcessContainer
                key={index}
                number={index + 1}
                icon={item.icon.url}
                label={item.title}
                description={item.description}
              />
            ))}
          </div>
          <div className='fade-in-process flex justify-center gap-x-8'>
            {data?.steps.slice(3).map((item, index) => (
              <ProcessContainer
                key={index}
                number={index + 3}
                icon={item.icon.url}
                label={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        {/* Process Container Mobile */}
        <div className='mt-7 w-full sm:hidden'>
          <Swiper
            grabCursor
            spaceBetween={12}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
            slidesPerView={1.3}
            modules={[Navigation]}
            className='fade-in-process size-full'
          >
            {process.map((item, index) => (
              <SwiperSlide key={index}>
                <ProcessContainer {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Process
