'use client'
import {useRef} from 'react'
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import ImageV2 from '@/components/image/ImageV2'
import {Post} from '@/utils/type'
import {Pagination} from 'swiper/modules'

interface Prop {
  posts: Post[]
}
interface PropItem {
  post: Post
}
export default function SlideDocs({posts}: Prop) {
  const swiperRef = useRef<any>(null)
  return (
    <>
      <Swiper
        spaceBetween={24}
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
        className='h-[24.375rem] w-full xsm:h-auto'
      >
        {posts.map((item, index) => (
          <SwiperSlide
            key={index}
            className='bg-white rounded-[1.25rem] !w-[26.8125rem] cursor-pointer xsm:!w-[16.875rem]'
          >
            <ItemContent post={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-[1rem] xsm:flex hidden justify-center gap-2 xsm:mt-[1rem] xsm:mb-[1.25rem]'>
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.swiper.slideTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-[0.25rem] w-[1rem] rounded-full transition-all ${
              0 === index ? 'bg-[#1F648C]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </>
  )
}

const ItemContent = ({post}: PropItem) => {
  return (
    <div className='w-[26.8125rem] xsm:w-[16.875rem]'>
      <ImageV2
        src={post.image.url}
        alt={post.image.alt}
        width={1000}
        height={1000}
        className='h-[15.625rem] rounded-t-[1.25rem] xsm:h-[10.1875rem]'
      />
      <div className='flex p-6 flex-col items-start gap-3 self-stretch'>
        <p className='text-[1rem] not-italic font-semibold leading-[150%]'>
          {post.title}
        </p>
        <div className='flex justify-between w-full items-center'>
          <div className='flex items-center'>
            <CalenderIcon />
            <p className='text-[0.75rem] not-italic font-medium leading-[140%]'>
              {post.date}
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
