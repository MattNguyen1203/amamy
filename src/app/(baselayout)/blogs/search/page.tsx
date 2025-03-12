import fetchData from '@/fetch/fetchData'
import MenuSearch from '@/sections/blog/search/MenuSearch'
import {Suspense} from 'react'

export default async function page() {
  const fetchDataCategory = fetchData({
    api: `categories`,
    option: {
      next: {revalidate: 10},
    },
  })
  const [dataCategory] = await Promise.all([fetchDataCategory])
  return (
    <main className='pt-[10rem] bg-white'>
      <Suspense>
        <MenuSearch dataCategory={dataCategory?.categories} />
      </Suspense>
    </main>
  )
}
