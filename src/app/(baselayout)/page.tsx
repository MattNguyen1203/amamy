import fetchData from '@/fetch/fetchData'
import Homepage from '@/sections/homepage'

// export async function generateMetadata() {
//   const res = await getMetadata('/')
//   return metadataValues(res)
// }

export default async function Home() {
  const fetchDataACF = fetchData({
    api: 'pages/11',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataBlogs = fetchData({
    api: 'blogs?paged=1&limit=10',
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataACF, dataBlogs] = await Promise.all([fetchDataACF, fetchDataBlogs])
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <Homepage
        res={dataACF}
        dataBlog={dataBlogs?.posts}
      />
    </div>
  )
}
