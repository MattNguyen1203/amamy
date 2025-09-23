'use client'

import React, {ReactNode} from 'react'
import ICMessengerLogo from '@/components/icon/ICMessengerLogo'
import ICPhoneCall from '@/components/icon/ICPhoneCall'
import {ServicesObject} from '@/utils/type'
import ServiceCard from './ServiceCard'
import ServiceHighlight from './ServiceHighlight'

const Service = ({services}: {services: ServicesObject}) => {
  return (
    <div className='my-[5rem] size-full px-[6rem] xsm:my-[2.5rem] xsm:px-[1rem]'>
      <div className='flex size-full flex-row items-stretch gap-x-[3.75rem] xsm:flex-col xsm:items-start'>
        {/* Heading */}
        <div className='flex max-w-[23.125rem] flex-col items-start justify-between gap-y-[1.5rem] xsm:max-w-[20.5625rem] xsm:justify-start'>
          <div className='flex flex-col gap-y-[1.25rem] xsm:gap-y-[0.63rem]'>
            <h3 className='text-[rgba(0, 0, 0, 0.92)] text-[2.625rem] font-bold leading-[3.4125rem] tracking-[-0.105rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[-0.05rem]'>
              Gửi hàng dễ dàng tại Amamy <br className='sm:hidden' /> với 3 bước
            </h3>
            <p className='text-[rgba(0, 0, 0, 0.80)] text-[1rem] font-medium leading-[1.5rem] tracking-[-0.03rem] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'>
              Bạn chỉ cần liên hệ Amamy và gửi hàng đến Amamy Post 3 bước còn
              lại Amamy sẽ chủ động hỗ trợ và đóng hàng cho tới khi người nhận ở
              Pháp nhận hàng an toàn
            </p>
          </div>
          <ChatButton
            icon={
              <ICMessengerLogo className='size-[1.17944rem] fill-Blue-Primary' />
            }
            text='Chat với chúng tôi'
            className='xsm:hidden'
          />
        </div>

        {/* Main Content */}
        <div className='flex flex-col items-center gap-y-[1.25rem] xsm:my-[1.25rem]'>
          {/* Steps */}
          <div className='grid w-full grid-cols-3 gap-[1.25rem] xsm:grid-cols-1 xsm:gap-[0.62rem]'>
            {services?.list_service_1?.map((item, index) => (
              <ServiceCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                subtitle={item.subtitle}
                href={`/blogs/${item.link.slug}`}
              />
            ))}
          </div>

          {/* Reasons Desktop */}
          <div className='hidden_scroll inline-flex h-[20.625rem] items-center space-x-6 xsm:hidden xsm:h-[15.40181rem] xsm:w-full xsm:space-x-3 xsm:overflow-auto xsm:px-4'>
            <ServiceHighlight
              backgroundUrl={services.list_service_2[0].image.url}
              title={services.list_service_2[0].title}
              href={`/blogs/${services.list_service_2[0].link.slug}`}
            />

            <ServiceHighlight
              backgroundUrl={services.list_service_2[1].image.url}
              title={services.list_service_2[1].title}
              href={`/blogs/${services.list_service_2[1].link.slug}`}
            />
          </div>
        </div>
        {/* Reasons Mobile */}
        <div className='hidden_scroll inline-flex h-[20.625rem] items-center space-x-6 sm:hidden xsm:h-[15.40181rem] xsm:w-full xsm:space-x-3 xsm:overflow-auto xsm:px-4'>
          <ServiceHighlight
            backgroundUrl={services.list_service_2[0].image.url}
            title={services.list_service_2[0].title}
            href={`/blogs/${services.list_service_2[0].link.slug}`}
          />

          <ServiceHighlight
            backgroundUrl={services.list_service_2[1].image.url}
            title={services.list_service_2[1].title}
            href={`/blogs/${services.list_service_2[1].link.slug}`}
          />
        </div>

        <ChatButton
          icon={<ICPhoneCall className='size-[1.13406rem] fill-Blue-Primary' />}
          text='Chat với chúng tôi'
          className='sm:hidden'
        />
      </div>
    </div>
  )
}

export default Service

const ChatButton = ({
  icon,
  text,
  className,
}: {
  icon: ReactNode
  text: string
  className?: string
}) => (
  <button
    className={`flex items-center justify-center gap-[0.5rem] rounded-[1.75rem] bg-Blue-Primary py-[0.75rem] pl-[0.75rem] pr-[1.5rem] text-white xsm:mx-auto xsm:mt-[1.5rem] ${className}`}
  >
    <span className='flex size-[2.25rem] items-center justify-center rounded-[72.58063rem] bg-white xsm:size-[2rem]'>
      {icon}
    </span>
    <p className='text-[1.375rem] font-semibold leading-[1.7875rem] tracking-[-0.04125rem] xsm:text-[1.125rem] xsm:leading-[1.4625rem] xsm:tracking-[-0.03375rem]'>
      {text}
    </p>
  </button>
)
