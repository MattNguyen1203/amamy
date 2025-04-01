import {AmamyService} from '@/utils/type'
import Image from 'next/image'
import Link from 'next/link'

interface Prop {
  data: AmamyService
}
export const MainContainer = ({data}: Prop) => {
  const services = data?.list_amamy_service

  return (
    <div className='flex sm:ml-[6rem] items-start relative overflow-hidden xsm:block xsm:bg-[#fbf8f9] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.05)] rounded-[1.25rem]'>
      <div className='xsm:px-[1rem] flex flex-col items-start relative w-[21.5rem] xsm:w-full xsm:mb-0'>
        <div className='fade-item relative self-stretch w-full h-[26.9375rem] xsm:h-auto xsm:w-full rounded-[1.25rem_0px_0px_1.25rem]  xsm:rounded-[1.25rem] overflow-hidden'>
          <div className='relative w-[21.5rem] h-[26.9375rem] xsm:h-[11.25rem] xsm:w-full '>
            <div className='bg-[#1DACFF] absolute w-[21.5rem] h-[26.9375rem] xsm:h-[11.25rem] xsm:w-full top-0  left-0 xsm:rounded-[1.25rem]'>
              <Image
                className='absolute w-[21.5rem] h-[26.9375rem] top-0 left-0 right-[1rem] xsm:h-[11.25rem] xsm:w-full xsm:rounded-[1.25rem]'
                alt='Mask group'
                src={'/homepage/icon/Service-Item-Mask-GroupV3.png'}
                width={1000}
                height={1000}
              />
            </div>
            <p className='absolute w-[16.625rem] top-[1.6875rem] left-7 font-PC-heading-h5  text-[#FFF] text-[2rem] xsm:text-[1.25rem] xsm:text-center not-italic font-bold leading-[130%]'>
              {data?.title}
            </p>

            <Link
              href={'tel:' + data?.phone}
              target='__blank'
              className='font-semibold leading-[1.3] tracking-[-0.0375rem] text-[1.25rem] absolute left-7 xsm:left-[50%] xsm:translate-x-[-50%] bottom-[1.75rem] flex mt-[0.75rem] h-12 justify-center text-[#38B6FF] xsm:text-[1rem] w-[15.875rem] xsm:w-[12.813rem] items-center gap-2 rounded-[1.25rem]  
             bg-[var(--Blue-Primary,_#fff)]'
            >
              <Image
                src={'/icon/phone.svg'}
                alt='icon'
                width={31}
                height={31}
                className='w-[1.9375rem] h-[1.9375rem] xsm:w-[1.25rem] xsm:h-[1.25rem]'
              />
              {data?.phone}
            </Link>
          </div>
        </div>
      </div>
      <div className='flex xsm:block'>
        <div className='xsm:px-[1rem] grid grid-cols-2 w-[50.0625] xsm:w-full xsm:block items-start gap-[0_0]'>
          {Array.isArray(services) &&
            services.map((service, index) => (
              <div
                key={index}
                className={`fade-item flex flex-col justify-between items-start p-8 gap-5 xsm:block w-[33.3125rem] h-[26.9375rem] xsm:h-max bg-white border border-[#dcdfe4] flex-grow xsm:p-[1.25rem] xsm:w-full  
    ${
      index !== services?.length - 1
        ? 'border-r-0'
        : 'rounded-tr-[20px] rounded-br-[20px]'
    } xsm:mb-[1rem] xsm:border-none xsm:rounded-[1.25rem] xsm:shadow-[0px_4px_32px_0px_#00276114]`}
              >
                <div className='flex flex-col space-y-2 xsm:mb-[0.75rem]'>
                  <div className='flex items-center space-x-3'>
                    <div className='font-montserrat font-bold text-[1.75rem] xsm:text-[0.875rem] xsm:leading-[1.125rem] leading-[2.275rem] tracking-[-0.04em]'>
                      {service?.title}
                    </div>
                  </div>
                </div>
                <p className='text-[#000000CC] font-montserrat font-medium text-base leading-[1.6] xsm:leading-[1.125rem] xsm:text-[0.75rem] tracking-[-0.03em]'>
                  {service?.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer
