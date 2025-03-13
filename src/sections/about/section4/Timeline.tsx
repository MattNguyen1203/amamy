/* eslint-disable @typescript-eslint/no-explicit-any */
import {AboutWPResponse} from '@/utils/type'
import Image from 'next/image'
import {useRef, useState} from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import EventCard from './EventCard'

interface Prop {
  data: AboutWPResponse
}
const Timeline = ({data}: Prop) => {
  const swiperRef = useRef<any>(null)
  const ourJourneyList = data?.acf.our_journey.our_journey_list
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <section
      className='w-[100rem] xsm:w-full h-[50rem] xsm:h-auto flex-shrink-0 flex pl-[6rem] pr-[6rem] pt-[5.5rem] pb-[4rem] justify-between items-center
     rounded-tl-[2.5rem] rounded-br-[0rem] rounded-tr-[2.5rem] rounded-bl-[0rem] [box-shadow:0px_-8px_16px_0px_rgba(6,_0,_94,_0.02)] bg-[#EDF5FA]
     xsm:flex-col xsm:px-[1rem] xsm:h-fit xsm:gap-[1rem] xsm:p-[1rem]  xsm:bg-[#f7f7f7] xsm:rounded-none xsm:border-none xsm:shadow-none'
    >
      <div className='max-w-[24.375rem] xsm:max-w-full'>
        <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] xsm:text-[1.25rem]'>
          {data?.acf.our_journey.title}
        </h2>
        <p className='text-[rgba(41,_47,_54,_0.60)] text-[1rem] not-italic font-medium leading-[150%] xsm:text-[0.75rem]'>
          {data?.acf.our_journey.description}
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

      <div className='relative rounded-[0.5rem] xsm:w-full'>
        <EventCard
          title={ourJourneyList[activeSlide]?.title || ''}
          year={ourJourneyList[activeSlide]?.year || ''}
          className='rounded-[1.25rem] w-[18.75rem]  absolute z-[100] top-1/2 -translate-y-[46%] -left-1/2 translate-x-[85%] h-[23.25rem] scale-110 flex-shrink-0 xsm:hidden'
        />

        <div className='xsm:flex block xsm:justify-between xsm:w-full xsm:flex-col'>
          <Swiper
            spaceBetween={12}
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
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.realIndex)
            }}
            className=' h-[40.5rem] w-[50.6875rem] flex xsm:w-full xsm:h-[21.25rem] xsm:gap-[1rem]'
          >
            {ourJourneyList.map((item, index) => (
              <SwiperSlide
                key={index}
                className='w-[50.6875rem] h-[40.5rem] cursor-pointer xsm:!w-[18.75rem]  xsm:h-[21.25rem]'
              >
                <div className='bg-white rounded-[1.25rem] '>
                  <div className='text-center py-[0.75rem] xsm:block hidden'>
                    <div className='font-montserrat font-semibold text-[0.5625rem] leading-[1] tracking-[-0.0225rem] uppercase'>
                      cột mốc amamy năm {item.year}
                    </div>
                    <div className='font-montserrat font-bold text-[0.875rem] leading-[1.3] tracking-[-0.02625rem]'>
                      {item.title}
                    </div>
                  </div>
                  <div className='relative'>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={1000}
                      height={1000}
                      className='rounded-[1.25rem] w-[50.6875rem] h-[40.5rem] object-contain flex-shrink-0  xsm:w-[1005] xsm:h-[17.625rem] xsm:object-cover'
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0, 63, 136, 0.25) 0%, rgba(0, 16, 34, 0.50) 63.29%)',
                      }}
                    />
                    <div className='rounded-tl-[1.25rem] flex w-[42.3125rem] h-[8.625rem] p-10 flex-col items-end xsm:items-center xsm:top-0 xsm:left-0 gap-4 flex-shrink-0 absolute bottom-0 right-0 bg-[#F1F9FF] text-[1.375rem] not-italic font-semibold leading-[150%] xsm:w-[100%] xsm:p-[1rem] xsm:text-white xsm:bg-transparent'>
                      {item.description}
                    </div>
                    <div className='xsm:block hidden absolute p-[0.5rem] rounded-[50%] bg-[#38B6FF] bottom-[1rem] right-[1rem]'>
                      <ArrowIcon />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='mt-[1rem] xsm:flex hidden justify-center gap-2 xsm:mt-[1rem] xsm:mb-[1.25rem]'>
            {ourJourneyList.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.swiper.slideTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-[0.25rem] w-[1rem] rounded-full transition-all ${
                  activeSlide === index ? 'bg-[#1F648C]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
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

const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M18.7058 12.7071C19.0963 12.3166 19.0963 11.6834 18.7058 11.2929L14.7058 7.29289C14.3152 6.90237 13.6821 6.90237 13.2916 7.29289C12.901 7.68342 12.901 8.31658 13.2916 8.70711L15.5844 11L7.33199 11C6.77971 11 6.33199 11.4477 6.33199 12C6.33199 12.5523 6.77971 13 7.33199 13L15.5844 13L13.2916 15.2929C12.901 15.6834 12.901 16.3166 13.2916 16.7071C13.6821 17.0976 14.3152 17.0976 14.7058 16.7071L18.7058 12.7071Z'
        fill='white'
      />
    </svg>
  )
}
