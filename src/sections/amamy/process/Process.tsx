'use client'

import React from 'react'
import ProcessContainer from './ProcessContainer'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

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

const Process = () => {
  return (
    <section className='mt-28 size-full px-[6rem] xsm:mt-8 xsm:px-[1rem]'>
      <div className='rounded-[3.125rem] bg-[#FFFFFFBA] py-14 shadow-[0px_2px_6.4px_-1px_#13102208] backdrop-blur-[12px]'>
        {/* Heading */}
        <div className='flex w-full flex-col items-center justify-center'>
          <p className='text-[1.25rem] font-semibold leading-[1.75rem] text-Blue-Primary xsm:text-sm'>
            Dịch vụ của chúng tôi
          </p>
          <h3 className='mt-2 text-center text-[3.125rem] font-bold leading-[3.75rem] xsm:text-[1.5rem] xsm:leading-[1.875.rem]'>
            Quy Trình Gửi Hàng
          </h3>
        </div>

        {/* Process Container Desktop */}
        <div className='my-16 flex flex-col gap-y-16 xsm:hidden'>
          <div className='flex justify-center gap-x-8'>
            {process.slice(0, 3).map((item, index) => (
              <ProcessContainer
                key={index}
                {...item}
              />
            ))}
          </div>
          <div className='flex justify-center gap-x-8'>
            {process.slice(3).map((item, index) => (
              <ProcessContainer
                key={index}
                {...item}
              />
            ))}
          </div>
        </div>

        {/* Process Container Mobile */}
        <div className='mt-7 w-full sm:hidden'>
          <Swiper
            grabCursor
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation]}
            className='size-full'
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
