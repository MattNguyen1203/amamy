/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {
  CurrencyToUsdResType,
  DeliveryDirectionResType,
  IBoxChatAI,
  IImage,
} from '@/utils/type'
// GSAP imports removed - animations handled by GsapProvider
import 'swiper/css'
import 'swiper/css/effect-fade'
import TrackingInterface from './TrackingOrder'
import useIsMobile from '@/hooks/useIsMobile'

interface BannerProps {
  banner: {
    title: string
    background_pc: IImage
    background_mobile: IImage
  }
  dataFaqs?: any
  boxChatAI: IBoxChatAI
  deliveryDirectionData: DeliveryDirectionResType
  currencyExchangeRateData: CurrencyToUsdResType
  isFaq?: boolean
  contact_consultant: {
    url: string
    target: string
    title: string
  }
}

const Banner = ({
  banner,
  dataFaqs,
  boxChatAI,
  deliveryDirectionData,
  currencyExchangeRateData,
  isFaq = false,
  contact_consultant,
}: BannerProps) => {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <div className='hidden xsm:flex'>
          <BackgroundMobile
            dataFaqs={dataFaqs}
            isFaq={isFaq}
            deliveryDirectionData={deliveryDirectionData}
            currencyExchangeRateData={currencyExchangeRateData}
            banner={banner}
            boxChatAI={boxChatAI}
            contact_consultant={contact_consultant}
          />
        </div>
      ) : (
        <div
          id='tinh-gia-van-chuyen'
          className={cn('relative h-[50.455rem] w-full text-white xsm:hidden')}
        >
          <ImageV2
            alt=''
            className='size-full'
            src={banner?.background_pc?.url || '/delivery/background-pc.webp'}
            width={1600}
            height={788}
            quality={100}
          />

          <div
            className={cn(
              'fade-in-box absolute left-[6rem] top-[6.25rem]',
              isFaq && 'top-[3.675rem]',
            )}
          >
            <h2 className='w-[44rem] text-[2.75rem] font-bold leading-[120%] tracking-[-0.105rem] [text-shadow:4px_8px_13.3px_rgba(0,0,0,0.12)]'>
              {banner?.title ||
                'Gửi hàng quản lý công nghệ, giao chính xác và đúng hẹn.'}
            </h2>
            <div className='mt-7'>
              <TrackingInterface
                deliveryDirection={deliveryDirectionData}
                currencyToUsd={currencyExchangeRateData}
                boxChatAI={boxChatAI}
                linkContactConsultant={contact_consultant}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Banner

const BackgroundMobile = ({
  banner,
  boxChatAI,
  deliveryDirectionData,
  currencyExchangeRateData,
  contact_consultant,
}: {
  banner: {
    title: string
    background_pc: IImage
    background_mobile: IImage
  }
  contact_consultant: {
    url: string
    target: string
    title: string
  }
  dataFaqs: any
  boxChatAI: IBoxChatAI
  deliveryDirectionData: DeliveryDirectionResType
  currencyExchangeRateData: CurrencyToUsdResType
  isFaq: boolean
}) => {
  return (
    <div
      id='tinh-gia-van-chuyen'
      className={cn('relative flex flex-col xsm:w-full h-[58.4375rem]')}
    >
      <ImageV2
        alt=''
        width={375}
        height={445}
        src={banner?.background_mobile?.url || '/delivery/background-mb.webp'}
        className='h-full w-auto object-cover'
      />

      <div className='z-[20] px-[1rem] absolute top-[2.5rem] left-0 w-full'>
        <h2 className='tracking-[-0.05rem] mb-[1.5rem] text-white text-center text-[1.25rem] font-bold leading-[120%]'>
          {banner?.title}
        </h2>
        <div className=''>
          <TrackingInterface
            deliveryDirection={deliveryDirectionData}
            currencyToUsd={currencyExchangeRateData}
            boxChatAI={boxChatAI}
            linkContactConsultant={contact_consultant}
          />
        </div>
      </div>
    </div>
  )
}
