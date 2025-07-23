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
  const fetchChatBoxAI = fetchData({
    api: 'options?fields=box_chat_ai',
    option: {
      next: {revalidate: 60},
    },
  })

  const [dataACF, dataBlogs, schemaData, chatBoxAIdata] = await Promise.all([
    fetchDataACF,
    fetchDataBlogs,
    getSchemaMarkup(''),
    fetchChatBoxAI,
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
          chatBoxAiData={chatBoxAIdata?.data?.box_chat_ai}
          dataBlog={dataBlogs?.posts}
        />
      </div>
    </main>
  )
}
