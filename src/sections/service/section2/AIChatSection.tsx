'use client'
import MessageItem, {MessageItemProps} from '@/components/chat-bot/MessageItem'
import ImageV2 from '@/components/image/ImageV2'
import SendMessage from '@/components/svg/SendMessage'
import {IListServiceResponse, IServicePage} from '@/utils/type'
import {FAQSection} from './FAQSection'
import SectionServiceFeature from './SectionServiceFeature'

interface Prop {
  data: IServicePage
  listService: IListServiceResponse
}

const AIChatSection = ({data, listService}: Prop) => {
  const dataMessage: MessageItemProps[] = [
    {
      role: 'user',
      message: data?.talk_to_ai?.box_chat?.customer_chat || '',
      time: '2:12 PM',
    },
    {
      role: 'bot',
      message: data?.talk_to_ai?.box_chat?.ai_chat || '',
      time: '2:13 PM',
    },
  ]

  return (
    <div className='relative bg-[#FDFDFD] xsm:bg-[#fafafa]'>
      <div className='fade-section w-full flex xsm:flex-col xsm:bg-[#fafafa]'>
        <div className='w-[26.875rem] h-[69.6875rem] bg-background-elevation5 xsm:bg-[#fafafa] xsm:shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
          <div className='mt-[12.5rem] ml-[5.8rem] w-[18.5625rem]'>
            <div className='fade-item flex flex-col items-start gap-[1.06rem] relative '>
              <p className='text-pc-h1 text-black'>
                {data?.talk_to_ai?.title || ''}
              </p>
              <p className='text-pc-sub16 max-w-[18.24512rem]'>
                {data?.talk_to_ai?.subtitle || ''}
              </p>
            </div>
          </div>
        </div>
        <div className='text-center hidden xsm:block xsm:mt-[4rem] xsm:bg-[#fafafa]'>
          <div className='flex flex-col items-center justify-center gap-[.5rem] relative mx-[1rem]'>
            <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
              {data?.talk_to_ai?.title || ''}
            </p>
            <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
              {data?.talk_to_ai?.subtitle || ''}
            </p>
          </div>
        </div>

        <div className='flex-1 flex gap-[2.5rem] xsm:block pt-[7.315rem] h-[62.9375rem] bg-[#C1E8FF] xsm:bg-[#fafafa] px-[6rem] relative xsm:bg-transparent xsm:pt-[2rem] xsm:px-0 xsm:w-screen '>
          <ImageV2
            alt=''
            width={1000}
            height={1000}
            src='/homepage/map.webp'
            className='w-full h-[35.50475rem] xsm:h-full object-cover absolute xsm:top-0 sm:bottom-[-3rem] left-0 xsm:hidden'
          />

          <div className='fade-item flex-1 flex flex-col relative z-10 h-[34.5625rem] xsm:w-[calc(100%-2rem)] xsm:h-[28.125rem] rounded-[1.25rem] bg-Blue-Primary xsm:mx-auto'>
            <div className='p-3 flex items-center space-x-3 justify-center cursor-pointer'>
              <ImageV2
                alt=''
                width={40}
                height={40}
                src='/homepage/icon/star-ai-w.svg'
                className='size-6 object-contain'
              />
              <p className='text-white text-[1rem] font-semibold leading-none tracking-[0.01rem]'>
                {data?.talk_to_ai?.box_chat?.title || 'Trợ lý AI Amamy'}
              </p>
            </div>
            <div className='bg-white rounded-[1.25rem] px-4 py-5 xsm:p-[0.75rem] flex flex-col flex-1 justify-end'>
              <div className='flex-1 overflow-auto flex flex-col justify-end space-y-3 hidden_scroll'>
                {dataMessage.map((item, index) => (
                  <MessageItem
                    key={index}
                    {...item}
                  />
                ))}
              </div>
              <div className='flex mt-8 items-center rounded-[1.25rem] bg-Blue-Primary'>
                <input
                  disabled
                  type='text'
                  placeholder='Nhập yêu cầu của bạn...'
                  className='disabled:bg-white flex-1 p-4 border border-Blue-100 outline-none rounded-[1.25rem] text-pc-sub14m text-black placeholder:text-black/30'
                />
                <button className='flex-center cursor-default pr-[0.875rem]'>
                  <SendMessage className='size-6' />
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className='fade-item relative z-10 rounded-[1.25rem] xsm:rounded-none flex-1 flex flex-col rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
            [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-full xsm:mt-[1rem]'
          >
            <FAQSection faqs={data?.talk_to_ai?.list_faq} />
          </div>
        </div>
      </div>
      <div className='rounded-[1.25rem] -mt-[22rem] xsm:pt-[2.5rem] xsm:mt-[1.5rem] bg-white'>
        <SectionServiceFeature
          title={data?.list_services?.title}
          phone={data?.list_services?.phone}
          listService={listService}
        />
      </div>
    </div>
  )
}

export default AIChatSection
