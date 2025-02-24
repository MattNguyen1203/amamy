'use client'
import React from 'react'
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import {Pagination} from 'swiper/modules'
import ImageV2 from '@/components/image/ImageV2'

export default function SlideDocs() {
  return (
    <>
      <Swiper
        spaceBetween={24}
        slidesPerView={'auto'}
        loop={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className='!') => {
            return `<span class="${className} ${index > 3 && '!hidden'} custom-dot"></span>`; 
        },
        }}
        modules={[Pagination]}
        className='h-[24.375rem] w-full'
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide
            key={item}
            className='bg-white rounded-[20px] !w-[26.8125rem] cursor-pointer'
          >
            <ItemContent />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex mt-[2.5rem] w-full items-center justify-center'>
          <div className='custom-pagination flex gap-[0.38rem] mx-auto !w-fit'></div>
      </div>
    </>
  )
}

const ItemContent = () => {
  return (
    <div className='w-[26.8125rem]'>
      <ImageV2
        src={'/homepage/replace/slideimg.png'}
        alt=''
        width={1000}
        height={1000}
        className='h-[15.625rem] rounded-t-[20px]'
      />
      <div className='flex p-6 flex-col items-start gap-3 self-stretch'>
        <p className='text-[1rem] not-italic font-semibold leading-[150%]'>
          Trong hơn 2 năm Amamy đã gửi hơn 7.500 bưu kiện từ Việt Nam cho du học
          sinh
        </p>
        <div className='flex justify-between w-full items-center'>
          <div className='flex items-center'>
            <CalenderIcon />
            <p className='text-[0.75rem] not-italic font-medium leading-[140%]'>
              11/12/2024
            </p>
          </div>
          <ArrowIcon />
        </div>
      </div>
    </div>
  )
}

const CalenderIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M16.2495 3.125H3.74951C3.40433 3.125 3.12451 3.40482 3.12451 3.75V16.25C3.12451 16.5952 3.40433 16.875 3.74951 16.875H16.2495C16.5947 16.875 16.8745 16.5952 16.8745 16.25V3.75C16.8745 3.40482 16.5947 3.125 16.2495 3.125Z'
        stroke='#7F8286'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.7505 1.875V4.375'
        stroke='#7F8286'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.25049 1.875V4.375'
        stroke='#7F8286'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3.12451 6.875H16.8745'
        stroke='#7F8286'
        stroke-width='1.5'
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
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14.0001 27.3332C21.3639 27.3332 27.3334 21.3636 27.3334 13.9998C27.3334 6.63604 21.3639 0.666504 14.0001 0.666504C6.63629 0.666504 0.666748 6.63604 0.666748 13.9998C0.666748 21.3636 6.63629 27.3332 14.0001 27.3332ZM16.0405 9.29273L20.0405 13.2927C20.431 13.6833 20.431 14.3164 20.0405 14.7069L16.0405 18.7069C15.65 19.0975 15.0168 19.0975 14.6263 18.7069C14.2358 18.3164 14.2358 17.6833 14.6263 17.2927L16.9192 14.9998H8.66674C8.11446 14.9998 7.66674 14.5521 7.66674 13.9998C7.66674 13.4476 8.11446 12.9998 8.66674 12.9998H16.9192L14.6263 10.7069C14.2358 10.3164 14.2358 9.68325 14.6263 9.29273C15.0168 8.90221 15.65 8.90221 16.0405 9.29273Z'
        fill='#38B6FF'
      />
    </svg>
  )
}
