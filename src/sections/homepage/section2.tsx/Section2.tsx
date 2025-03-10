import ImageV2 from '@/components/image/ImageV2'
import {Card, ImageIcon, ServicesObject} from '@/utils/type'
import Image from 'next/image'
import React from 'react'

const Section2 = ({services}: {services: ServicesObject}) => {
  return (
    <div className='flex flex-col items-start gap-14 px-24 py-[7.5rem] relative xsm:gap-[1rem] xsm:pl-[1rem] xsm:px-[1rem] xsm:py-[2.5rem]'>
      <div className='inline-flex items-end gap-[1.5rem] relative'>
        <div className='flex flex-col w-[63rem]  items-start gap-[1.5rem] relative xsm:w-[calc(100vw-2rem)]'>
          <div className='flex flex-col items-start gap-[1.5rem] w-full'>
            <div className='flex h-[13.75rem] items-center gap-[1.5rem] w-full xsm:w-[calc(100vw-2rem)] xsm:gap-[1rem] xsm:h-[7.375rem]'>
              <ServiceCard
                icon={services.list_service_1[0].icon}
                title={services.list_service_1[0].title}
                description={services.list_service_1[0].description}
                subtitle={services.list_service_1[0].subtitle}
              />
              <ServiceCard
                icon={services.list_service_1[1].icon}
                title={services.list_service_1[1].title}
                description={services.list_service_1[1].description}
                subtitle={services.list_service_1[1].subtitle}
              />

              <ServiceCard
                icon={services.list_service_1[2].icon}
                subtitle={services.list_service_1[2].subtitle}
                title={services.list_service_1[2].title}
                description={services.list_service_1[2].description}
              />
            </div>

            <div className='inline-flex h-[20.625rem] items-center gap-[1.5rem] xsm:gap-[0.75rem] xsm:overflow-auto xsm:w-[calc(100vw-1rem)]'>
              <ServiceHighlight
                backgroundUrl={services.list_service_2[0].image.url}
                icon={
                  <Image
                    src={'/homepage/replace/BoxIcon.svg'}
                    alt=''
                    width={100}
                    height={100}
                    className='w-[2.3rem] h-[2.2rem]'
                  />
                }
                title='Đóng gói miễn phí'
              />

              <ServiceHighlight
                backgroundUrl={services.list_service_2[1].image.url}
                icon={
                  <Image
                    src={'/homepage/icon/houseIcon.svg'}
                    alt=''
                    width={100}
                    height={100}
                    className='w-[2.3rem] h-[2.2rem]'
                  />
                }
                title={services.list_service_2[1].title}
              />
            </div>
          </div>
        </div>

        <CustomerSatisfaction card={services.card} />
      </div>
    </div>
  )
}

const ServiceCard = ({
  icon,
  title,
  description,
  subtitle,
}: {
  subtitle: string
  icon: ImageIcon
  title: string
  description: string
}) => (
  <div className='flex flex-col items-start gap-5 p-5 flex-1 bg-[#fcfdff] rounded-lg shadow-lg xsm:p-[0.75rem]'>
    <div className='flex items-center gap-4 w-full xsm:flex-col xsm:items-start'>
      <ImageV2
        alt={icon.alt}
        src={icon.url}
        width={icon.width}
        height={icon.height}
        className='w-[3.25rem] h-[3.25rem] xsm:w-[2rem] xsm:h-[2rem]'
      />

      <div className='flex flex-col gap-2 flex-1'>
        <div
          className='text-sm text-[rgba(20,_41,_65,_0.60)] text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase
        xsm:text-[0.5rem]'
        >
          {subtitle}
        </div>
        <div className='text-[rgba(18,_36,_56,_0.80)] text-[1.25rem] not-italic font-bold leading-[120%] xsm:text-[0.875rem]'>
          {title}
        </div>
      </div>
    </div>
    <div className='flex flex-col h-[86px] justify-around gap-2.5 px-3 xsm:hidden'>
      <p className=' text-sm text-[0.875rem] not-italic font-semibold leading-[150%] '>
        {description}
      </p>
    </div>
  </div>
)

