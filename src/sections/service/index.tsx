'use client'

import FAQ from '@/sections/amamy/faq/FAQ'
import Hero from '@/sections/amamy/hero/Hero'
import Process from '@/sections/amamy/process/Process'
import Reason from '@/sections/amamy/reason/Reason'
import RelatedBlogsV2 from '@/sections/blog/detail/RelatedBlogsV2'
import Banner from '@/sections/homepage/banner'
import {IListServiceResponse, IServicePage} from '@/utils/type'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect} from 'react'

// import Testimonials from './section2/Testimonials'
gsap.registerPlugin(ScrollTrigger)
interface Prop {
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
  resCurrencyExchangeRate: any
}
const ServicePage = ({
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listService,
  chatBoxAiData,
  resDataServicesHeader,
  resDataFaqs,
  resBanner,
  resDeliveryDirection,
  resCurrencyExchangeRate,
}: Prop) => {
  useEffect(() => {
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
  }, [])
  return (
    <div className='w-full bg-white'>
      <Hero
        data={{
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
      <FAQ
        data={{
          title: 'Câu hỏi thường gặp',
          questions:
            Array.isArray(data?.talk_to_ai?.list_faq) &&
            data?.talk_to_ai?.list_faq.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          number: data?.list_services?.phone,
        }}
        dataServices={resDataServicesHeader}
      />
      <Banner
        dataFaqs={resDataFaqs?.acf?.trackandprice}
        banner={resBanner?.banner}
        boxChatAI={{
          ...resBanner?.chat_box_ai,
          link_chat_ai: chatBoxAiData?.link_chat_ai,
        }}
        deliveryDirectionData={resDeliveryDirection}
        currencyExchangeRateData={resCurrencyExchangeRate}
        isFaq={true}
      />
      <Reason data={resDataFaqs?.acf?.reason} />
      <Process data={resDataFaqs?.acf?.procedure} />
      {/* <ShippingHero data={data} />
      <AIChatSection
        listService={listService}
        data={data}
        chatBoxAiData={chatBoxAiData}
      /> */}
      {/* <Testimonials data={data} /> */}
      {Array.isArray(data?.suggested_reading_articles_about_shipping?.post) && (
        <RelatedBlogsV2
          data={data?.suggested_reading_articles_about_shipping?.post}
          title={
            data?.suggested_reading_articles_about_shipping?.title ??
            'Nên đọc cho gửi hàng'
          }
          className='bg-[#EDF5FA] [&_.ItemBlog]:shadow-none xsm:bg-[#F8F8FB] [&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default ServicePage
