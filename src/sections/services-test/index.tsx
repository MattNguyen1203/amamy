'use client'

import React, {useEffect} from 'react'
import gsap from 'gsap'
import {IHomePage, IListServiceResponse, IServicePage} from '@/utils/type'
import RelatedBlogsV2 from '../blog/detail/RelatedBlogsV2'
import Banner from '../homepage/banner'
import Faqs from './faqs/Faqs'
import Hero from './hero/Hero'
import Reason from './reasons/Reason'
import Service from './service/Service'

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
  resCurrencyExchangeRate: any
}

const ServicePage = ({
  res,
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listService,
  chatBoxAiData,
  resDataServicesHeader,
  resDataFaqs,
  resBanner,
  resDeliveryDirection,
  resCurrencyExchangeRate,
}: ServicePageProps) => {
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
          title: 'Câu hỏi thường gặp',
          questions:
            Array.isArray(data?.talk_to_ai?.list_faq) &&
            data?.talk_to_ai?.list_faq.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          number: data?.list_services?.phone,
        }}
      />
      <Reason reasonsData={resDataFaqs?.acf?.reason} />
      <Banner
        banner={resBanner?.banner}
        boxChatAI={{
          ...resBanner?.chat_box_ai,
          link_chat_ai: chatBoxAiData?.link_chat_ai,
        }}
        deliveryDirectionData={resDeliveryDirection}
        currencyExchangeRateData={resCurrencyExchangeRate}
      />
      <Service services={res.services} />
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
