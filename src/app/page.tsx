import fetchDataWP from '@/fetch/fetchDataWP'
import Homepage from '@/sections/homepage'
import {IHomePage} from '@/utils/type'

// export async function generateMetadata() {
//   const res = await getMetadata('/')
//   return metadataValues(res)
// }

export default async function Home() {
  const dataACF = await fetchDataWP({
    api: 'pages/11?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 0},
    },
  })
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <Homepage res={dataACF.acf} />
    </div>
  )
}
