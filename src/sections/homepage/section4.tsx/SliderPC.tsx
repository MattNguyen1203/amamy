'use client'
import BtnBlue from '@/components/button/BtnBlue'
import {cn} from '@/lib/utils'
import ICArrow from '@/sections/blog/detail/ICArrow'
import {ListNewsObject, NewsObject} from '@/utils/type'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import {EffectFade, Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
export default function SliderPC({
  setActiveSlider,
  withDHS,
  variant = 'default',
}: {
  setActiveSlider: React.Dispatch<React.SetStateAction<number>>
  withDHS: NewsObject
  variant?: 'default' | 'about-us'
}) {
  return (
    <Swiper
      onSlideChange={(swiper) => {
        setActiveSlider(swiper.realIndex)
      }}
      slidesPerView={'auto'}
      effect={'fade'}
      loop={true}
      navigation={{
        nextEl: '.swiper-companion-next',
        prevEl: '.swiper-companion-prev',
      }}
      modules={[EffectFade, Navigation]}
      className='mySwiper h-[40.5rem] w-[50.6875rem] flex xsm:w-[calc(100vw-2rem)] xsm:h-[21.25rem] xsm:gap-[1rem]'
    >
      {Array.isArray(withDHS?.list_news_event) &&
        withDHS?.list_news_event?.map((item: ListNewsObject, index) => (
          <SwiperSlide
            key={index}
            className='opacity-0 [&.swiper-slide-active]:opacity-[1] w-[50.6875rem] h-[40.5rem] cursor-pointer xsm:w-[18.75rem]'
          >
            <Image
              src={item?.post?.[0]?.thumbnail}
              alt={item?.post?.[0]?.slug}
              width={1000}
              height={1000}
              className='bg-[#EDF5FA] w-[50.6875rem] h-[40.5rem] object-cover flex-shrink-0 rounded-[0.5rem] sm:rounded-[1.25rem] xsm:w-[18.75rem] xsm:h-[21.25rem] xsm:object-cover'
            />
            <div
              className={cn(
                'xsm:hidden sm:group-hover:h-[25.75rem] transition-all duration-500 h-[8.625rem] overflow-hidden rounded-t-[1.25rem] w-[41.3125rem] p-[2.5rem] absolute bottom-0 right-0 bg-white',
                variant === 'about-us' && 'rounded-br-[1.25rem] bg-[#F1F9FF]',
              )}
            >
              <div
                className='mb-[0.75rem] text-start text-[1.375rem] not-italic font-semibold leading-[150%] xsm:w-[18.75rem] xsm:hidden '
                dangerouslySetInnerHTML={{
                  __html: item?.post?.[0]?.title,
                }}
              ></div>
              <div className='sm:pointer-events-none sm:group-hover:pointer-events-auto sm:group-hover:opacity-[1] transition-all duration-700 overflow-hidden opacity-0'>
                <p
                  dangerouslySetInnerHTML={{__html: item?.post?.[0]?.excerpt}}
                  className='text-pc-sub16 text-[rgba(0,0,0,0.80)] line-clamp-[9]'
                ></p>
                <BtnBlue
                  slug={'/blogs/' + item?.post?.[0]?.slug}
                  className='space-x-[0.75rem] w-max ml-auto mt-[1rem]'
                >
                  <p className='text-pc-sub16m text-white'>Xem chi tiết</p>
                  <ICArrow className='size-[1.5rem] xsm:size-[1.66669rem]' />
                </BtnBlue>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
