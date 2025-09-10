import React from 'react'
import fetchData from '@/fetch/fetchData'
import FAQ from '@/sections/amamy/faq/FAQ'
import Hero from '@/sections/amamy/hero/Hero'
import Process from '@/sections/amamy/process/Process'
import Reason from '@/sections/amamy/reason/Reason'
import Banner from '@/sections/homepage/banner'
import Section6 from '@/sections/homepage/section6/Section6'

const page = async () => {
  const fetchBanner = fetchData({api: 'pages/11'})
  const fetchChatBoxAI = fetchData({api: 'options?fields=box_chat_ai'})
  const fetchDeliveryDirection = fetchData({api: 'chieu-van-chuyen'})
  const fetchCurrencyExchangeRate = fetchData({
    api: 'options?fields=currency_to_usd',
  })

  const [
    dataBanner,
    chatBoxAiData,
    deliveryDirectionData,
    currencyExchangeRateData,
  ] = await Promise.all([
    fetchBanner,
    fetchChatBoxAI,
    fetchDeliveryDirection,
    fetchCurrencyExchangeRate,
  ])

  return (
    <main className='bg-white'>
      <Hero />
      <FAQ />
      <Banner
        banner={dataBanner.banner}
        boxChatAI={{
          ...dataBanner.chat_box_ai,
          link_chat_ai: chatBoxAiData?.data?.box_chat_ai.link_chat_ai,
        }}
        deliveryDirectionData={deliveryDirectionData}
        currencyExchangeRateData={currencyExchangeRateData}
      />
      <Reason />
      <Process />
      <Section6 />
    </main>
  )
}

export default page
