'use client'

import {IHomePage, IListServiceResponse, IServicePage} from '@/utils/type'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect} from 'react'
import RelatedBlogsV2 from '../blog/detail/RelatedBlogsV2'
import Faqs from './faqs/Faqs'
import Hero from './hero/Hero'
import Reason from './reasons/Reason'
import Service from './service/Service'
import Banner from '@/sections/services-test/banner'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ServicePageProps {
  res: IHomePage
  data: IServicePage
  listService: IListServiceResponse
  chatBoxAiData: {
    title: string
    customer_chat: string
    ai_chat: string
    link_chat_ai: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resDataServicesHeader: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resDataFaqs: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resBanner: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resDeliveryDirection: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionFields: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataService: any
}

const ServicePage = ({
  data,
  chatBoxAiData,
  resDataFaqs,
  resBanner,
  resDeliveryDirection,
  optionFields,
  dataService,
}: ServicePageProps) => {
  console.log('Data: ', dataService)
  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (typeof window === 'undefined') return
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      gsap.utils.toArray<HTMLElement>('.fade-section').forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>('.fade-item')

        items.forEach((el, index) => {
          const duration = parseFloat(el.dataset.duration ?? '1')
          const delay = parseFloat(el.dataset.delay ?? (0.3 * index).toString())

          gsap.fromTo(
            el,
            {autoAlpha: 0, y: 50},
            {
              autoAlpha: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                once: true,
                // markers: true,
              },
            },
          )
        })
      })
    })
  }, [])
  return (
    <div className='w-full bg-white'>
      <Hero
        heroData={{
          heading: data?.banner?.title,
          description: data?.banner?.sub_title,
          link: {
            url: '#tinh-gia-van-chuyen',
            target: '_self',
            title: data?.banner?.label_link,
          },
          hightlights: resDataFaqs?.acf?.banner?.hightlights,
        }}
      />
      <Faqs
        faqsData={{
          title: resDataFaqs?.acf?.faq?.title ?? 'Câu hỏi thường gặp',
          questions: Array.isArray(data?.talk_to_ai?.list_faq)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.talk_to_ai.list_faq.map((item: any) => ({
                question: item?.question ?? '',
                // answer có HTML -> render bằng dangerouslySetInnerHTML ở nơi hiển thị
                answer: item?.answer ?? '',
              }))
            : [],
          number: data?.list_services?.phone ?? '',
        }}
      />
      <Reason reasonsData={resDataFaqs?.acf?.reason} />
      <Banner
        // banner={data?.estimate_price}
        banner={{
          title:
            data?.estimate_price?.title || dataService?.trackandprice?.title,
          background_pc:
            data?.estimate_price?.background_pc ||
            dataService?.trackandprice?.background_pc,
          background_mobile:
            data?.estimate_price?.background_mobile ||
            dataService?.trackandprice?.background_mb,
        }}
        boxChatAI={{
          ...resBanner?.chat_box_ai,
          link_chat_ai: chatBoxAiData?.link_chat_ai,
        }}
        contact_consultant={optionFields?.data?.contact_consultant}
        deliveryDirectionData={resDeliveryDirection}
        currencyExchangeRateData={optionFields}
      />
      <Service services={dataService?.three_steps} />
      {Array.isArray(data?.suggested_reading_articles_about_shipping?.post) && (
        <RelatedBlogsV2
          data={data?.suggested_reading_articles_about_shipping?.post}
          title={
            data?.suggested_reading_articles_about_shipping?.title ??
            'Nên đọc cho gửi hàng'
          }
          className='bg-[#EDF5FA] xsm:bg-[#F8F8FB] [&_.ItemBlog]:shadow-none [&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default ServicePage
