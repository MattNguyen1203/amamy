import React from 'react'
import Section35 from './Section3.5'
import Image from 'next/image'

type Props = {}

const Section3 = (props: Props) => {
  return (
    <div>
    <div className="w-full flex ">
      <div className="w-[27.5rem] h-[42.62rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a]">
        <div className="h-[535px] top-[200px] left-[95px] relative w-[297px]">
          <div className="flex flex-col items-start gap-[1.06rem] relative w-[297px]">
            <p className="text-[2.875rem] not-italic font-bold leading-[120%]">
              Chất lượng đảm bảo, gửi hàng an tâm
            </p>

            <p className="text-[1rem] not-italic font-medium leading-[150%] w-[18.24512rem]">
              Amamy luôn mang đến những giải pháp kho vận an toàn và tối ưu cho
              mọi nhu cầu của bạn.
            </p>
          </div>
        </div>
      </div>
      <div className='bg-[#C1E8FF] flex-1 flex gap-[1rem] pt-[9.62rem] pl-[4.5rem] relative'>
        <Image src={'/homepage/icon/Isolation_Mode.png'} alt='' className='absolute left-0 bottom-0 w-[89.4375rem] h-[35.50475rem] flex-shrink-0' width={1000} height={1000} /> 
        <div className='rounded-[0.5rem] w-80 flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] pl-6 pr-6 py-6 bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)]'>
          <div className='w-[3.72rem] h-[2.36rem] mb-[1.75rem]'></div>
         
          <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] mb-[0.5rem]'>10.000+</h2>
          
          <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>Du học sinh tin tưởng lựa chọn Amamy để gửi hàng.</p>
          <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 27.3334C21.3639 27.3334 27.3334 21.3639 27.3334 14.0001C27.3334 6.63629 21.3639 0.666748 14.0001 0.666748C6.63629 0.666748 0.666748 6.63629 0.666748 14.0001C0.666748 21.3639 6.63629 27.3334 14.0001 27.3334ZM16.0405 9.29297L20.0405 13.293C20.431 13.6835 20.431 14.3167 20.0405 14.7072L16.0405 18.7072C15.65 19.0977 15.0168 19.0977 14.6263 18.7072C14.2358 18.3167 14.2358 17.6835 14.6263 17.293L16.9192 15.0001H8.66674C8.11446 15.0001 7.66674 14.5524 7.66674 14.0001C7.66674 13.4478 8.11446 13.0001 8.66674 13.0001H16.9192L14.6263 10.7072C14.2358 10.3167 14.2358 9.6835 14.6263 9.29297C15.0168 8.90245 15.65 8.90245 16.0405 9.29297Z" fill="#38B6FF"/>
          </svg>
            Tham gia cộng đồng ngay</p>
        </div>
        <div className='rounded-[0.5rem] w-80 flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] pl-6 pr-6 py-6 bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)]'>
          <div className='w-[3.72rem] h-[2.36rem] mb-[1.75rem]'></div>
          
          <p className=' text-[1rem] not-italic font-semibold leading-[150%]'>Gửi 2 chiều Việt - Mỹ </p>
          <p className='text-nowrap text-[1.25rem] not-italic font-bold leading-[130%] tracking-[-0.025rem] mb-[0.5rem]'>DỄ DÀNG HƠN BAO GIỜ HẾT</p>

          <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>Từ hướng dẫn chi tiết đến cập nhật hành trình đơn hàng.</p>
          <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 27.3334C21.3639 27.3334 27.3334 21.3639 27.3334 14.0001C27.3334 6.63629 21.3639 0.666748 14.0001 0.666748C6.63629 0.666748 0.666748 6.63629 0.666748 14.0001C0.666748 21.3639 6.63629 27.3334 14.0001 27.3334ZM16.0405 9.29297L20.0405 13.293C20.431 13.6835 20.431 14.3167 20.0405 14.7072L16.0405 18.7072C15.65 19.0977 15.0168 19.0977 14.6263 18.7072C14.2358 18.3167 14.2358 17.6835 14.6263 17.293L16.9192 15.0001H8.66674C8.11446 15.0001 7.66674 14.5524 7.66674 14.0001C7.66674 13.4478 8.11446 13.0001 8.66674 13.0001H16.9192L14.6263 10.7072C14.2358 10.3167 14.2358 9.6835 14.6263 9.29297C15.0168 8.90245 15.65 8.90245 16.0405 9.29297Z" fill="#38B6FF"/>
          </svg>
            Tham gia cộng đồng ngay</p>
        </div>
        <div className='rounded-[0.5rem] w-80 flex flex-col h-[23.0625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] pl-6 pr-6 py-6 bg-[var(--BACKGROUND-ELEVATION-5,_#FFF)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)]'>
          <div className='w-[3.72rem] h-[2.36rem] mb-[1.75rem]'></div>
          
          <p className=' text-[1rem] not-italic font-semibold leading-[150%]'>Gửi 2 chiều Việt - Mỹ </p>
          <p className='text-nowrap text-[1.25rem] not-italic font-bold leading-[130%] tracking-[-0.025rem] mb-[0.5rem]'>DỄ DÀNG HƠN BAO GIỜ HẾT</p>

          <p className='text-[0.875rem] not-italic font-semibold leading-[150%]'>Từ hướng dẫn chi tiết đến cập nhật hành trình đơn hàng.</p>
          <p className='text-[0.875rem] not-italic font-semibold leading-[140%] flex items-center justify-between w-full mt-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 27.3334C21.3639 27.3334 27.3334 21.3639 27.3334 14.0001C27.3334 6.63629 21.3639 0.666748 14.0001 0.666748C6.63629 0.666748 0.666748 6.63629 0.666748 14.0001C0.666748 21.3639 6.63629 27.3334 14.0001 27.3334ZM16.0405 9.29297L20.0405 13.293C20.431 13.6835 20.431 14.3167 20.0405 14.7072L16.0405 18.7072C15.65 19.0977 15.0168 19.0977 14.6263 18.7072C14.2358 18.3167 14.2358 17.6835 14.6263 17.293L16.9192 15.0001H8.66674C8.11446 15.0001 7.66674 14.5524 7.66674 14.0001C7.66674 13.4478 8.11446 13.0001 8.66674 13.0001H16.9192L14.6263 10.7072C14.2358 10.3167 14.2358 9.6835 14.6263 9.29297C15.0168 8.90245 15.65 8.90245 16.0405 9.29297Z" fill="#38B6FF"/>
          </svg>
            Tham gia cộng đồng ngay</p>
        </div>
      </div>
    </div>
    <Section35 />
    </div>
  )
}

export default Section3