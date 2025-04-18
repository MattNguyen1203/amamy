import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import AboutPage from '@/sections/about'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetaDataRankMath(`ve-chung-toi`)
  return metadataValues(res)
}
export default async function About() {
  const [res, schemaData] = await Promise.all([
    fetchDataAbout(),
    getSchemaMarkup('ve-chung-toi'),
  ])
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <div className='w-full bg-white text-black flex flex-col items-center'>
        <AboutPage res={res} />
      </div>
    </main>
  )
}
