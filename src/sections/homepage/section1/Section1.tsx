import Image from 'next/image'
import React from 'react'
import TrackingInterface from './tracking-interface'

const Section1 = () => {
  return (
    <div
      className='relative w-[100rem] h-[49.25rem] flex-shrink-0 text-white '
    >
      <Background />
      <div className='absolute z-[100] pt-[9.12rem] mx-[6rem] flex gap-[1.4rem] '>
        <div>
        <div className='mt-[4.27rem] flex gap-[0.75rem] '>
          <div className='flex relative w-[8.25rem]'>
          <AvatarIcon className='absolute top-0 left-0' />
          <AvatarIcon  className='absolute top-0 left-0 translate-x-[calc(2.25rem-0.75rem)]'/>
          <AvatarIcon  className='absolute top-0 left-0 translate-x-[calc(2.25rem*2-0.75rem*2)]'/>
          <AvatarIcon  className='absolute top-0 left-0 translate-x-[calc(2.25rem*3-0.75rem*3)]'/>
          <AvatarIcon  className='absolute top-0 left-0 translate-x-[calc(2.25rem*4-0.75rem*4)]'/>
          </div>
          <div className=''>
          <p className='text-[1.5rem] not-italic font-bold leading-[normal] tracking-[-0.045rem]'>12k+</p>
          <p className='text-[0.875rem] not-italic font-semibold leading-[normal] tracking-[-0.02625rem]'>Đánh giá tốt từ khách hàng sử dụng dịch vụ</p>
          </div>
        </div>
        <div className='mt-[1.5rem] mb-[1.75rem]'>
          <p className='text-[2.625rem] not-italic font-bold leading-[120%] w-[40rem]'>Điểm gửi hàng an toàn, minh bạch cho du học sinh Việt Nam</p>
        </div>
        <div className='mt-[1rem]'>
          <TrackingInterface />
        </div>
        </div>
        <div className=''>
        <div className='flex gap-[1.17rem]'>
          <div className='-skew-y-[4deg]'>
            <Image 
             src='/homepage/replace/section1-1.jpg' alt='Group-1' width={1000} height={1000} className='object-cover w-[14.45088rem]  rounded-md mt-[1.4rem] h-[13.61225rem] flex-shrink-0 stroke-[1.762px] stroke-[rgba(255,_255,_255,_0.80)] [filter:drop-shadow(0px_0px_35.235px_rgba(255,_255,_255,_0.40))_drop-shadow(0px_0px_11.745px_rgba(255,_255,_255,_0.25))]'/>
          </div>
          <Image src='/homepage/replace/section1-3.jpg' alt='Group-1'
          style={{
            filter: 'drop-shadow(0px 0px 35.235px rgba(255, 255, 255, 0.40)) drop-shadow(0px 0px 11.745px rgba(255, 255, 255, 0.25))'   ,
            stroke: 'rgba(255, 255, 255, 0.80)'
          }}
          width={1000} height={1000} className='w-[14.45088rem] object-cover rounded-md h-[13.61225rem] flex-shrink-0 stroke-[1.762px] stroke-[rgba(255,_255,_255,_0.80)] [filter:drop-shadow(0px_0px_35.235px_rgba(255,_255,_255,_0.40))_drop-shadow(0px_0px_11.745px_rgba(255,_255,_255,_0.25))]'/>

          <div className='skew-y-[4deg] inset-0 transform '>
          <Image src='/homepage/replace/section1-2.jpg' alt='Group-1' width={1000} height={1000} className='w-[14.45088rem] object-cover rounded-md mt-[1.4rem] h-[13.61225rem] flex-shrink-0 stroke-[1.762px] stroke-[rgba(255,_255,_255,_0.80)] [filter:drop-shadow(0px_0px_35.235px_rgba(255,_255,_255,_0.40))_drop-shadow(0px_0px_11.745px_rgba(255,_255,_255,_0.25))]'/>
          </div>
        </div>
        <Image className='w-[34.95956rem] object-cover h-[31.5rem] absolute right-[4.45rem] bottom-[-4.44rem] flex-shrink-0' 
        src='/homepage/icon/Box1.png' alt='Group-1' width={1000} height={1000} />
      </div>
      </div>
 
    </div>
  )
}

export default Section1

const Background = () => {
  return (
    <>
      <div
        className='w-[100rem] h-[39.6875rem] flex-shrink-0 absolute top-0 right-0 z-[10]'
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 51.93%, rgba(255, 255, 255, 0.75) 85.78%), url(/homepage/icon/background-section1.png) lightgray 50% / cover no-repeat',
        }}
      ></div>

      <div
        className='w-[100rem] absolute bottom-0  right-0 left-0  h-[25.34375rem] flex-shrink-0 z-[60]'
        style={{
          filter: 'drop-shadow(0px -7px 40px rgba(0, 40, 143, 0.16))',
          fill: '#38B6FF',
          background: `url(/homepage/icon/Mask-group.png)  50% / cover no-repeat`,
        }}
      ></div>

      {/* Blue */}
      <div
        className='bg-[radial-gradient(136.84%_136.84%_at_50%_136.84%,_rgba(255,_255,_255,_0.80)_32.43%,_#38B6FF_100%)] 
    absolute top-0 right-0 z-[55] opacity-80 bottom-0 left-0'
      ></div>
    </>
  )
}

const AvatarIcon = ({className}: {className: string}) => {
  return <div className={`rounded-[2.25rem] border-[1.5px] border-solid border-[#FFF] bg-[#C8B1B1] w-9 h-9 ${className}`}
  style={{
    background: 'url(/homepage/replace/Customer-Avatar.png) lightgray 50% / cover no-repeat',
  }}
  >
  </div>
}

