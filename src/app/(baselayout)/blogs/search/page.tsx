import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import MenuSearch from '@/sections/blog/search/MenuSearch'
import metadataValues from '@/utils/metadataValues'
import {Suspense} from 'react'
export async function generateMetadata() {
  const res = await getMetaDataRankMath('/blogs')
  return metadataValues(res)
}
export default async function page() {
  const fetchDataCategory = fetchData({
    api: `categories`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataCategory] = await Promise.all([fetchDataCategory])
  return (
    <main className='pt-[5rem] xsm:pt-[1rem] bg-white'>
      <Suspense>
        <MenuSearch dataCategory={dataCategory?.categories} />
      </Suspense>
    </main>
  )
}
