import fetchData from '@/fetch/fetchData'
import {fetchDataBlog} from '@/fetch/fetchDataBlog'
import {fetchDataListService} from '@/fetch/fetchDataListService'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import ServicePage from '@/sections/service'
import metadataValues from '@/utils/metadataValues'
import {notFound} from 'next/navigation'
export async function generateMetadata() {
  const res = await getMetaDataRankMath('/chieu-van-chuyen/gui-hang-viet-duc')
  return metadataValues(res)
}
export default async function Service() {
  const fetchDataServices = fetchData({
    api: `chieu-van-chuyen/gui-hang-viet-duc?_fields=banner,talk_to_ai,list_services,feedback_customer`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [resService, resListService, resListBlog] = await Promise.all([
    fetchDataServices,
    fetchDataListService(),
    fetchDataBlog(),
  ])
  if (resService?.data?.status === 404) {
    return notFound()
  }
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <ServicePage
        data={resService}
        listService={resListService}
        listBlog={resListBlog}
      />
    </div>
  )
}
