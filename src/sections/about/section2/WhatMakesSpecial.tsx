import Image from 'next/image'

export default function WhatMakesSpecial() {
  return (
    <section className='w-full mx-auto  p-[6rem] bg-[#EDF5FA]'>
      <div className='rounded-[1.25rem] max-w-[88rem] overflow-hidden '>
        <div className='grid sm:grid-cols-2 items-center bg-[#38b6ff]'>
          {/* Left content */}
          <div className='px-[2.0625rem] py-[2.25rem]'>
            <h2 className='font-montserrat font-bold text-[2.875rem] leading-[3.45rem] tracking-[-0.04em] text-white mb-[7.375rem]'>
              Điều gì khiến Amamy
              <br />
              trở nên Đặc biệt?
            </h2>

            <div className='space-y-6 text-white'>
              <p className='font-montserrat font-medium text-[1rem] leading-[1.5rem] tracking-[-0.01em]'>
                Chúng tôi luôn tiên phong trong việc áp dụng công nghệ hiện đại
                và tối ưu hóa quy trình làm việc, nhằm mang đến trải nghiệm
                tuyệt vời nhất cho khách hàng của mình.
              </p>

              <p className='font-montserrat font-medium text-[1rem] leading-[1.5rem] tracking-[-0.01em]'>
                Chúng tôi cam kết cung cấp dịch vụ với mức độ hài lòng cao nhất,
                thông qua việc cung cấp các dịch vụ chất lượng vượt trội và
                chính sách hỗ trợ khách hàng tốt nhất.
              </p>
            </div>
          </div>

          {/* Right image */}
          <div className='relative rounded-[1.25rem] h-full w-[49.625rem] min-h-[28.875rem] md:min-h-[28.875rem]'>
            <Image
              src='/about/what-make.webp'
              alt='Amamy delivery staff loading packages'
              fill
              className='object-cover'
              sizes='(max-width: 49.625rem) 100vw, 28.875rem'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
