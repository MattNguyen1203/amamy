import Footer from '@/components/footer/Footer'
import ImageV2 from '@/components/image/ImageV2'
import Pagination from '@/components/pagination/Pagination'
import getMetadata from '@/fetch/getMetadata'
import Homepage from '@/sections/homepage'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'

// export async function generateMetadata() {
//   const res = await getMetadata('/')
//   return metadataValues(res)
// }

export default async function Home() {
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <Homepage />
    </div>
  )
}
