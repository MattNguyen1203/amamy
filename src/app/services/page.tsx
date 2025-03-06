import {fetchDataBlog} from '@/fetch/fetchDataBlog'
import {fetchDataListService} from '@/fetch/fetchDataListService'
import {fetchDataService} from '@/fetch/fetchDataService'
import ServicePage from '@/sections/service'
import {IBlogResponse, IListServiceResponse, IServicePage} from '@/utils/type'

export default async function Service() {
  const [resService, resListService, resListBlog]: [
    IServicePage,
    IListServiceResponse,
    IBlogResponse,
  ] = await Promise.all([
    fetchDataService(),
    fetchDataListService(),
    fetchDataBlog(),
  ])

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
