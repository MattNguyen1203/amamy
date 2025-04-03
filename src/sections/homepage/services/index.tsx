'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {Card, ImageIcon, ServicesObject} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Services = ({services}: {services: ServicesObject}) => {
  const isMobile = useIsMobile()
  useGSAP(() => {
    gsap.from('.fade-in-box-card-service-2', {
      scrollTrigger: {
        trigger: '.fade-in-box-card-service-2',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    })
  }, [])
  return (
    <div className='bg-[#EDF5FA] xsm:bg-[#F8F8FB] flex flex-col items-start gap-14 px-24 py-[7.5rem] relative xsm:gap-[1rem] xsm:px-0 xsm:py-[2.5rem]'>
      <div className='inline-flex items-end gap-[1.5rem] relative'>
        <div className='flex flex-col w-[63rem] items-start gap-[1.5rem] relative xsm:w-[calc(100vw)]'>
          <div className='flex flex-col items-start space-y-6 xsm:space-y-3 w-full'>
            <div className='flex h-[13.75rem] items-center space-x-6 w-full xsm:w-[calc(100vw)] xsm:px-4 xsm:space-x-3 xsm:h-auto'>
              <ServiceCard
                icon={services.list_service_1[0].icon}
                title={services.list_service_1[0].title}
                description={services.list_service_1[0].description}
                subtitle={services.list_service_1[0].subtitle}
                href={`/blogs/${services.list_service_1[0].link.slug}`}
              />
              <ServiceCard
                icon={services.list_service_1[1].icon}
                title={services.list_service_1[1].title}
                description={services.list_service_1[1].description}
                subtitle={services.list_service_1[1].subtitle}
                href={`/blogs/${services.list_service_1[1].link.slug}`}
              />

              <ServiceCard
                icon={services.list_service_1[2].icon}
                subtitle={services.list_service_1[2].subtitle}
                title={services.list_service_1[2].title}
                description={services.list_service_1[2].description}
                href={`/blogs/${services.list_service_1[2].link.slug}`}
              />
            </div>

            <div className='inline-flex h-[20.625rem] xsm:h-[15.40181rem] items-center space-x-6 xsm:space-x-3 xsm:px-4 xsm:overflow-auto xsm:w-full hidden_scroll'>
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
                title={services.list_service_2[0].title}
                href={`/blogs/${services.list_service_2[0].link.slug}`}
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
                href={`/blogs/${services.list_service_2[1].link.slug}`}
              />
            </div>
          </div>
        </div>
        {!isMobile && <CustomerSatisfaction card={services.card} />}
      </div>
    </div>
  )
}

const ServiceCard = ({
  icon,
  title,
  description,
  subtitle,
  href,
}: {
  subtitle: string
  icon: ImageIcon
  title: string
  description: string
  href?: string
}) => (
  <Link
    href={href || ''}
    className='fade-in-box-card-service-2 gap-5 p-5 flex-1 h-full bg-[#fcfdff] rounded-[1.25rem] shadow-[0px_14px_24px_0px_rgba(0,4,81,0.04)] xsm:p-[0.75rem]'
  >
    <div className='flex items-center space-x-4 xsm:space-x-0 xsm:space-y-3 w-full xsm:flex-col xsm:items-start'>
      <ImageV2
        alt={icon.alt}
        src={icon.url}
        width={200}
        height={200}
        className='size-[3.25rem] xsm:size-[2rem]'
      />
      <div className='flex flex-col space-y-2 xsm:space-y-1 flex-1'>
        <p
          className='text-sm text-[rgba(20,_41,_65,_0.60)] text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase
        xsm:text-[0.5rem]'
        >
          {subtitle}
        </p>
        <p className='text-[rgba(18,_36,_56,_0.80)] text-[1.25rem] not-italic font-bold leading-[120%] xsm:text-[0.875rem] xsm:leading-[1.3] xsm:font-semibold xsm:tracking-[-0.02625rem]'>
          {title}
        </p>
      </div>
    </div>
    <div className='p-3 mt-5 xsm:hidden'>
      <p className='text-sm text-[0.875rem] not-italic font-semibold leading-[150%] '>
        {description}
      </p>
    </div>
  </Link>
)

const ServiceHighlight = ({
  backgroundUrl,
  icon,
  title,
  href,
}: {
  icon: React.JSX.Element
  title: string
  backgroundUrl: string
  href?: string
}) => (
  <Link
    href={href || ''}
    className='fade-in-box-card-service-2 relative w-[30.75rem] h-[20.625rem] bg-white rounded-[1.25rem] overflow-hidden xsm:w-[18.75rem] xsm:h-[15.40181rem] xsm:min-w-max'
  >
    <div className='h-full bg-cover relative bg-center xsm:w-[18.75rem]'>
      <div className='w-full h-full flex flex-col items-center justify-end p-4 gap-5 bg-opacity-10 bg-white xsm:rounded-full xsm:p-[0.62rem]'>
        <div className='flex items-center w-full gap-4 bg-background-elevation5 rounded-lg px-4 py-2.5 xsm:rounded-full'>
          <span className='xsm:hidden'>{icon}</span>
          <div className='text-[#38B6FF] font-bold text-[1.375rem] mr-auto xsm:text-[0.875rem]'>
            {title}
          </div>
          <ArrowIcon />
        </div>
      </div>
      <ImageV2
        alt=''
        width={519}
        height={336}
        src={backgroundUrl}
        className='size-full absolute z-[-1] inset-0 object-cover'
      />
    </div>
  </Link>
)

const CustomerSatisfaction = ({card, href}: {card: Card; href?: string}) => (
  <Link
    href={href || ''}
    className='fade-in-box-card-service-2 relative w-[23.5rem] h-[35.875rem] bg-white rounded-[1.25rem] shadow-lg overflow-hidden xsm:hidden'
  >
    <div className='absolute z-[10] left-0 right-0'>
      <Image
        src={card?.backgroud ?? '/homepage/icon/BG_3.webp'}
        alt=''
        width={1000}
        height={1000}
        className='w-full '
      />
    </div>

    <div className='absolute inset-0 bg-cover bg-center'>
      <Image
        width={600 * 2}
        height={600 * 2}
        className='absolute w-[17.4375rem] h-[17.9375rem] left-[2.69rem] bottom-[8.32rem] object-cover z-[30]'
        alt='Image'
        src={card?.image ?? '/homepage/replace/img-1.png'}
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
    <div className='flex flex-col items-start gap-2 p-7 absolute top-0 left-0 z-10'>
      <div className='flex items-end w-full gap-2.5'>
        <div className='text-[#38B6FF]   text-[2.875rem] not-italic font-bold h-[3.4rem] leading-[120%]'>
          {card.number}
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
      <p className=' text-[1.375rem] font-medium leading-[130%] tracking-[-0.04125rem]'>
        {card.title}
      </p>
    </div>
  </Link>
)

export default Services

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
