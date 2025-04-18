import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import TabsCategory from '@/sections/blog/TabsCategory'
import metadataValues from '@/utils/metadataValues'
import {Suspense} from 'react'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('blogs')
  return metadataValues(res)
}

export default async function page() {
  const fetchDataFavourite = fetchData({
    api: `options?fields=you_might_like_it`,
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataCategory = fetchData({
    api: `categories`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataFavourite, dataCategory] = await Promise.all([
    fetchDataFavourite,
    fetchDataCategory,
  ])

  return (
    <main className='sm:px-[6rem] bg-white'>
      <Breadcrumb
        data={[{title: 'Hữu ích cho gửi hàng', slug: ''}]}
        className='xsm:px-[1rem]'
      />
      <Suspense>
        <TabsCategory
          dataCategory={dataCategory?.categories}
          dataFavourite={dataFavourite?.data?.you_might_like_it}
        />
      </Suspense>
    </main>
  )
}
