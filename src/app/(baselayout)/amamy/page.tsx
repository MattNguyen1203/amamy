import React from 'react'
import fetchData from '@/fetch/fetchData'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import FAQ from '@/sections/amamy/faq/FAQ'
import Hero from '@/sections/amamy/hero/Hero'
import Process from '@/sections/amamy/process/Process'
import Reason from '@/sections/amamy/reason/Reason'
import Banner from '@/sections/homepage/banner'
import Section6 from '@/sections/homepage/section6/Section6'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('')
  return metadataValues(res)
}

const page = async () => {
  const fetchBanner = fetchData({
    api: 'pages/11',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchChatBoxAI = fetchData({
    api: 'options?fields=box_chat_ai',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDeliveryDirection = fetchData({
    api: 'chieu-van-chuyen',
    method: 'GET',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchCurrencyExchangeRate = fetchData({
    api: 'options?fields=currency_to_usd',
    method: 'GET',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataFaqs = fetchDataWP({
    api: 'pages/355?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataServices = fetchData({
    api: `chieu-van-chuyen-header`,
    option: {
      next: {revalidate: 60},
    },
  })

  const [
    dataBanner,
    chatBoxAiData,
    deliveryDirectionData,
    currencyExchangeRateData,
    dataFaqs,
    dataServices,
  ] = await Promise.all([
    fetchBanner,
    fetchChatBoxAI,
    fetchDeliveryDirection,
    fetchCurrencyExchangeRate,
    fetchDataFaqs,
    fetchDataServices,
  ])

  console.log(JSON.stringify(dataServices?.data?.header_site, null, 2))
  return (
    <main className='overflow-hidden bg-white'>
      <Hero />
      <FAQ
        dataFAQ={dataFaqs?.acf?.faq_order}
        dataServices={dataServices}
      />
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
