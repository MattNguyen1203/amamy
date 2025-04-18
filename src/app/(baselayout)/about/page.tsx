import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import AboutPage from '@/sections/about'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetaDataRankMath(`ve-chung-toi`)
  return metadataValues(res)
}
export default async function About() {
  const res = await fetchDataAbout()
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <AboutPage res={res} />
    </div>
  )
}
