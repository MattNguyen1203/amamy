/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useIsMobile from '@/hooks/useIsMobile'
import ICLogo from '@/sections/homepage/section4.tsx/ICLogo'
import SliderPC from '@/sections/homepage/section4.tsx/SliderPC'
import {ListNewsObject, NewsObject} from '@/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
type Props = {
  withDHS: NewsObject
}

const Section4 = ({withDHS}: Props) => {
  const isMobile = useIsMobile()
  const [activeSlider, setActiveSlider] = useState<number>(0)
  return (
    <section
      className='xsm:pt-[1rem] xsm:pb-[2,5rem] xsm:px-0 w-full sm:h-[50rem] sm:flex-shrink-0 flex pl-[6rem] pr-[6rem] pt-[5.5rem] pb-[4rem] sm:justify-between sm:items-center
     sm:rounded-tl-[2.5rem] sm:rounded-br-[0rem] sm:rounded-tr-[2.5rem] sm:rounded-bl-[0rem] sm:[box-shadow:0px_-8px_16px_0px_rgba(6,_0,_94,_0.02)] 
     xsm:flex-col xsm:h-fit xsm:gap-[1rem] xsm:pr-0'
    >
      <div className='max-w-[24.375rem] h-full flex flex-col justify-between'>
        <div className='xsm:px-[1rem] xsm:space-y-[0.5rem] xsm:pb-[1rem]'>
          <h2 className='font-montserrat sm:mb-[2.06rem] text-[2.875rem] tracking-[-0.115rem] font-bold leading-[120%] xsm:text-[1.25rem] text-black xsm:text-mb-h1'>
            {withDHS?.title}
          </h2>
          <p className='xsm:text-mb-12 font-montserrat text-[rgba(41,_47,_54,_0.60)] text-[1rem] not-italic font-medium leading-[150%] xsm:text-[0.75rem] tracking-[-0.03rem]'>
            {withDHS?.subtitle}
          </p>
        </div>
        {Array.isArray(withDHS?.list_news_event) && !isMobile && (
          <div className='flex mt-[1.91rem] xsm:hidden'>
            <div className='hover:bg-[#38B6FF] group transition-all duration-500 swiper-companion-prev flex p-4 items-center gap-2.5 mr-[0.5rem] rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'>
              <LeftIcon className='group-hover:filter group-hover:brightness-0 group-hover:invert-[100]' />
            </div>
            <div className='hover:bg-[#38B6FF] group transition-all duration-500 swiper-companion-next flex p-4 items-center gap-2.5 rotate-180 rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'>
              <LeftIcon className='group-hover:filter group-hover:brightness-0 group-hover:invert-[100]' />
            </div>
          </div>
        )}
      </div>
      {Array.isArray(withDHS?.list_news_event) && (
        <div className='group sm:relative rounded-[0.5rem]'>
          {!isMobile && (
            <div className='xsm:hidden p-[1.75rem] pr-0 sm:group-hover:top-[65%] transition-all duration-500 absolute pointer-events-none top-[50%] translate-y-[-50%] left-0 translate-x-[-50%] z-10 bg-[#38B6FF] rounded-[1.25rem] w-[18.75rem] h-[23.25rem]'>
              <div className='absolute top-0 left-0 size-[9.375rem] z-[11] bg-[#60C5FF] rounded-br-[100%] rounded-tl-[1.25rem]'></div>
              <div className='flex flex-col justify-between h-full relative z-[12]'>
                <div className='flex items-center space-x-[1.12rem]'>
                  <ICLogo className='w-[5.29188rem] h-[4.5rem] ' />
                  <div className='flex flex-col'>
                    <p className='text-pc-heading20b !font-semibold text-[#F1F9FF]'>
                      {withDHS?.tag_title_pc}
                    </p>
                    <p className='text-[#F1F9FF] text-heading-h3 mt-[0.19rem]'>
                      {withDHS?.list_news_event?.[activeSlider]?.year}
                    </p>
                  </div>
                </div>
                <p className='text-[2rem] font-bold leading-[1.3] tracking-[-0.06rem] text-white'>
                  {withDHS?.list_news_event?.[activeSlider]?.name_event}
                </p>
              </div>
            </div>
          )}
          <div>
            {isMobile ? (
              <>
                <Swiper
                  slidesPerView={'auto'}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.swiper-pagination-custom-home',
                  }}
                  modules={[Pagination]}
                  className='!px-[1rem] mySwiper-mb w-full [&_.swiper-wrapper]:space-x-[0.75rem] h-[40.5rem] flex xsm:h-[22.75rem] xsm:gap-[1rem]'
                >
                  {Array.isArray(withDHS?.list_news_event) &&
                    withDHS?.list_news_event?.map(
                      (item: ListNewsObject, index) => (
                        <SwiperSlide
                          key={index}
                          className='xsm:!w-[18.75rem] xsm:bg-white xsm:rounded-[1.25rem] xsm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] xsm:!h-[21.25rem] w-[50.6875rem] h-[40.5rem] cursor-pointer'
                        >
                          <Link
                            href={'/'}
                            className='block'
                          >
                            <div className='p-[0.75rem] space-y-[0.25rem]'>
                              <p className='text-center w-full text-[0.5625rem] font-semibold tracking-[-0.0225rem] uppercase'>
                                {withDHS?.tag_title_mb}
                              </p>
                              <p className='text-black font-montserrat text-pc-sub14b text-center'>
                                {item?.name_event}
                              </p>
                            </div>
                            <div className='relative'>
                              <p className='z-[11] absolute top-[1rem] left-[1rem] w-full line-clamp-3 text-[1.125rem] font-semibold leading-[1.3] tracking-[-0.045rem] text-white'>
                                {item?.post?.[0]?.title}
                              </p>
                              <div className='absolute xsm:rounded-[1.25rem] inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.00)_100%)]'></div>
                              <Image
                                src={item?.post?.[0]?.thumbnail}
                                alt={item?.post?.[0]?.slug}
                                width={1000}
                                height={1000}
                                className='xsm:rounded-[1.25rem] w-[50.6875rem] h-[40.5rem] object-contain flex-shrink-0 rounded-[0.5rem] xsm:w-[18.75rem] xsm:h-[17.6875rem] xsm:object-cover bg-[linear-gradient(180deg,rgba(0,63,136,0.25)_0%,rgba(0,16,34,0.50)_63.29%)]'
                              />
                            </div>
                          </Link>
                        </SwiperSlide>
                      ),
                    )}
                </Swiper>
                <div className='swiper-pagination-custom-home xsm:relative xsm:!w-[11.125rem] xsm:!left-[50%] xsm:!-translate-x-[50%] flex-center space-x-[0.375rem] [&_.swiper-pagination-bullet]:w-[2.5rem] [&_.swiper-pagination-bullet]:h-[0.25rem] [&_.swiper-pagination-bullet]:rounded-[0.625rem] [&_.swiper-pagination-bullet]:opacity-[1] [&_.swiper-pagination-bullet]:bg-[rgba(31,100,140,0.24)] [&_.swiper-pagination-bullet-active]:!bg-[#1F648C]'></div>
              </>
            ) : (
              <SliderPC
                setActiveSlider={setActiveSlider}
                withDHS={withDHS}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Section4

const LeftIcon = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      className={className}
    >
      <path
        d='M14.9997 22.9998L8 16.0001M8 16.0001L14.9997 9.00041M8 16.0001L24 16.0001'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
