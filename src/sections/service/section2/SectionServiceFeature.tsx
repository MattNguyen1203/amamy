import {IListServiceResponse} from '@/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Prop {
  title: string
  phone: string
  listService: IListServiceResponse
}
export const MainContainer = ({title, phone, listService}: Prop) => {
  const services = listService.data.list_services_data
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
              {title}
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
              {phone}
            </button>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='grid grid-cols-3 w-[50.0625] items-start gap-[0_0] '>
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start p-8 gap-5 w-[22.375rem] h-[26.9375rem] bg-white border border-[#dcdfe4] flex-grow 
    ${index !== services.length - 1 ? 'border-r-0' : 'rounded-tr-[20px] rounded-br-[20px]'}`}
            >
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-3'>
                  <div className='flex items-center justify-center w-[4rem] h-[4rem]'>
                    <Image
                      src={service.icons}
                      alt='icon'
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className='pr-[0.375rem]'>
                    <div className='font-montserrat font-semibold text-[0.875rem] leading-[1.0625rem] flex items-center tracking-[-0.03em] text-black/60'>
                      {service.subtitle}
                    </div>

                    <div className='font-montserrat font-bold text-[1.25rem] leading-[1.2] flex items-center tracking-[-0.04em] text-black'>
                      {service.title}
                    </div>
                  </div>
                </div>

                <p className='w-[18.375rem] h-[3.9375rem] mt-[1rem] font-montserrat font-semibold text-[0.875rem] leading-[1.3125rem] tracking-[-0.03em] text-black/80'>
                  {service.description}
                </p>
              </div>
              <Link
                href={service.link.url}
                target={service.link.target}
                className='inline-flex items-center text-blue-500 hover:text-blue-600w-[6.3125rem] h-[1.25rem] font-montserrat font-semibold text-[0.875rem] leading-[1.25rem] tracking-[-0.03em] text-black/80'
              >
                <Image
                  src={'icon/arrow-right-circle.svg'}
                  alt='icon'
                  width={28}
                  height={28}
                />
                <span className='ml-[0.625rem]'>{service.link.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer
