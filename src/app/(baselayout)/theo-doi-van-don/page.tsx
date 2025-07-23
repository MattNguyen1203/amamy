import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import TrackingBill from '@/sections/tracking-bill'
import metadataValues from '@/utils/metadataValues'
import {Suspense} from 'react'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('theo-doi-don-hang')
  return metadataValues(res)
}

const page = async () => {
  const fetchdataAcf = await fetchDataWP({
    api: 'pages/355?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataAcf, schemaData] = await Promise.all([
    fetchdataAcf,
    getSchemaMarkup('theo-doi-don-hang'),
  ])
  return (
    <main className='bg-background-elevation5'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <h1 className='hidden'>Theo dõi vận đơn</h1>
      <Breadcrumb
        data={[{title: 'Theo dõi vận đơn', slug: ''}]}
        className='sm:px-[5rem] xsm:hidden'
      />
      <Suspense>
        <TrackingBill dataAcf={dataAcf?.acf} />
      </Suspense>
    </main>
  )
}
export default page
