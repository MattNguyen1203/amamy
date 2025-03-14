'use client'
import {IAbout} from '@/sections/about/about.interface'
import Image from 'next/image'
import QuantityList from './QuantityList'
import QuantityListMB from './QuantityListMB'
import SectionServiceFeature from './SectionServiceFeature'

interface Prop {
  data: IAbout
}
const QuantitySection = ({data}: Prop) => {
  const quantities = data?.amamy_quality?.list_quality
  return (
    <div className='relative mb-[16rem] xsm:bg-[#f7f7f7] xsm:px-[1rem] xsm:pt-[2.5rem] xsm:pb-0  xsm:mb-[1rem]'>
      <div className='w-full flex xsm:flex-col '>
        <div className='w-[27.5rem] h-[62.9375rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:shadow-none xsm:hidden'>
          <div className='h-[535px] top-[12.5rem] left-[5.9375rem] relative w-[18.5625rem]'>
            <div className='flex flex-col items-start gap-[1.06rem] relative '>
              <p className='text-[2.875rem] not-italic font-bold leading-[120%]'>
                {data?.amamy_quality?.title}
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] w-[18.24512rem]'>
                {data?.amamy_quality?.description}
              </p>
            </div>
          </div>
        </div>
        <div className='hidden xsm:block'>
          <div className='flex flex-col items-start gap-[.5rem] relative mx-0'>
            <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
              {data?.amamy_quality?.title}
            </p>
            <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
              {data?.amamy_quality?.description}
            </p>
          </div>
        </div>

        <div className=' flex-1 flex gap-[2.5rem] pt-[7.315rem] bg-[#C1E8FF] pl-[6rem] xsm:pl-0 relative xsm:bg-transparent xsm:pt-[1rem]'>
          <Image
            src={'/homepage/icon/Isolation_Mode.png'}
            alt='background-image'
            className='absolute inset-0 left-[20] z-[-1] bottom-0 w-[89.4375rem] h-[35.50475rem] flex-shrink-0 xsm:w-0 xsm:h-fit'
            width={1000}
            height={1000}
          />
          <div className='flex-1 flex gap-[2.5rem]  xsm:hidden'>
            <QuantityList quantities={quantities} />
          </div>
          <div className='hidden xsm:block'>
            <QuantityListMB quantities={quantities} />
          </div>
        </div>
      </div>
      <div className='absolute xsm:relative bottom-[-15rem] xsm:bottom-0 rounded-[20px] bg-white xsm:mt-[1rem]'>
        <SectionServiceFeature data={data?.amamy_service} />
      </div>
    </div>
  )
}

export default QuantitySection
