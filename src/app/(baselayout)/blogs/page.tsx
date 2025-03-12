import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import TabsCategory from '@/sections/blog/TabsCategory'
import {Suspense} from 'react'

export default async function page() {
  const fetchDataFavourite = fetchData({
    api: `options?fields=you_might_like_it`,
    option: {
      next: {revalidate: 10},
    },
  })
  const fetchDataCategory = fetchData({
    api: `categories`,
    option: {
      next: {revalidate: 10},
    },
  })
  const [dataFavourite, dataCategory] = await Promise.all([
    fetchDataFavourite,
    fetchDataCategory,
  ])

  return (
    <main className='sm:px-[6rem] bg-white'>
      <Breadcrumb data={[{title: 'Hữu ích cho gửi hàng', slug: ''}]} />
      <Suspense>
        <TabsCategory
          dataCategory={dataCategory?.categories}
          dataFavourite={dataFavourite?.data?.you_might_like_it}
        />
      </Suspense>
    </main>
  )
}
