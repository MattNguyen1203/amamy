/* eslint-disable @typescript-eslint/no-explicit-any */
import {NewsObject} from '@/utils/type'
import Image from 'next/image'
import {useRef} from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import {EffectFade, Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

type Props = {
  withDHS: NewsObject
}

const Section4 = ({withDHS}: Props) => {
  const swiperRef = useRef<any>(null)

  return (
    <section
      className='w-full h-[50rem] flex-shrink-0 flex pl-[6rem] pr-[6rem] pt-[5.5rem] pb-[4rem] justify-between items-center
     rounded-tl-[2.5rem] rounded-br-[0rem] rounded-tr-[2.5rem] rounded-bl-[0rem] [box-shadow:0px_-8px_16px_0px_rgba(6,_0,_94,_0.02)] 
     xsm:flex-col xsm:px-[1rem] xsm:h-fit xsm:gap-[1rem] xsm:pr-0'
    >
      <div className='max-w-[24.375rem] h-full flex flex-col justify-between'>
        <div className=''>
          <h2 className='font-montserrat sm:mb-[2.06rem] text-[2.875rem] tracking-[-0.115rem] font-bold leading-[120%] xsm:text-[1.25rem] text-black'>
            {withDHS.title}
          </h2>
          <p className='font-montserrat text-[rgba(41,_47,_54,_0.60)] text-[1rem] not-italic font-medium leading-[150%] xsm:text-[0.75rem] tracking-[-0.03rem]'>
            {withDHS.subtitle}
          </p>
        </div>
        <div className='flex mt-[1.91rem] xsm:hidden'>
          <div className='swiper-button-custom-companion-prev flex p-4 items-center gap-2.5 mr-[0.5rem] rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'>
            <LeftIcon />
          </div>
          <div className='swiper-button-custom-companion-next flex p-4 items-center gap-2.5 rotate-180 rounded-[2.5rem] bg-[#E1EAF6] cursor-pointer'>
            <LeftIcon />
          </div>
        </div>
      </div>

      <div className='relative rounded-[0.5rem]'>
        <div className='absolute top-[50%] translate-y-[-50%] left-0 translate-x-[-50%] z-10 bg-[#38B6FF] rounded-[1.25rem] w-[18.75rem] h-[23.25rem]'>
          <div className='absolute size-[9.375rem] z-[11] bg-[#60C5FF] rounded-br-[100%] rounded-tl-[1.25rem]'></div>
        </div>
        <div>
          <Swiper
            ref={swiperRef}
            slidesPerView={'auto'}
            effect={'fade'}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-custom-companion-next',
              prevEl: '.swiper-button-custom-companion-prev',
            }}
            modules={[EffectFade, Navigation]}
            className=' h-[40.5rem] w-[50.6875rem] flex xsm:w-[calc(100vw-2rem)] xsm:h-[21.25rem] xsm:gap-[1rem]'
          >
            {Array.isArray(withDHS?.list_news) &&
              withDHS?.list_news?.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className='w-[50.6875rem] h-[40.5rem] cursor-pointer xsm:w-[18.75rem]'
                >
                  <Image
                    src={item?.thumbnail}
                    alt=''
                    width={1000}
                    height={1000}
                    className='w-[50.6875rem] h-[40.5rem] object-contain flex-shrink-0 rounded-[0.5rem] xsm:w-[18.75rem] xsm:h-[21.25rem] xsm:object-cover bg-[linear-gradient(180deg,rgba(0,63,136,0.25)_0%,rgba(0,16,34,0.50)_63.29%)]'
                  />
                  <div
                    className='rounded-t-[1.25rem] flex w-[42.3125rem] h-[8.625rem] p-10 flex-col items-end gap-4 flex-shrink-0 absolute bottom-0 right-0 bg-[#F1F9FF] text-[1.375rem] not-italic font-semibold leading-[150%] xsm:w-[18.75rem] xsm:hidden '
                    dangerouslySetInnerHTML={{__html: item?.excerpt}}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Section4

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
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
