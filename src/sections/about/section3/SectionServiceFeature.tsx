import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const MainContainer = () => {
  const services = [
    {
      title: 'Áp dụng công nghệ - tối ưu hóa quy trình',
      description:
        'Amamy cam kết áp dụng công nghệ tiên tiến để tối ưu hóa quy trình phục vụ khách hàng, đồng thời hỗ trợ cộng đồng du học sinh Việt Nam ở nước ngoài.',
    },
    {
      title: 'Amamy ngày hôm nay',
      description:
        'Amamy cam kết mang đến những giá trị tốt đẹp cho khách hàng và hỗ trợ cộng đồng du học sinh Việt Nam ở nước ngoài, giúp họ có những trải nghiệm tuyệt vời và ý nghĩa.',
    },
  ]

  return (
    <div className='flex pr-auto items-start relative rounded-[var(--token-8)] overflow-hidden xsm:hidden'>
      <div className='flex flex-col items-start relative  pl-[6rem] w-[27.5rem]'>
        <div className='relative self-stretch w-full h-[26.9375rem] rounded-[20px_0px_0px_20px] overflow-hidden'>
          <div className='relative w-[21.5rem] h-[26.9375rem]'>
            <div className='absolute w-[21.5rem] h-[26.9375rem] top-0 left-0 bg-[#1dacff]'>
              <img
                className='absolute w-[21.5rem] h-[26.9375rem] top-0 left-0'
                alt='Mask group'
                src={'/homepage/icon/Service-Item-Mask-Group.png'}
              />
            </div>
            <p className='absolute w-[16.625rem] top-[1.6875rem] left-7 font-PC-heading-h5  text-[#FFF] text-[2rem] not-italic font-bold leading-[130%]'>
              Lorem ipsum dolor sit amet
            </p>

            <button
              className='absolute left-7 bottom-[1.75rem] flex mt-[0.75rem] h-12 justify-center text-[#38B6FF] w-[15.875rem] items-center gap-2 rounded-[1.25rem]  
             bg-[var(--Blue-Primary,_#fff)]'
            >
              <Image
                src={'/icon/phone.svg'}
                alt='icon'
                width={31}
                height={31}
              />
              (+84) 03336666333
            </button>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='grid grid-cols-2 w-[50.0625] items-start gap-[0_0] '>
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start p-8 gap-5 w-[33.3125rem] h-[26.9375rem] bg-white border border-[#dcdfe4] flex-grow 
    ${index !== services.length - 1 ? 'border-r-0' : 'rounded-tr-[20px] rounded-br-[20px]'}`}
            >
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-3'>
                  <div className="font-montserrat font-bold text-[1.75rem] leading-[2.275rem] tracking-[-0.04em]"                  >
                    {service.title}
                  </div>
                </div>

               
              </div>
              <p className='text-[#000000CC] font-montserrat font-medium text-base leading-[1.6] tracking-[-0.03em]'>
                  {service.description}
                </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer
