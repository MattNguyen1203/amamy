'use client'

import ICMessengerLogo from '@/components/icon/ICMessengerLogo'
import ICPhoneCall from '@/components/icon/ICPhoneCall'
import {ServicesObject} from '@/utils/type'
import Link from 'next/link'
import {ComponentProps, ReactNode} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import ServiceCard from './ServiceCard'
import ServiceHighlight from './ServiceHighlight'

const Service = ({services}: {services: ServicesObject}) => {
  return (
    <div className='my-[5rem] size-full xsm:my-[2.5rem] xsm:max-w-full max-w-[88rem] mx-auto'>
      <div className='flex size-full flex-row items-stretch xsm:flex-col xsm:items-start'>
        {/* Heading */}
        <div className='flex flex-col items-start justify-between gap-y-[1.5rem] flex-1 mr-[3.75rem] xsm:mr-0 xsm:px-[1rem]'>
          <div className='flex flex-col gap-y-[1.25rem] xsm:gap-y-[0.63rem]'>
            <h3
              className='text-[rgba(0, 0, 0, 0.92)] text-[2.625rem] font-bold leading-[3.4125rem] tracking-[-0.105rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[-0.05rem] [&_br]:sm:hidden'
              dangerouslySetInnerHTML={{__html: services?.title ?? ''}}
            />
            <p className='text-[rgba(0, 0, 0, 0.80)] text-[1rem] font-medium leading-[1.5rem] tracking-[-0.03rem] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'>
              {services?.description ?? ''}
            </p>
          </div>
          <ChatButton
            href={services?.link.url || '#'}
            target={services?.link.target || '_self'}
            icon={
              <ICMessengerLogo className='size-[1.17944rem] fill-Blue-Primary' />
            }
            text='Chat với chúng tôi'
            className='xsm:hidden'
          />
        </div>

        {/* Main Content */}
        <div className='flex flex-col items-center gap-y-[1.25rem] xsm:my-[1.25rem] w-[61.1rem] xsm:w-full xsm:px-[1rem]'>
          {/* Steps */}
          <div className='grid w-full grid-cols-3 gap-[1.25rem] xsm:grid-cols-1 xsm:gap-[0.62rem]'>
            {services?.list_service_1?.map((item, index) => (
              <ServiceCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                subtitle={item.subtitle}
                href={`${item.link.url}`}
              />
            ))}
          </div>

          {/* Reasons Desktop */}
          <div className='hidden w-full items-center justify-between sm:flex'>
            {services?.list_service_2?.map((item, index) => (
              <ServiceHighlight
                key={index}
                icon={item.image.url || ''}
                label={item.title}
                desc={item.description ?? ''}
                link={`${item.link.url}`}
              />
            ))}
          </div>
        </div>

        {/* Reasons Mobile */}
        <div className='flex overflow-auto w-full sm:hidden hidden_scroll'>
          {services?.list_service_2?.map((item, index) => (
            <ServiceHighlight
              key={index}
              link={`/blogs/${item.link.slug}`}
              icon={item.image.url || ''}
              label={item.title}
              desc={item.description ?? ''}
            />
          ))}
        </div>

        <ChatButton
          icon={<ICPhoneCall className='size-[1.13406rem] fill-Blue-Primary' />}
          text='Chat với chúng tôi'
          className='sm:hidden'
          target={services?.link.target || '_self'}
          href={services?.link.url || '#'}
        />
      </div>
    </div>
  )
}

export default Service

interface ChatButtonProps extends ComponentProps<typeof Link> {
  icon: ReactNode
  text: string
}

const ChatButton = ({icon, text, ...props}: ChatButtonProps) => (
  <Link
    {...props}
    className={`flex items-center justify-center gap-[0.5rem] rounded-[1.75rem] bg-Blue-Primary py-[0.75rem] pl-[0.75rem] pr-[1.5rem] text-white xsm:mx-auto xsm:mt-[1.5rem] ${props.className}`}
  >
    <span className='flex size-[2.25rem] items-center justify-center rounded-[72.58063rem] bg-white xsm:size-[2rem]'>
      {icon}
    </span>
    <p className='text-[1.375rem] font-semibold leading-[1.7875rem] tracking-[-0.04125rem] xsm:text-[1.125rem] xsm:leading-[1.4625rem] xsm:tracking-[-0.03375rem]'>
      {text}
    </p>
  </Link>
)
