'use client'
import Image from 'next/image'
import {FAQSection} from './FAQSection'
import SectionServiceFeature from './SectionServiceFeature'
import {IListServiceResponse, IServicePage} from '@/utils/type'

interface Prop {
  data: IServicePage
  listService: IListServiceResponse
}
const AIChatSection = ({data, listService}: Prop) => {
  return (
    <div className='relative mb-[15rem] xsm:bg-[#fafafa] xsm:mb-0'>
      <div className='w-full flex xsm:flex-col  '>
        <div className='w-[27.5rem] h-[62.9375rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
          <div className='h-[535px] top-[12.5rem] left-[5.9375rem] relative w-[18.5625rem]'>
            <div className='flex flex-col items-start gap-[1.06rem] relative '>
              <p className='text-[2.875rem] not-italic font-bold leading-[120%]'>
                {data.talk_to_ai.title}
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] w-[18.24512rem]'>
                {data.talk_to_ai.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className='text-center hidden xsm:block xsm:mt-[4rem]'>
          <div className='flex flex-col items-center justify-center gap-[.5rem] relative mx-[1rem]'>
            <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
              {data.talk_to_ai.title}
            </p>
            <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
              {data.talk_to_ai.subtitle}
            </p>
          </div>
        </div>

        <div className=' flex-1 flex gap-[2.5rem] xsm:block pt-[7.315rem] bg-[#C1E8FF] pl-[6rem] relative xsm:bg-transparent xsm:pt-[1rem] xsm:pl-[0rem] xsm:w-screen '>
          <Image
            src={'/homepage/icon/Isolation_Mode.png'}
            alt='background-image'
            className='absolute inset-0 left-[20] z-[-1] bottom-0 w-[89.4375rem] h-[35.50475rem] flex-shrink-0 xsm:w-0 xsm:h-fit'
            width={1000}
            height={1000}
          />

          <div
            className=' rounded-[1.25rem] w-[29.25rem] flex flex-col h-[34.5625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
            [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[21.438rem] xsm:h-[28.125rem] xsm:min-w-max py-[1rem] xsm:m-auto'
          >
            <Image
              className='absolute block xsm:hidden w-[29.3125rem] h-[34.5625rem] xsm:w-[21.438rem] xsm:h-[28.125rem] rounded-[1.25rem]'
              alt='Mask group'
              src={'/service/chat.webp'}
              width={1000}
              height={1000}
            />

            <Image
              className='absolute hidden xsm:block w-[29.3125rem] h-[34.5625rem] xsm:w-[21.438rem] xsm:h-[28.125rem] rounded-[1.25rem] '
              alt='Mask group'
              src={'/service/chat-mb.webp'}
              width={1000}
              height={1000}
            />
          </div>
          {/*  */}
          <div
            className=' rounded-[1.25rem] xsm:rounded-none w-[29.25rem] flex flex-col h-[34.5625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
            [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[21.438rem] xsm:h-[28.125rem] xsm:min-w-[100%] xsm:mt-[1rem]'
          >
            <FAQSection faqs={data.talk_to_ai.list_faq} />
          </div>
        </div>
      </div>
      <div className='absolute xsm:relative bottom-[-15rem] xsm:bottom-0 rounded-[20px] bg-white'>
        <SectionServiceFeature
          title={data.list_services.title}
          phone={data.list_services.phone}
          listService={listService}
        />
      </div>
    </div>
  )
}

export default AIChatSection
