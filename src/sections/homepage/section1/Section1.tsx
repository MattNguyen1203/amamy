'use client'
import Image from 'next/image'
import React from 'react'
import TrackingInterface from './tracking-interface'
import { IBanner, IImage } from '@/utils/type'
import ImageV2 from '@/components/image/ImageV2'

const Section1 = ({banner} : {banner: IBanner}) => {
  return (
   <>
    <div
      className='relative w-[100rem] h-[49.25rem] flex-shrink-0 text-white xsm:hidden'
    >
      <Background background={banner.background_pc} />
      <div className='absolute z-[100] pt-[9.12rem] mx-[6rem] flex gap-[1.4rem] '>
        <div>
        <div className='mt-[4.27rem] flex gap-[0.75rem] '>
            <div className='flex relative w-[8.25rem]'>
            {
              banner.user_list.map((item, index) => (
              <AvatarIcon key={index} item={item} className={`absolute top-0 left-0 translate-x-[calc(2.25rem*${index}-0.75rem*${index})]`} />
              ))
            }
            </div>
          <div className=''>
          <p className='text-[1.5rem] not-italic font-bold leading-[normal] tracking-[-0.045rem]'>{banner.user_number}</p>
          <p className='text-[0.875rem] not-italic font-semibold leading-[normal] tracking-[-0.02625rem]'>{banner.review_title}</p>
          </div>
        </div>
        <div className='mt-[1.5rem] mb-[1.75rem]'>
          <p className='text-[2.625rem] not-italic font-bold leading-[120%] w-[40rem]'>{banner.title}</p>
        </div>
        <div className='mt-[1rem]'>
          <TrackingInterface />
        </div>
        </div>
        <div className=''>
      </div>
      </div>
 
    </div>
    <div className='xsm:flex hidden '>
      <BackgroundMobile background={banner.background_mobile} height='h-[25.6874rem]' />
    </div>
   </>
  )
}

export default Section1

const Background = ({background, height = 'h-[25.6874rem]'}: {background: IImage, height?: string}) => {
 
  return (
    <>
      <ImageV2
        className={`w-[100rem] ${height} h-[49.25rem] flex-shrink-0 absolute top-0 right-0 z-[10]`}
        src={background.url}
        alt={background.alt}
        width={background.width}
        height={background.height}
      />
    </>
  )
}


const BackgroundMobile = ({background, height = 'h-[25.6874rem]'}: {background: IImage, height?: string}) => {
 
  return (
    <>
      <ImageV2
        className={`w-[100rem] ${height} flex-shrink-0  top-0 right-0 z-[10]`}
        src={background.url}
        alt={background.alt}
        width={background.width}
        height={background.height}
      />
    </>
  )
}

const AvatarIcon = ({className, item}: {className: string, item: IImage}) => {
  return <ImageV2 className={`rounded-[2.25rem] border-[1.5px] border-solid object-contain border-[#FFF] bg-[#C8B1B1] w-9 h-9 ${className}`}
  src={item.url}
  alt={item.alt}
  width={item.width}
  height={item.height}
  >
  </ImageV2>
}

