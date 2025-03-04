import Image from 'next/image'
import React, { useRef } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const Timeline = () => {
  const swiperRef = useRef<any>(null)

  return (
    <section
      className='w-[100rem] h-[50rem] flex-shrink-0 flex pl-[6rem] pr-[6rem] pt-[5.5rem] pb-[4rem] justify-between items-center
     rounded-tl-[2.5rem] rounded-br-[0rem] rounded-tr-[2.5rem] rounded-bl-[0rem] [box-shadow:0px_-8px_16px_0px_rgba(6,_0,_94,_0.02)] bg-[#EDF5FA]
     xsm:flex-col xsm:w-[100vw] xsm:px-[1rem] xsm:h-fit xsm:gap-[1rem] xsm:pr-0'
    >
      <div className='max-w-[24.375rem]'>
        <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] xsm:text-[1.25rem]'>
          Lorem ipsum dolor sit amet
        </h2>
        <p className='text-[rgba(41,_47,_54,_0.60)] text-[1rem] not-italic font-medium leading-[150%] xsm:text-[0.75rem]'>
          Consectetur adipiscing elit sed do eiusmod tempor
        </p>
        <div className='flex mt-[1.91rem] xsm:hidden'>
          <div
            className='flex p-4 items-center gap-2.5 mr-[0.5rem] rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <LeftIcon />
          </div>
          <div
            className='flex p-4 items-center gap-2.5 rotate-180 rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <LeftIcon />
          </div>
        </div>
      </div>

      <div
        className='relative rounded-[0.5rem]'
      >
        <Image
          alt=''
          src={'/homepage/icon/section-4Card.png'}
          width={1000}
          height={1000}
          className='w-[18.75rem] absolute z-[100] top-1/2 -translate-y-[46%] -left-1/2 translate-x-[85%] h-[23.25rem] scale-110 flex-shrink-0 xsm:hidden'
        ></Image>
        <div>
          <Swiper
            ref={swiperRef}
            slidesPerView={'auto'}
            loop={true}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              renderBullet: (index, className = '!') => {
                return `<span class="${className} ${
                  index > 3 && '!hidden'
                } custom-dot"></span>`
              },
            }}
            modules={[Pagination]}
            className=' h-[40.5rem] w-[50.6875rem] flex xsm:w-[calc(100vw-2rem)] xsm:h-[21.25rem] xsm:gap-[1rem]'
          >
            {[1, 2, 3].map((index) => (
              <SwiperSlide
                key={index}
                className='w-[50.6875rem] h-[40.5rem] cursor-pointer xsm:w-[18.75rem]' 
              >
                <Image
                  src='/homepage/icon/section-4Card.png'
                  alt=''
                  width={1000}
                  height={1000}
                  className='w-[50.6875rem] h-[40.5rem] object-contain flex-shrink-0 rounded-[0.5rem] xsm:w-[18.75rem] xsm:h-[21.25rem] xsm:object-cover'
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 63, 136, 0.25) 0%, rgba(0, 16, 34, 0.50) 63.29%)',
                  }}
                />
                <div
                  className='flex w-[42.3125rem] h-[8.625rem] p-10 flex-col items-end gap-4 flex-shrink-0 absolute bottom-0 right-0 bg-[#F1F9FF]
                  text-[1.375rem] not-italic font-semibold leading-[150%] xsm:w-[18.75rem] xsm:hidden '
                >
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Timeline

const LeftIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
    >
      <path
        d='M14.9997 22.9998L8 16.0001M8 16.0001L14.9997 9.00041M8 16.0001L24 16.0001'
        stroke='black'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
