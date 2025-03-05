import {fetchDataListService} from '@/fetch/fetchDataListService'
import {fetchDataService} from '@/fetch/fetchDataService'
import ServicePage from '@/sections/service'
import {IListServiceResponse, IServicePage} from '@/utils/type'

export default async function Service() {
  const [resService, resListService]: [IServicePage, IListServiceResponse] =
    await Promise.all([fetchDataService(), fetchDataListService()])

  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <ServicePage
        data={resService}
        listService={resListService}
      />
    </div>
  )
}
