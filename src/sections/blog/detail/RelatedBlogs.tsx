'use client'
import BtnBlue from '@/components/button/BtnBlue'
import ICArrow from '@/sections/blog/detail/ICArrow'
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import ItemBlog from '@/sections/blog/ItemBlog'
import {IItemPostBlog} from '@/sections/blog/blogs.interface'
import 'swiper/css'
import 'swiper/css/pagination'
import {FreeMode, Navigation, Pagination} from 'swiper/modules'
export default function RelatedBlogs({
  data,
  title,
  className,
}: {
  data: IItemPostBlog[]
  title?: string
  className?: string
}) {
  const isMobile = useIsMobile()
  return (
    <section
      className={cn('fade-section py-[6rem] xsm:py-[2.5rem]', className)}
    >
      <div className='sm:px-[6rem] xsm:px-[1rem] flex items-center w-full justify-between mb-[0.5rem] xsm:mb-[1rem]'>
        <h3 className='fade-item text-black text-pc-h1 xsm:text-mb-h2'>
          {title || 'Các bài viết liên quan'}
        </h3>
        <BtnBlue
          slug='/blogs'
          className='space-x-[0.5rem] xsm:size-[2rem] xsm:p-0'
        >
          {!isMobile && (
            <p className='xsm:hidden text-pc-sub16m text-white'>
              Tất cả bài viết
            </p>
          )}
          <ICArrow className='size-[1.5rem] xsm:size-[1.66669rem]' />
        </BtnBlue>
      </div>
      <div className='relative'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          navigation={{
            nextEl: '.swiper-button-custom-next',
            prevEl: '.swiper-button-custom-prev',
          }}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: isMobile,
            el: '.swiper-pagination-custom',
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className='sm:!pt-[2rem] [&_.swiper-wrapper]:space-x-[1.5rem] xsm:[&_.swiper-wrapper]:space-x-[0.75rem] sm:!px-[6rem] xsm:!px-[1rem]'
        >
          {Array.isArray(data) &&
            data?.length > 0 &&
            data?.map((item: IItemPostBlog, index: number) => (
              <SwiperSlide
                className='!w-[27.5rem] !h-[calc(24.375rem+2.5rem)] xsm:!h-[calc(15.51725rem+1.25rem)] xsm:!w-[16.875rem]'
                key={index}
              >
                <ItemBlog
                  type='hover'
                  key={index}
                  item={item}
                  className='shadow-card-s bg-white xsm:h-[15.51725rem] xsm:w-[16.875rem] xsm:[&_img]:h-[9.375rem] xsm:[&_.warpper-image]:h-[9.375rem]'
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='xsm:hidden swiper-button-custom-prev cursor-pointer absolute z-10 left-[6rem] translate-x-[-50%] top-[calc(50%+1.25rem)] translate-y-[-50%] p-[1rem] flex-center rounded-[2.5rem] bg-[rgba(255,255,255,0.7)] shadow-2xl'>
          <ICArrow className='size-[2rem] filter brightness-[100] invert-[100] rotate-[180deg]' />
        </div>
        <div className='xsm:hidden swiper-button-custom-next cursor-pointer absolute z-10 right-[6rem] translate-x-[50%] top-[calc(50%+1.25rem)] translate-y-[-50%] p-[1rem] flex-center rounded-[2.5rem] bg-[rgba(255,255,255,0.7)] shadow-2xl'>
          <ICArrow className='size-[2rem] filter brightness-[100] invert-[100]' />
        </div>
      </div>
      <div className='swiper-pagination-custom xsm:relative xsm:!w-[11.125rem] xsm:!left-[50%] xsm:!-translate-x-[50%] flex-center space-x-[0.375rem] [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:w-[2.5rem] [&_.swiper-pagination-bullet]:h-[0.25rem] [&_.swiper-pagination-bullet]:rounded-[0.625rem] [&_.swiper-pagination-bullet]:opacity-[1] [&_.swiper-pagination-bullet]:bg-[rgba(31,100,140,0.24)] [&_.swiper-pagination-bullet-active]:!bg-[#1F648C]'></div>
    </section>
  )
}
