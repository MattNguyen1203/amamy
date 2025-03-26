import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import {fetchDataBlog} from '@/fetch/fetchDataBlog'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import AboutPage from '@/sections/about'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata({params}: {params: {locale: string}}) {
  const res = await getMetaDataRankMath(`ve-chung-toi`)
  return metadataValues(res)
}
export default async function About() {
  const [res, resListBlog] = await Promise.all([
    fetchDataAbout(),
    fetchDataBlog(),
  ])
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <AboutPage
        res={res}
        listBlog={resListBlog}
      />
    </div>
  )
}
