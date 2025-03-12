import { fetchHomeData } from '@/fetch/fetchHomeData'
import Homepage from '@/sections/homepage'
import { IHomePage } from '@/utils/type'

// export async function generateMetadata() {
//   const res = await getMetadata('/')
//   return metadataValues(res)
// }

export default async function Home() {

  const res:IHomePage = await fetchHomeData()
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <Homepage res={res} />
    </div>
  )
}
