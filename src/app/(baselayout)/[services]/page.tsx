/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchData from '@/fetch/fetchData'
import {fetchDataListService} from '@/fetch/fetchDataListService'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import ServicePage from '@/sections/service'
import metadataValues from '@/utils/metadataValues'
import {notFound} from 'next/navigation'

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
export default async function Service({params}: {params: {services: string}}) {
  const fetchDataServices = fetchData({
    api: `chieu-van-chuyen/${params?.services}?_fields=banner,talk_to_ai,list_services,feedback_customer,suggested_reading_articles_about_shipping`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [resService, resListService, schemaData] = await Promise.all([
    fetchDataServices,
    fetchDataListService(),
    getSchemaMarkup('chieu-van-chuyen/' + params?.services),
  ])
  if (resService?.data?.status === 404) {
    return notFound()
  }
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <div className='w-full bg-white text-black flex flex-col items-center'>
        <ServicePage
          data={resService}
          listService={resListService}
        />
      </div>
    </main>
  )
}
