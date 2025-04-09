'use client'
import ImageV2 from '@/components/image/ImageV2'
import {IBanner, IImage} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import TrackingInterface from './TrackingOrder'

const Banner = ({banner}: {banner: IBanner}) => {
  useGSAP(() => {
    gsap.from('.fade-image', {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.fade-image',
        start: 'top bottom',
      },
    })
    gsap.from('.fade-box', {
      duration: 1,
      delay: 0.5,
      y: 50,
      scrollTrigger: {
        trigger: '.fade-box',
        start: 'top bottom',
      },
    })
  })
  return (
    <>
      <div className='relative w-full h-[49.25rem] text-white xsm:hidden'>
        <ImageV2
          alt=''
          className='size-full'
          src={banner?.background_pc.url}
          width={3000}
          height={2000}
          quality={100}
        />
        {/* <div className='absolute top-[11rem] left-[47rem] flex items-center space-x-4'>
          <ImageV2
            alt=''
            width={300}
            height={300}
            src={banner?.image_1.url}
            className='fade-image w-[14.45088rem] h-[13.61225rem] object-cover border-[0.125rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem] transform -skew-y-[4deg]'
          />
          <ImageV2
            alt=''
            width={300}
            height={300}
            src={banner?.image_2.url}
            className='fade-image w-[14.45088rem] h-[13.61225rem] -mt-14 object-cover border-[0.125rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem]'
          />
          <ImageV2
            alt=''
            width={300}
            height={300}
            src={banner?.image_3.url}
            className='fade-image w-[14.45088rem] h-[13.61225rem] object-cover border-[0.125rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem] transform skew-y-[4deg]'
          />
        </div> */}

        {/* box */}
        {/* <ImageV2
          alt=''
          width={300 * 2}
          height={300 * 2}
          src={banner?.box_image}
          className='fade-box w-[34.95956rem] h-[31.5rem] object-cover absolute left-[54rem] top-[14rem]'
        /> */}

        <div className='fade-in-box absolute left-[6rem] top-[13.37rem]'>
          <div className='flex items-center space-x-3'>
            <div className='flex relative w-[8.25rem] -space-x-3'>
              {banner?.user_list.map((item, index) => (
                <AvatarIcon
                  key={index}
                  item={item}
                />
              ))}
              <div className='size-9 rounded-full border-[1.5px] border-white bg-Blue-400 flex-center text-[0.75rem] font-semibold text-white leading-none'>
                {banner?.user_number}
              </div>
            </div>
            <div className=''>
              <p className='text-[1.5rem] font-bold tracking-[-0.045rem] uppercase'>
                {banner?.user_number}
              </p>
              <p className='text-pc-sub14s'>{banner?.review_title}</p>
            </div>
          </div>
          <h2 className='mt-6 text-[2.75rem] font-bold leading-[120%] w-[44rem] tracking-[-0.105rem] [text-shadow:4px_8px_13.3px_rgba(0,0,0,0.12)]'>
            {banner?.title}
          </h2>
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
    <div className='flex flex-col relative xsm:w-full'>
      <ImageV2
        className={`w-full ${height} flex-shrink-0`}
        src={banner?.background_mobile.url}
        alt={banner?.background_mobile.alt}
        width={1000}
        height={1000}
      />
      {/* <div className='absolute top-[7rem] left-[0.5rem] flex items-center space-x-4'>
        <ImageV2
          alt=''
          width={300}
          height={300}
          src={banner?.image_1.url}
          className='w-[6.49513rem] h-[6.13581rem] object-cover border-[0.0625rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem] transform -skew-y-[4deg]'
        />
        <ImageV2
          alt=''
          width={300}
          height={300}
          src={banner?.image_2.url}
          className='w-[6.49513rem] h-[6.13581rem] -mt-6 object-cover border-[0.0625rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem]'
        />
        <ImageV2
          alt=''
          width={300}
          height={300}
          src={banner?.image_3.url}
          className='w-[6.49513rem] h-[6.13581rem] object-cover border-[0.0625rem] border-white/80 shadow-[0px_0px_35.235px_rgba(255,255,255,0.40),0px_0px_11.745px_rgba(255,255,255,0.25)] rounded-[0.5rem] transform skew-y-[4deg]'
        />
      </div> */}

      {/* box */}
      {/* <ImageV2
        alt=''
        width={300}
        height={300}
        src='/homepage/box.webp'
        className='w-[16.9375rem] h-[15.25rem] object-cover absolute left-[4rem] top-[7rem]'
      /> */}

      <div className='px-[1rem] pt-5 -mt-8 rounded-t-[1.25rem] bg-[#F8F8FB] relative z-[20]'>
        <div className='flex space-x-[0.75rem] items-center'>
          <div className='flex relative -space-x-2.5'>
            {banner?.user_list.map((item, index) => (
              <AvatarIcon
                item={item}
                key={index}
              />
            ))}
            <div className='size-7 rounded-full border-[1.5px] border-white bg-Blue-400 flex-center text-[0.75rem] xsm:text-[0.58331rem] font-semibold text-white leading-none'>
              {banner?.user_number}
            </div>
          </div>
          <div className='flex-1'>
            <p className='font-montserrat text-[1rem] font-bold leading-[normal] tracking-[-0.03rem]'>
              {banner?.user_number}
            </p>
            <p className='text-[0.625rem] font-medium leading-[140%]'>
              {banner?.review_title}
            </p>
          </div>
        </div>
        <p className='mt-3 text-[1.25rem] font-bold leading-[120%]'>
          {banner?.title}
        </p>
        <div className='mt-5'>
          <TrackingInterface />
        </div>
      </div>
    </div>
  )
}

const AvatarIcon = ({className, item}: {className?: string; item: IImage}) => {
  return (
    <ImageV2
      className={`rounded-[2.25rem] border-[1.5px] border-solid object-cover border-[#FFF] bg-[#C8B1B1] size-9 xsm:size-7 ${className}`}
      src={item.url}
      alt={item.alt}
      width={200}
      height={200}
    />
  )
}
