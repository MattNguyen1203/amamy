import {fetchDataService} from '@/fetch/fetchDataService'
import ServicePage from '@/sections/service'
import {IServicePage} from '@/utils/type'

export default async function Service() {
  const res: IServicePage = await fetchDataService()
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <ServicePage data={res} />
    </div>
  )
}
