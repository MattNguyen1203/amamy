'use client'
import BtnBlue from '@/components/button/BtnBlue'
import ICArrow from '@/sections/blog/detail/ICArrow'
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import ItemBlog from '@/sections/blog/ItemBlog'
import {IItemPostBlog} from '@/sections/blog/blogs.interface'
import 'swiper/css'
import 'swiper/css/pagination'
import {Navigation, Pagination} from 'swiper/modules'
export default function RelatedBlogs({data}: {data: IItemPostBlog[]}) {
  return (
    <section className='py-[6rem]'>
      <div className='sm:px-[6rem] flex items-center w-full justify-between mb-[2.5rem]'>
        <h3 className='text-black text-pc-h1'>Các bài viết liên quan</h3>
        <BtnBlue
          slug='/'
          className='space-x-[0.5rem]'
        >
          <p className='text-pc-sub16m text-white'>Tất cả bài viết</p>
          <ICArrow className='size-[1.5rem]' />
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
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          modules={[Pagination, Navigation]}
          className='[&_.swiper-wrapper]:space-x-[1.5rem] sm:!px-[6rem]'
        >
          {Array.isArray(data) &&
            data?.length > 0 &&
            data?.map((item: IItemPostBlog, index: number) => (
              <SwiperSlide
                className='!w-[27.5rem] !h-[calc(24.375rem+2.5rem)]'
                key={index}
              >
                <ItemBlog
                  key={index}
                  item={item}
                  className='shadow-[-8px_4px_40px_0px_rgba(0,35,93,0.08)] bg-white'
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='swiper-button-custom-prev cursor-pointer absolute z-10 left-[6rem] translate-x-[-50%] top-[calc(50%+1.25rem)] translate-y-[-50%] p-[1rem] flex-center rounded-[2.5rem] bg-[rgba(255,255,255,1)] shadow-2xl'>
          <ICArrow className='size-[2rem] filter brightness-[100] invert-[100] rotate-[180deg]' />
        </div>
        <div className='swiper-button-custom-next cursor-pointer absolute z-10 right-[6rem] translate-x-[50%] top-[calc(50%+1.25rem)] translate-y-[-50%] p-[1rem] flex-center rounded-[2.5rem] bg-[rgba(255,255,255,1)] shadow-2xl'>
          <ICArrow className='size-[2rem] filter brightness-[100] invert-[100]' />
        </div>
      </div>
      <div className='swiper-pagination-custom flex-center space-x-[0.375rem] [&_.swiper-pagination-bullet]:w-[2.5rem] [&_.swiper-pagination-bullet]:h-[0.25rem] [&_.swiper-pagination-bullet]:rounded-[0.625rem] [&_.swiper-pagination-bullet]:opacity-[1] [&_.swiper-pagination-bullet]:bg-[rgba(31,100,140,0.24)] [&_.swiper-pagination-bullet-active]:!bg-[#1F648C]'></div>
    </section>
  )
}
