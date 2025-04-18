import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import Homepage from '@/sections/homepage'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('')
  return metadataValues(res)
}

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
  const [dataACF, dataBlogs, schemaData] = await Promise.all([
    fetchDataACF,
    fetchDataBlogs,
    getSchemaMarkup(''),
  ])
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <div className='w-full bg-white text-black flex flex-col items-center'>
        <Homepage
          res={dataACF}
          dataBlog={dataBlogs?.posts}
        />
      </div>
    </main>
  )
}
