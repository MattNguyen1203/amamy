'use client'
import React from 'react'
import TrackingInterface from './TrackingOrder'
import {IBanner, IImage} from '@/utils/type'
import ImageV2 from '@/components/image/ImageV2'

const Banner = ({banner}: {banner: IBanner}) => {
  return (
    <>
      <div className='relative w-full h-[49.25rem] text-white xsm:hidden'>
        <ImageV2
          alt=''
          className='size-full'
          src={banner?.background_pc.url}
          width={3000}
          height={2000}
        />
        <div className='absolute left-[6rem] top-[13.37rem]'>
          <div className='flex items-center space-x-3'>
            <div className='flex relative w-[8.25rem] -space-x-3'>
              {banner?.user_list.map((item, index) => (
                <AvatarIcon
                  key={index}
                  item={item}
                />
              ))}
              <div className='size-9 rounded-full border-[1.5px] border-white bg-Blue-400 flex-center text-[0.75rem] font-semibold text-white leading-none'>
                7k
              </div>
            </div>
            <div className=''>
              <p className='text-[1.5rem] font-bold tracking-[-0.045rem] uppercase'>
                {banner?.user_number}
              </p>
              <p className='text-pc-sub14s'>{banner?.review_title}</p>
            </div>
          </div>
          <p className='mt-6 text-[2.625rem] font-bold leading-[120%] w-[44rem] tracking-[-0.105rem] [text-shadow:4px_8px_13.3px_rgba(0,0,0,0.12)]'>
            {banner?.title}
          </p>
          <div className='mt-7'>
            <TrackingInterface />
          </div>
        </div>
      </div>
      <div className='xsm:flex hidden '>
        <BackgroundMobile
          banner={banner}
          height='h-[25.6874rem]'
        />
      </div>
    </>
  )
}

export default Banner

const BackgroundMobile = ({
  banner,
  height = 'h-[25.6874rem]',
}: {
  banner: IBanner
  height?: string
}) => {
  return (
    <div className='flex flex-col'>
      <ImageV2
        className={`w-full ${height} flex-shrink-0  top-0 right-0 z-[10]`}
        src={banner?.background_mobile.url}
        alt={banner?.background_mobile.alt}
        width={1000}
        height={1000}
      />
      <div className='px-[1rem]'>
        <div className='mt-[4.27rem] flex gap-[0.75rem] '>
          <div className='flex relative w-[7rem]'>
            {banner?.user_list.map((item, index) => (
              <div
                key={index}
                style={{
                  transform: `translateX(${index * 2.25 - index * 0.75}rem)`,
                }}
                className='absolute top-0 left-0'
              >
                <AvatarIcon item={item} />
              </div>
            ))}
          </div>
          <div className='w-[13.32rem]'>
            <p className='font-[Montserrat] text-[1rem] not-italic font-bold leading-[normal] tracking-[-0.03rem]'>
              {banner?.user_number}
            </p>
            <p className='text-[0.625rem] not-italic font-medium leading-[140%]'>
              {banner?.review_title}
            </p>
          </div>
        </div>
        <div className='mt-[.75rem] mb-[1rem]'>
          <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
            {banner?.title}
          </p>
        </div>
        <div className='mt-[1rem]'>
          <TrackingInterface />
        </div>
      </div>
    </div>
  )
}

const AvatarIcon = ({className, item}: {className?: string; item: IImage}) => {
  return (
    <ImageV2
      className={`rounded-[2.25rem] border-[1.5px] border-solid object-contain border-[#FFF] bg-[#C8B1B1] w-9 h-9 ${className}`}
      src={item.url}
      alt={item.alt}
      width={200}
      height={200}
    />
  )
}
