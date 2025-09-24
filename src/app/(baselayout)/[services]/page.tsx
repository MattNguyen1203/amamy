import React from 'react'
import fetchData from '@/fetch/fetchData'
import {fetchDataListService} from '@/fetch/fetchDataListService'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import ServicePage from '@/sections/services-test'
import {notFound} from 'next/navigation'
import metadataValues from '@/utils/metadataValues'

export async function generateStaticParams() {
  const posts = await fetchData({
    api: 'all-slug-transport',
  })

  return posts.map((post: any) => ({
    services: post.slug,
  }))
}
export async function generateMetadata({params}: {params: {services: string}}) {
  const res = await getMetaDataRankMath('chieu-van-chuyen/' + params?.services)
  return metadataValues(res)
}

const ServicesPage = async ({params}: {params: {services: string}}) => {
  const fetchDataACF = fetchData({
    api: 'pages/11',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataFaqs = fetchDataWP({
    api: 'pages/8647?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataServices = fetchData({
    api: `chieu-van-chuyen/${params?.services}?_fields=banner,talk_to_ai,list_services,feedback_customer,suggested_reading_articles_about_shipping`,
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
  const fetchDataServicesHeader = fetchData({
    api: `chieu-van-chuyen-header`,
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchBanner = fetchData({
    api: 'pages/11',
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
  const [
    dataACF,
    resService,
    resListService,
    schemaData,
    chatBoxAIdata,
    resDataServicesHeader,
    resDataFaqs,
    resBanner,
    resDeliveryDirection,
    resCurrencyExchangeRate,
  ] = await Promise.all([
    fetchDataACF,
    fetchDataServices,
    fetchDataListService(),
    getSchemaMarkup('chieu-van-chuyen/' + params?.services),
    fetchChatBoxAI,
    fetchDataServicesHeader,
    fetchDataFaqs,
    fetchBanner,
    fetchDeliveryDirection,
    fetchCurrencyExchangeRate,
  ])
  if (resService?.data?.status === 404) {
    return notFound()
  }
  console.log('4. chatBoxAIdata:', JSON.stringify(chatBoxAIdata, null, 2))
  console.log(
    '5. resDataServicesHeader:',
    JSON.stringify(resDataServicesHeader, null, 2),
  )
  console.log('6. resDataFaqs:', JSON.stringify(resDataFaqs, null, 2))

  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <div className='flex w-full flex-col items-center overflow-hidden bg-white text-black'>
        <ServicePage
          res={dataACF}
          resDataFaqs={resDataFaqs}
          resDataServicesHeader={resDataServicesHeader}
          data={resService}
          listService={resListService}
          chatBoxAiData={chatBoxAIdata?.data?.box_chat_ai}
          resBanner={resBanner}
          resDeliveryDirection={resDeliveryDirection}
          resCurrencyExchangeRate={resCurrencyExchangeRate}
        />
      </div>
    </main>
  )
}

export default ServicesPage
