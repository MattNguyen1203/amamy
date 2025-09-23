'use client'

import React from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {Card, ImageIcon, ServicesObject} from '@/utils/type'

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
    <div className='relative flex flex-col items-start gap-14 bg-[#EDF5FA] px-24 py-[7.5rem] xsm:gap-[1rem] xsm:bg-[#F8F8FB] xsm:px-0 xsm:py-[2.5rem]'>
      <div className='relative inline-flex items-end gap-[1.5rem]'>
        <div className='relative flex w-[63rem] flex-col items-start gap-[1.5rem] xsm:w-[calc(100vw)]'>
          <div className='flex w-full flex-col items-start space-y-6 xsm:space-y-3'>
            <div className='flex h-[13.75rem] w-full items-center space-x-6 xsm:h-auto xsm:w-[calc(100vw)] xsm:space-x-3 xsm:px-4'>
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

            <div className='hidden_scroll inline-flex h-[20.625rem] items-center space-x-6 xsm:h-[15.40181rem] xsm:w-full xsm:space-x-3 xsm:overflow-auto xsm:px-4'>
              <ServiceHighlight
                backgroundUrl={services.list_service_2[0].image.url}
                icon={
                  <Image
                    src={'/homepage/replace/BoxIcon.svg'}
                    alt=''
                    width={100}
                    height={100}
                    className='h-[2.2rem] w-[2.3rem]'
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
                    className='h-[2.2rem] w-[2.3rem]'
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
    className='fade-in-box-card-service-2 h-full flex-1 gap-5 rounded-[1.25rem] bg-[#fcfdff] p-5 shadow-[0px_14px_24px_0px_rgba(0,4,81,0.04)] xsm:p-[0.75rem]'
  >
    <div className='flex w-full items-center space-x-4 xsm:flex-col xsm:items-start xsm:space-x-0 xsm:space-y-3'>
      <ImageV2
        alt={icon.alt}
        src={icon.url}
        width={200}
        height={200}
        className='size-[3.25rem] xsm:size-[2rem]'
      />
      <div className='flex flex-1 flex-col space-y-2 xsm:space-y-1'>
        <p className='text-[0.75rem] text-sm font-semibold uppercase not-italic leading-[normal] tracking-[-0.015rem] text-[rgba(20,_41,_65,_0.60)] xsm:text-[0.5rem]'>
          {subtitle}
        </p>
        <p className='text-[1.25rem] font-bold not-italic leading-[120%] text-[rgba(18,_36,_56,_0.80)] xsm:text-[0.875rem] xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.02625rem]'>
          {title}
        </p>
      </div>
    </div>
    <div className='mt-5 p-3 xsm:hidden'>
      <p className='text-[0.875rem] text-sm font-semibold not-italic leading-[150%]'>
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
    className='fade-in-box-card-service-2 relative h-[20.625rem] w-[30.75rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white xsm:h-[14.40181rem] xsm:w-[20.75rem] xsm:min-w-max'
  >
    <div className='relative h-full bg-cover bg-center'>
      <div className='flex h-full w-full flex-col items-center justify-end gap-5 p-4 xsm:px-[0.5rem] xsm:py-[0.625rem]'>
        <div className='flex w-full items-center gap-4 rounded-[1.25rem] bg-background-elevation5 px-4 py-2.5 xsm:rounded-full'>
          <span className='xsm:hidden'>{icon}</span>
          <div className='mr-auto text-[1.375rem] font-bold text-[#38B6FF] xsm:text-[0.875rem]'>
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
        className='absolute inset-0 z-[-1] size-full object-cover'
      />
    </div>
  </Link>
)

const CustomerSatisfaction = ({card, href}: {card: Card; href?: string}) => (
  <Link
    href={href || ''}
    className='fade-in-box-card-service-2 relative h-[35.875rem] w-[23.5rem] overflow-hidden rounded-[1.25rem] bg-white shadow-lg xsm:hidden'
  >
    <div className='absolute left-0 right-0 z-[10]'>
      <Image
        src={card?.backgroud ?? '/homepage/icon/BG_3.webp'}
        alt=''
        width={1000}
        height={1000}
        className='w-full'
      />
    </div>

    <div className='absolute inset-0 bg-cover bg-center'>
      <Image
        width={600 * 2}
        height={600 * 2}
        className='absolute bottom-[8.32rem] left-[2.69rem] z-[30] h-[17.9375rem] w-[17.4375rem] object-cover'
        alt='Image'
        src={card?.image ?? '/homepage/replace/img-1.png'}
      />
    </div>
    <div className='absolute bottom-0 left-0 z-[40] flex flex-col items-start gap-4 p-4'>
      <div className='flex w-full flex-col items-start rounded-[1.25rem] bg-background-elevation5 p-4'>
        <div className='flex w-full justify-between'>
          <p className='text-[28px] font-bold text-transparent'>
            <span className='font-bold text-black'>{card.subtitle_2} </span>
            <span className='text-[36px] font-bold text-[#33a6e8]'>
              {card.number_percent}
            </span>
          </p>
          <ArrowIcon />
        </div>
        <p className='text-[1rem] font-bold not-italic leading-[130%]'>
          {card.title_2}
        </p>
      </div>
    </div>
    <div className='absolute left-0 top-0 z-10 flex flex-col items-start gap-2 p-7'>
      <div className='flex w-full items-end gap-2.5'>
        <div className='h-[3.4rem] text-[2.875rem] font-bold not-italic leading-[120%] text-[#38B6FF]'>
          {card.number}
        </div>
        <div className='relative'>
          <div className='absolute left-[-0.5rem] top-[-3rem] text-[2.875rem] font-bold text-[#38B6FF]'>
            +
          </div>
          <div className='mb-2 text-[1.25rem] font-bold not-italic leading-[120%]'>
            {card.unit}
          </div>
        </div>
      </div>
      <p className='text-[1.375rem] font-medium leading-[130%] tracking-[-0.04125rem]'>
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
