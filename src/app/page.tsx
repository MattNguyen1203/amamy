import ImageV2 from '@/components/image/ImageV2'
import Pagination from '@/components/pagination/Pagination'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'

export async function generateMetadata() {
  const res = await getMetadata('/')
  return metadataValues(res)
}

export default async function Home() {
  return (
    <div className='w-full h-screen bg-white text-black flex flex-col items-center'>
      <Pagination />
      <ImageV2
        src={'/logo.png'}
        width={200}
        height={200}
        alt='logo'
      />
      <Image
        src={'/logo.png'}
        width={200}
        height={200}
        alt='logo'
      />
    </div>
  )
}
