'use client'

import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {Navigation} from 'swiper/modules'
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

const Reason = () => {
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
      <div className='fade-in-reason flex w-full flex-col items-center justify-center py-16 xsm:py-8'>
        <p className='text-[2rem] font-semibold leading-[1.75rem] text-Blue-Primary xsm:text-base'>
          Lý do nên chọn gửi hàng tại Amamy?
        </p>
        <h3 className='mt-5 max-w-6xl text-center text-[2.5rem] font-bold xsm:w-full xsm:text-[1.25rem]'>
          Amamy dịch vụ Logistic với 4 năm kinh nghiệm và hơn 18.000 khách hàng
          Việt Nam tại nước ngoài
        </h3>
      </div>

      {/* Image Containter Desktop */}
      <div className='flex w-full items-stretch gap-x-24 xsm:hidden'>
        {reasons.map((item, index) => (
          <div
            key={index}
            className='fade-in-reason'
          >
            <ImageContainer
              img={item.img}
              label={item.label}
              description={item.description}
            />
          </div>
        ))}
      </div>

      {/* Image Containter Mobile */}
      <div className='w-full sm:hidden'>
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
