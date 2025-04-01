import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import TrackingBill from '@/sections/tracking-bill'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('/theo-doi-don-hang')
  return metadataValues(res)
}

const page = async () => {
  const dataAcf = await fetchDataWP({
    api: 'pages/355?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 60},
    },
  })

  return (
    <main className='bg-background-elevation5'>
      <Breadcrumb
        data={[{title: 'Theo dõi vận đơn', slug: ''}]}
        className='sm:px-[5rem] xsm:hidden'
      />
      <TrackingBill dataAcf={dataAcf?.acf} />
    </main>
  )
}
export default page
