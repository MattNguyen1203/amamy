'use client'

import {IImage} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import ImageContainer from './ImageContainer'

const reasons = [
  {
    img: '/amamy/reason/d-reason.webp',
    label: 'Carton 5 lớp',
    description: 'Hàng hóa được đóng gói chuẩn quốc tế',
  },
  {
    img: '/amamy/reason/d-reason1.webp',
    label: 'Chuyên môn cao',
    description:
      'Nhân viên am hiểu về dịch vụ, cùng với hệ thống quản lý giúp giao hàng quốc tế đúng dự kiến, chính xác',
  },
  {
    img: '/amamy/reason/d-reason2.webp',
    label: 'Bảo hiểm hàng hóa',
    description:
      'Nhân viên am hiểu về dịch vụ, cùng với hệ thống quản lý giúp giao hàng quốc tế đúng dự kiến, chính xác',
  },
]
export interface IReason {
  title: string
  description: string
  services: IService[]
}
export interface IService {
  thumbnail: IImage
  title: string
  content: string
}
const Reason = ({data}: {data: IReason}) => {
  useGSAP(() => {
    gsap.from('.fade-in-reason', {
      scrollTrigger: {
        trigger: '.fade-in-reason',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    })
  }, [])

  return (
    <section className='size-full px-[6rem] xsm:px-[1rem]'>
      {/* Heading */}
      <div className='fade-in-reason flex w-full flex-col items-center justify-center py-16 xsm:py-8 pb-10'>
        <p className='text-[2rem] font-semibold leading-[1.66667rem] text-Blue-Primary xsm:text-base'>
          {data?.title}
        </p>
        <h3 className='mt-3 max-w-[70rem] text-center text-[2.08333rem] font-bold xsm:w-full xsm:text-[1.125rem]'>
          {data?.description}
        </h3>
      </div>

      {/* Image Containter Desktop */}
      <div className='flex w-full items-stretch gap-x-24 xsm:hidden'>
        {data?.services.map((item, index) => (
          <div
            key={index}
            className='fade-in-reason'
          >
            <ImageContainer
              img={item.thumbnail.url}
              label={item.title}
              description={item.content}
            />
          </div>
        ))}
      </div>

      {/* Image Containter Mobile */}
      <div className='w-full sm:hidden xsm:translate-x-[-0.4rem]'>
        <Swiper
          grabCursor
          spaceBetween={12}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          slidesPerView={1.3}
          modules={[Navigation]}
          className='fade-in-reason size-full'
        >
          {reasons.map((item, index) => (
            <SwiperSlide
              key={index}
              className='fade-in'
            >
              <ImageContainer
                img={item.img}
                label={item.label}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Reason