const ServiceHighlight = ({
  backgroundUrl,
  icon,
  title,
}: {
  icon: React.JSX.Element
  title: string
  backgroundUrl: string
}) => (
  <div className='relative  w-[30.75rem] h-[20.625rem] bg-white rounded-lg overflow-hidden xsm:w-[18.75rem] xsm:min-w-max'>
    <div
      className={`h-full bg-cover bg-center xsm:w-[18.75rem]`}
      style={{backgroundImage: `url(${backgroundUrl})`}}
    >
      <div className='w-full h-full flex flex-col items-center justify-end p-4 gap-5 bg-opacity-10 bg-white xsm:rounded-full xsm:p-[0.62rem]'>
        <div className='flex items-center w-full gap-4 bg-background-elevation5 rounded-lg px-4 py-2.5 xsm:rounded-full'>
          <span className='xsm:hidden'>{icon}</span>
          <div className='text-[#38B6FF] font-bold text-[1.375rem] mr-auto xsm:text-[0.875rem]'>
            {title}
          </div>
          <ArrowIcon />
        </div>
      </div>
    </div>
  </div>
)

const CustomerSatisfaction = ({card}: {card: Card}) => (
  <div className='relative w-[23.5rem] h-[35.875rem] bg-white rounded-lg shadow-lg overflow-hidden xsm:hidden'>
    <div className='absolute  z-[10]'>
      <Image
        src={'/homepage/icon/BG.png'}
        alt=''
        width={1000}
        height={1000}
        className='w-full '
      />
    </div>

    <div className='absolute inset-0 bg-[url(/image.png)] bg-cover bg-center'>
      <img
        className='absolute w-[279px] h-[287px] top-[149px] left-[43px] object-cover z-[30]'
        alt='Image'
        src={'/homepage/replace/img-1.png'}
      />
    </div>
    <div className='flex flex-col items-start gap-4 p-4 absolute bottom-0 left-0 z-[40]'>
      <div className='flex flex-col items-start bg-background-elevation5 rounded-lg p-4 w-full'>
        <div className='flex justify-between w-full'>
          <p className='text-transparent text-[28px] font-bold'>
            <span className='text-black font-bold'>{card.subtitle_2} </span>
            <span className='text-[#33a6e8] text-[36px] font-bold'>
              {card.number_percent}
            </span>
          </p>
          <ArrowIcon />
        </div>
        <p className='text-[1rem] not-italic font-bold leading-[130%]'>
          {card.title_2}
        </p>
      </div>
    </div>
    <div className='flex flex-col items-start gap-2 p-7 absolute top-0 left-0 z-[60]'>
      <div className='flex items-end w-full gap-2.5'>
        <div className='text-[#38B6FF]   text-[2.875rem] not-italic font-bold h-[3.4rem] leading-[120%]'>
          12.000
        </div>
        <div className='relative'>
          <div className='text-[#38B6FF] top-[-3rem] left-[-0.5rem] absolute text-[2.875rem] font-bold'>
            +
          </div>
          <div className='text-[1.25rem] not-italic font-bold leading-[120%] mb-2'>
            {card.unit}
          </div>
        </div>
      </div>
      <p className=' text-[1.375rem] not-italic font-medium leading-[130%]'>
        {card.title}
      </p>
    </div>
  </div>
)

export default Section2

const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2rem'
      height='2rem'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.0001 27.3333C21.3639 27.3333 27.3334 21.3638 27.3334 14C27.3334 6.63616 21.3639 0.666626 14.0001 0.666626C6.63629 0.666626 0.666748 6.63616 0.666748 14C0.666748 21.3638 6.63629 27.3333 14.0001 27.3333ZM16.0405 9.29285L20.0405 13.2929C20.431 13.6834 20.431 14.3165 20.0405 14.7071L16.0405 18.7071C15.65 19.0976 15.0168 19.0976 14.6263 18.7071C14.2358 18.3165 14.2358 17.6834 14.6263 17.2929L16.9192 15H8.66674C8.11446 15 7.66674 14.5522 7.66674 14C7.66674 13.4477 8.11446 13 8.66674 13H16.9192L14.6263 10.7071C14.2358 10.3165 14.2358 9.68338 14.6263 9.29285C15.0168 8.90233 15.65 8.90233 16.0405 9.29285Z'
        fill='#38B6FF'
      />
    </svg>
  )
}
