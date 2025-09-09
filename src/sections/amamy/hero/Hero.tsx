import React from 'react'
import ICArrowRight from '@/components/icon/ICArrowRight'

const stats = [
  {
    number: '04+',
    label: 'NĂM HOẠT ĐỘNG',
    description: 'Thành lập năm 2021',
  },
  {
    number: '3+',
    label: 'ĐỐI TÁC',
    description: 'Các quốc gia Đức, Mỹ ,Nhật',
  },
  {
    number: '18K+',
    label: 'KHÁCH HÀNG',
    description: 'Đã tin tưởng sử dụng dịch vụ',
  },
]

const Hero = () => {
  return (
    <section className='w-full bg-Blue-Primary py-12 xsm:py-8'>
      <div className='mx-auto flex max-w-5xl flex-col items-center px-4 pt-12 text-center text-white xsm:pt-0'>
        {/* Heading */}
        <h1 className='mb-4 text-[4rem] font-bold leading-[1.2] xsm:text-[1.5rem]'>
          Bạn có ý định gửi hàng ?
        </h1>
        <p className='mb-8 max-w-2xl text-pc-sub16 xsm:text-[0.875rem]'>
          Gửi hàng từ Việt Nam sang Pháp đa dạng mặt hàng, giao nhanh 12–14 ngày
          tận tay. Nhận sữa, thực phẩm, quần áo, bánh kẹo, miễn phí đóng gói và
          hút chân không.
        </p>

        {/* CTA */}
        <button className='w-full max-w-sm rounded-[1.5rem] bg-white px-6 py-3 text-center text-[1.2rem] font-medium leading-[1.56rem] tracking-[-0.036rem] text-Blue-Primary xsm:max-w-64 xsm:px-3 xsm:py-[0.375rem] xsm:text-sm'>
          <span className='flex items-center justify-center gap-x-3'>
            Dự tính giá gửi hàng qua Pháp
            <ICArrowRight className='xsm:size-3' />
          </span>
        </button>
      </div>

      <div className='mx-auto mt-10 px-[6rem] text-white xsm:px-4'>
        <div className='flex flex-row items-start justify-between gap-10 border-t border-white py-6 xsm:flex-col'>
          {/* Intro */}
          <div className='text-left font-bold'>
            <p className='text-4xl xsm:text-2xl'>Xin chào</p>
            <p className='text-5xl xsm:text-3xl'>Chúng tôi là Amamy</p>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-10 xsm:gap-5'>
            {stats.map((item, index) => (
              <div
                key={index}
                className='text-start'
              >
                <p className='text-[3rem] font-bold xsm:text-[1.5rem]'>
                  {item.number}
                </p>
                <p className='font-bold xsm:text-[0.813rem]'>{item.label}</p>
                <p className='max-w-[9rem] text-sm'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
