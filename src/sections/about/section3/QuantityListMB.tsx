/* eslint-disable @typescript-eslint/no-explicit-any */
import {IAmamyQualityAbout_ListQuality} from '@/sections/about/about.interface'
import {Swiper, SwiperSlide} from 'swiper/react'
import CoreValueCard from './CoreValueCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import {Pagination} from 'swiper/modules'
interface Prop {
  quantities: IAmamyQualityAbout_ListQuality[]
}

const QuantityListMB = ({quantities}: Prop) => {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        pagination={true}
        modules={[Pagination]}
        className='mySwiper [&_.swiper-wrapper]:space-x-[0.75rem] w-full !px-[1rem] !pb-[3rem] [&_.swiper-pagination-bullet]:w-[1rem] [&_.swiper-pagination-bullet]:h-[0.25rem] [&_.swiper-pagination-bullet]:rounded-[0.625rem] [&_.swiper-pagination-bullet]:bg-[rgba(31,100,140,0.24)] [&_.swiper-pagination-bullet]:opacity-[1] [&_.swiper-pagination-bullet-active]:!bg-[#1F648C] [&_.swiper-pagination]:space-x-[0.25rem]'
      >
        {Array.isArray(quantities) &&
          quantities?.map((quantity, index) => (
            <SwiperSlide
              key={index}
              className='!h-[25.5625rem] !w-[20rem]'
            >
              <div className='rounded-[1.25rem] flex flex-col rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group'>
                <CoreValueCard
                  imageSrc={quantity?.image.url}
                  imageAlt={quantity?.image.alt}
                  label={quantity?.subtitle}
                  title={quantity?.title}
                  description={quantity?.description}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}

export default QuantityListMB
