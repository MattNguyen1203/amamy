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
    <section className='size-full bg-Blue-Primary px-[5.75rem] py-10 xsm:px-4 xsm:py-8'>
      <div className='mx-auto flex flex-col items-center pt-14 text-center text-white xsm:pt-0'>
        {/* Heading */}
        <h1 className='mb-4 text-[4rem] font-bold leading-[1.2] xsm:text-[1.5rem]'>
          Bạn có ý định gửi hàng ?
        </h1>
        <p className='mb-8 max-w-2xl text-pc-sub16 xsm:mb-5 xsm:max-w-72 xsm:text-[0.875rem]'>
          Gửi hàng từ Việt Nam sang Pháp đa dạng mặt hàng, giao nhanh 12–14 ngày
          tận tay. Nhận sữa, thực phẩm, quần áo, bánh kẹo, miễn phí đóng gói và
          hút chân không.
        </p>

        {/* CTA */}
        <button className='w-full max-w-sm rounded-[1.5rem] bg-white px-6 py-3 text-center text-[1.2rem] font-medium leading-[1.56rem] tracking-[-0.036rem] text-Blue-Primary xsm:max-w-64 xsm:px-3 xsm:py-[0.375rem] xsm:text-sm'>
          <span className='flex items-center justify-center gap-x-3'>
            Dự tính giá gửi hàng qua Pháp
            <ICArrowRight className='stroke-Blue-Primary xsm:size-3' />
          </span>
        </button>
      </div>

      <div className='mx-auto mt-10 xsm:mt-7'>
        <div className='grid items-center gap-8 border-t border-white sm:grid-cols-2'>
          {/* Intro */}
          <div className='mt-3 text-white'>
            <p className='text-[2rem] font-semibold leading-[120%] tracking-tight xsm:text-[1.125rem]'>
              Xin chào
            </p>
            <p className='text-[2.75rem] font-bold leading-[1.3] tracking-[-0.055rem] xsm:text-[1rem] xsm:leading-[1.25rem]'>
              Chúng tôi là Amamy
            </p>
          </div>

          {/* Stats */}
          <div className='mt-3 grid grid-cols-3 gap-[4rem] xsm:mt-0 xsm:gap-[1.25rem]'>
            {stats.map((item, index) => (
              <div
                key={index}
                className='text-start text-white'
              >
                <p className='text-[3.75rem] font-bold leading-[1.2] tracking-[-0.15rem] xsm:text-[1.125rem] xsm:leading-[1.315rem]'>
                  {item.number}
                </p>
                <p className='text-[1.125rem] font-semibold uppercase leading-[1.6] xsm:mb-[0.5rem] xsm:text-[0.6875rem] xsm:leading-[0.8125rem] xsm:tracking-[-0.01375rem]'>
                  {item.label}
                </p>

                {/* Desktop Desc */}
                <p className='text-[0.875rem] font-medium leading-[1.3] tracking-[-0.02625rem] xsm:hidden xsm:text-[0.75rem] xsm:font-normal xsm:leading-[1.5] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9]'>
                  {item.description}
                </p>

                {/* Mobile Desc */}
                <p className='text-[0.875rem] font-medium leading-[1.3] tracking-[-0.03em] sm:hidden xsm:text-[0.75rem] xsm:font-normal xsm:leading-[1.5] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9]'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
