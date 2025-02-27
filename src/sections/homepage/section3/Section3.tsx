import React from 'react'
import Section35 from './Section3.5'
import Image from 'next/image'
import {ShippingServiceObject, StrengthsObject} from '@/utils/type'
import Link from 'next/link'
import Section35Mobile from './Section35Mobile'

type Props = {
  sectionCountry: ShippingServiceObject
  section3: StrengthsObject
}

const Section3 = ({sectionCountry, section3}: Props) => {
  return (
    <div>
      <div className='w-full flex xsm:flex-col '>
        <div className='w-[27.5rem] h-[42.62rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
          <div className='h-[535px] top-[12.5rem] left-[5.9375rem] relative w-[18.5625rem]'>
            <div className='flex flex-col items-start gap-[1.06rem] relative w-[297px]'>
              <p className='text-[2.875rem] not-italic font-bold leading-[120%]'>
                {section3.title}
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] w-[18.24512rem]'>
                {section3.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className='hidden xsm:block'>
            <div className='flex flex-col items-start gap-[.5rem] relative mx-[1rem]'>
              <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
                {section3.title}
              </p>
              <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
                {section3.subtitle}
              </p>
            </div>
        </div>

        <div className=' flex-1 flex gap-[1rem] pt-[9.62rem] bg-[#C1E8FF] pl-[4.5rem] relative xsm:bg-transparent xsm:pt-[1rem] xsm:pl-[1rem] 
        xsm:w-screen xsm:overflow-x-scroll'>
          <Image
            src={'/homepage/icon/Isolation_Mode.png'}
            alt='background-image'
            className='absolute inset-0 left-[20] z-[-1] bottom-0 w-[89.4375rem] h-[35.50475rem] flex-shrink-0 xsm:w-0 xsm:h-fit'
            width={1000}
            height={1000}
          />

          <div
            className='cursor-pointer rounded-[0.5rem] w-[20rem] flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
           bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[17.5rem] xsm:h-[13.875rem] xsm:min-w-max'
          >
            <div className='w-[3.72rem] static z-10 h-[2.36rem] mx-6 mt-6 '>
              <Image
                src={section3.list_strengths.item_1.flag.url}
                className='w-[3.72vw] h-[2.63vw] xsm:w-[3.125rem] xsm:h-[2rem]'
                alt={section3.list_strengths.item_1.flag.alt}
                width={940}
                height={600}
              />
            </div>

            <div className='mx-6 group-hover:hidden h-full flex flex-col pb-6'>
              <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] mb-[0.5rem] mt-[1.75rem] xsm:text-[1.75rem]'>
                {section3.list_strengths.item_1.title}
              </h2>

              <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>
                {section3.list_strengths.item_1.subtitle}
              </p>
              <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
                <ArrowIcon />
                Tham gia cộng đồng ngay
              </p>
            </div>

            <div className='group mt-[2rem] hidden group-hover:flex group-hover:flex-col h-full'>
              <div className='flex flex-col gap-[0.25rem] px-6 mb-auto'>
                {section3.list_strengths.item_1.list_des.map((item, index) => (
                  <div
                    key={index}
                    className='flex  gap-[0.25rem] '
                  >
                    <div className='flex-shrink-0 w-[1.25rem] h-[1.25rem]'>
                      <StartIcon />
                    </div>
                    <p className='font-[SVN-Gilroy] text-[0.875rem] not-italic font-medium leading-[150%]'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-auto'>
                <p className='text-[0.875rem] pb-[1.25rem] px-6 not-italic font-semibold leading-[140%] flex items-center gap-[0.8rem] w-full mt-auto'>
                  <ArrowIcon />
                  Tham gia cộng đồng ngay
                </p>
                <div className='bg-[#60C5FF] text-white flex-col flex h-[4.625rem] w-full  pl-6 pr-[3.9375rem] py-3 rounded-b-[0.5rem]'>
                  <Link
                    href={'#'}
                    className='flex gap-[0.38rem] items-center'
                  >
                    <FbIcon />
                    <p className=' text-[0.75rem] not-italic font-extrabold leading-[110%] uppercase'>
                      Tham gia Group
                    </p>
                  </Link>
                  <p className='mt-[0.38rem] text-[0.875rem] not-italic font-semibold leading-[140%]'>
                    Amamy gửi hàng an toàn
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className='cursor-pointer rounded-[0.5rem] w-[20rem] flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
           bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[17.5rem] xsm:h-[13.875rem]  xsm:min-w-max'
          >
            <div className='w-[3.72rem] static z-10 h-[2.36rem] mx-6 mt-6 '>
              <Image
                src={section3.list_strengths.item_2.flag.url}
                className='w-[3.72vw] h-[2.63vw]'
                alt={section3.list_strengths.item_2.flag.alt}
                width={940}
                height={600}
              />
            </div>

            <div className='mx-6 group-hover:hidden h-full flex flex-col pb-6 mt-[2rem]'>
              <p className=' text-[1rem] not-italic font-semibold leading-[150%]'>
                {section3.list_strengths.item_2.header}{' '}
              </p>
              <p className='text-nowrap text-[1.25rem] not-italic font-bold leading-[130%] tracking-[-0.025rem] mb-[0.5rem]'>
                {section3.list_strengths.item_2.title}
              </p>

              <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>
                {section3.list_strengths.item_2.subtitle}
              </p>
              <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
                <ArrowIcon />
                Tham gia cộng đồng ngay
              </p>
            </div>

            <div className='group mt-[2rem] hidden group-hover:flex group-hover:flex-col h-full'>
              <div className='flex flex-col gap-[0.25rem] px-6 mb-auto'>
                {section3.list_strengths.item_2.list_des.map((item, index) => (
                  <div
                    key={index}
                    className='flex gap-[0.25rem] items-start'
                  >
                    <div className='flex-shrink-0 w-[1.25rem] h-[1.25rem]'>
                      <StartIcon />
                    </div>
                    <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-auto'>
                <p className='text-[0.875rem] pb-[1.25rem] px-6 not-italic font-semibold leading-[140%] flex items-center justify-between gap-[0.8rem] w-full mt-auto'>
                  <ArrowIcon />
                  Tham gia cộng đồng ngay
                </p>
                <div className='bg-[#60C5FF] text-white flex-col flex h-[4.625rem] w-full pl-6 pr-[3.9375rem] py-3 rounded-b-[0.5rem]'>
                  <Link
                    href={'#'}
                    className='flex gap-[0.38rem] items-center'
                  >
                    <FbIcon />
                    <p className='text-[0.75rem] not-italic font-extrabold leading-[110%] uppercase'>
                      Tham gia Group
                    </p>
                  </Link>
                  <p className='mt-[0.38rem] text-[0.875rem] not-italic font-semibold leading-[140%]'>
                    Amamy gửi hàng an toàn
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className='cursor-pointer rounded-[0.5rem] w-80 flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] 
           bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group  xsm:min-w-max'
          >
            <div className='w-[3.72rem] static z-10 h-[2.36rem] mx-6 mt-6 '>
              <Image
                src={section3.list_strengths.item_3.flag.url}
                className='w-[3.72vw] h-[2.63vw]'
                alt={section3.list_strengths.item_3.flag.alt}
                width={940}
                height={600}
              />
            </div>

            <div className='mt-[2rem] mx-6 group-hover:hidden h-full flex flex-col pb-6'>
              <p className=' text-[1rem] not-italic font-semibold leading-[150%]'>
                {section3.list_strengths.item_3.header}
              </p>
              <p className='text-nowrap text-[1.25rem] not-italic font-bold leading-[130%] tracking-[-0.025rem] mb-[0.5rem]'>
                {section3.list_strengths.item_3.title}
              </p>

              <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>
                {section3.list_strengths.item_3.subtitle}
              </p>
              <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
                <ArrowIcon />
                Tham gia cộng đồng ngay
              </p>
            </div>

            <div className='group mt-[2rem] hidden group-hover:flex group-hover:flex-col h-full'>
              <div className='flex flex-col gap-[0.25rem] px-6 mb-auto'>
                {section3.list_strengths.item_3.list_des.map((item, index) => (
                  <div
                    key={index}
                    className='flex gap-[0.25rem]'
                  >
                    <div className='flex-shrink-0 w-[1.25rem] h-[1.25rem]'>
                      <StartIcon />
                    </div>
                    <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-auto'>
                <p className='text-[0.875rem] pb-[1.25rem] px-6 not-italic font-semibold leading-[140%] flex items-center justify-between gap-[0.8rem] w-full mt-auto'>
                  <ArrowIcon />
                  Tham gia cộng đồng ngay
                </p>
                <div className='bg-[#60C5FF] text-white flex-col flex h-[4.625rem] w-full pl-6 pr-[3.9375rem] py-3 rounded-b-[0.5rem]'>
                  <Link
                    href={'#'}
                    className='flex gap-[0.38rem] items-center'
                  >
                    <FbIcon />
                    <p className='text-[0.75rem] not-italic font-extrabold leading-[110%] uppercase'>
                      Tham gia Group
                    </p>
                  </Link>
                  <p className='mt-[0.38rem] text-[0.875rem] not-italic font-semibold leading-[140%]'>
                    Amamy gửi hàng an toàn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Section35 sectionCountry={sectionCountry} />
      <Section35Mobile sectionCountry={sectionCountry} />
    </div>
  )
}

export default Section3

export const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14.0001 27.3334C21.3639 27.3334 27.3334 21.3639 27.3334 14.0001C27.3334 6.63629 21.3639 0.666748 14.0001 0.666748C6.63629 0.666748 0.666748 6.63629 0.666748 14.0001C0.666748 21.3639 6.63629 27.3334 14.0001 27.3334ZM16.0405 9.29297L20.0405 13.293C20.431 13.6835 20.431 14.3167 20.0405 14.7072L16.0405 18.7072C15.65 19.0977 15.0168 19.0977 14.6263 18.7072C14.2358 18.3167 14.2358 17.6835 14.6263 17.293L16.9192 15.0001H8.66674C8.11446 15.0001 7.66674 14.5524 7.66674 14.0001C7.66674 13.4478 8.11446 13.0001 8.66674 13.0001H16.9192L14.6263 10.7072C14.2358 10.3167 14.2358 9.6835 14.6263 9.29297C15.0168 8.90245 15.65 8.90245 16.0405 9.29297Z'
        fill='#38B6FF'
      />
    </svg>
  )
}

const StartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.25rem'
      height='1.25rem'
      viewBox='0 0 20 21'
      fill='none'
    >
      <rect
        x='2'
        y='2.31055'
        width='16'
        height='16'
        rx='8'
        fill='#D9F1FF'
      />
      <path
        d='M9.07214 5.61902C9.4082 4.78294 10.5918 4.78294 10.9279 5.61902L11.6667 7.4572C11.8056 7.80278 12.125 8.04253 12.4957 8.07936L14.4709 8.27564C15.3248 8.36049 15.6822 9.41078 15.0574 9.99892L13.4711 11.4919C13.2173 11.7309 13.1062 12.0848 13.178 12.426L13.6255 14.5534C13.8077 15.4198 12.8571 16.0782 12.1101 15.603L10.5368 14.602C10.2093 14.3937 9.79074 14.3937 9.46322 14.602L7.88989 15.603C7.14286 16.0782 6.19227 15.4198 6.37453 14.5534L6.82205 12.426C6.89382 12.0848 6.78272 11.7309 6.52885 11.4919L4.94263 9.99892C4.31777 9.41078 4.67522 8.36049 5.52913 8.27564L7.50434 8.07936C7.87497 8.04253 8.19442 7.80278 8.33332 7.4572L9.07214 5.61902Z'
        fill='#38B6FF'
      />
    </svg>
  )
}

const FbIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
    >
      <path
        d='M21.5001 11.0003C21.5001 16.3034 17.5691 20.6875 12.4624 21.399C11.9849 21.4652 11.4964 21.4998 11.0005 21.4998C10.4281 21.4998 9.86599 21.4542 9.31861 21.3659C4.31857 20.561 0.500122 16.2261 0.500122 11.0003C0.500122 5.20128 5.20145 0.5 10.9998 0.5C16.7981 0.5 21.5001 5.20128 21.5001 11.0003Z'
        fill='white'
      />
      <path
        d='M12.4623 8.93047V11.2178H15.292L14.8439 14.299H12.4623V21.398C11.9849 21.4643 11.4963 21.4988 11.0004 21.4988C10.428 21.4988 9.86595 21.4532 9.31856 21.3649V14.299H6.70892V11.2178H9.31856V8.41914C9.31856 6.68283 10.726 5.27466 12.4631 5.27466V5.27613C12.4682 5.27613 12.4726 5.27466 12.4778 5.27466H15.2927V7.93945H13.4534C12.9067 7.93945 12.4631 8.38309 12.4631 8.92973L12.4623 8.93047Z'
        fill='url(#paint0_radial_40000053_23056)'
      />
      <defs>
        <radialGradient
          id='paint0_radial_40000053_23056'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(6.61064 19.3018) rotate(-50.7194) scale(15.9383 11.3546)'
        >
          <stop
            offset='0.11897'
            stop-color='#4791FF'
          />
          <stop
            offset='1'
            stop-color='#38B6FF'
          />
        </radialGradient>
      </defs>
    </svg>
  )
}
